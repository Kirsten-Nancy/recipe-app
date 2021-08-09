from django.urls import path
from .views import GetUserView, RegisterView

app_name = 'users'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('get/<int:pk>', GetUserView.as_view(), name='get')
]
