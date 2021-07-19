from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_recipes, name='recipe-list'),
    path('<int:recipe_id>', views.recipe_detail, name='recipe-detail'),
    path('create', views.create_recipe, name='create-recipe'),
    
]