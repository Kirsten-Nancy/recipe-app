from django.urls import path
from .views import RecipeList, RecipeDetail, UserRecipeList


app_name = 'recipes'

urlpatterns = [
    path('', RecipeList.as_view(), name='recipe-list'),
    path('current-user/', UserRecipeList.as_view(), name='user-recipes'),
    path('<int:pk>', RecipeDetail.as_view(), name='recipe-detail'),   
]
