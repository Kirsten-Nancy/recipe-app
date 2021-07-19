from django.shortcuts import render
from rest_framework import serializers, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Recipe
from .serializers import RecipeSerializer


@api_view(['GET'])
def get_recipes(request):
    recipes = Recipe.objects.all()
    serializer = RecipeSerializer(recipes, many=True)

    return Response(serializer.data)

# The arg name passed should be similar to that in the urls file
@api_view(['GET'])
def recipe_detail(request, recipe_id):
    recipe = Recipe.objects.get(pk=recipe_id)
    serializer = RecipeSerializer(recipe, many=False)

    return Response(serializer.data)


@api_view(['POST'])
def create_recipe(request):
    print('request data', request.data)
    serializer = RecipeSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
