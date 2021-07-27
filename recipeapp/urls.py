from django.urls import path
from . import views

urlpatterns = [
    path('', views.recipe_list, name='recipe-list'),
    path('<int:recipe_id>', views.recipe_detail, name='recipe-detail'),   
]