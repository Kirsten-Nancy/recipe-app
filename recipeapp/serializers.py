from .models import Recipe, Ingredient, Instruction
from rest_framework import serializers, fields


class IngredientSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(required=False)

    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'recipe')
        read_only_fields = ('recipe',)


class InstructionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    # What is the meta class
    class Meta:
        model = Instruction
        fields = ('id', 'name', 'recipe')
        read_only_fields = ('recipe',)


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    instructions = InstructionSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ('id', 'title', 'description', 'serving_size',
                  'ingredients', 'instructions')
        # read_only_fields = ('recipe',)

    def create(self, validated_data):
        instructions = validated_data.pop('instructions')
        ingredients = validated_data.pop('ingredients')

        my_recipe = Recipe.objects.create(**validated_data)

        for ingredient in ingredients:
            # The ** because ingredient itself is a dictionary
            Ingredient.objects.create(**ingredient, recipe=my_recipe)

        for instruction in instructions:
            Instruction.objects.create(**instruction, recipe=my_recipe)

        return my_recipe

    def update(self, instance, validated_data):
        instructions = validated_data.pop('instructions')
        ingredients = validated_data.pop('ingredients')
        
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.title)
        instance.serving_size = validated_data.get('serving_size', instance.serving_size)
        instance.save()

        # Update ingredients
        initial_ingredients = dict((ingredient.id, ingredient) for ingredient in instance.ingredients.all())
        initial_instructions = dict((instruction.id, instruction) for instruction in instance.instructions.all())
        remaining_ingredients = []
        remaining_instructions = []
        for ingredient in ingredients:
            # check if its a new ingredient or not, a new ingredient doesn't have an id.
            if "id" in ingredient.keys():
                if Ingredient.objects.filter(id=ingredient["id"]).exists():
                    ingredient_item = initial_ingredients.pop(ingredient["id"])
                    ingredient_item.name = ingredient.get('name', ingredient_item.name)
                    ingredient_item.save()
                    remaining_ingredients.append(ingredient_item.id)
                else:
                    continue
            # Implies this is a new ingredient
            else:
                ingredient_item = Ingredient.objects.create(**ingredient, recipe=instance)
                remaining_ingredients.append(ingredient_item.id)

        if len(initial_ingredients) > 0:
            for ingredient in initial_ingredients.values():
                ingredient.delete()
     


        for instruction in instructions:
            if "id" in instruction.keys():
                if Instruction.objects.filter(id=instruction["id"]).exists():
                    instruction_item = initial_instructions.pop(instruction["id"])
                    instruction_item.name = instruction.get('name', instruction_item.name)
                    instruction_item.save()
                    remaining_instructions.append(instruction_item.id)
                else:
                    continue
            else:
                Instruction.objects.create(**instruction, recipe=instance)
                remaining_instructions.append(instruction_item.id)

        if len(initial_instructions) > 0:
            for instruction in initial_instructions.values():
                instruction.delete()
     

        return instance