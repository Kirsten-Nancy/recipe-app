from django.shortcuts import render
from rest_framework import serializers, status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Recipe
from .serializers import RecipeSerializer


# Simplified views using drf generic views and mixins
class RecipeList(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer



# Using class based views
# class RecipeList(APIView):
#     def get(self, request):
#         recipes = Recipe.objects.all()
#         serializer = RecipeSerializer(recipes, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = RecipeSerializer(data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# # The arg name passed should be similar to that in the urls file
# class RecipeDetail(APIView):
#     def get_recipe_obj(self,pk):
#         try:
#             return Recipe.objects.get(pk=pk)
#         except Recipe.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def get(self, request, pk):
#         # The serializer by default expects only one object,
#         # No need to pass the many parameter
#         recipe = self.get_recipe_obj(pk)
#         serializer = RecipeSerializer(recipe)
#         return Response(serializer.data)

#     def put(self, request, pk):
#         # When you are updating a particular entry, you pass the instance of that object and the data to update
#         recipe = self.get_recipe_obj(pk)
#         serializer = RecipeSerializer(instance=recipe, data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         recipe = self.get_recipe_obj(pk)
#         recipe.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    

