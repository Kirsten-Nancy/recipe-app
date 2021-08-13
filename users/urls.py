from django.urls import path
from .views import BlacklistTokenView, GetCurrentUser,  RegisterView

app_name = 'users'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('current/', GetCurrentUser.as_view(), name='get'),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist')
]
