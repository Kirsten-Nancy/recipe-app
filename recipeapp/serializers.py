from .models import Recipe, Ingredient, Instruction
from rest_framework import serializers, fields


class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'recipe')


class InstructionSerializer(serializers.ModelSerializer):
    # What is the meta class
    class Meta:
        model = Instruction
        fields = ('id', 'name', 'recipe')
        # read_only_fields = ('recipe',)


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    instructions = InstructionSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ('id', 'title', 'description', 'serving_size',
                  'ingredients', 'instructions')
        # read_only_fields = ('recipe',)

    def create(self, validated_data):
        print('create fn')
        print('from serializer', validated_data)
        instructions = validated_data.pop('instructions')
        ingredients = validated_data.pop('ingredients')
        print(ingredients)
        print(instructions)

        my_recipe = Recipe.objects.create(**validated_data)

        for ingredient in ingredients:
            # The ** because ingredient itself is a dictionary
            Ingredient.objects.create(**ingredient, recipe=my_recipe)

        for instruction in instructions:
            Instruction.objects.create(**instruction, recipe=my_recipe)

        return my_recipe
