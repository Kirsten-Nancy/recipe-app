from django.urls import path
from .views import BlaclistTokenView, GetCurrentUser,  RegisterView

app_name = 'users'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('current/', GetCurrentUser.as_view(), name='get'),
    path('logout/blacklist/', BlaclistTokenView.as_view(), name='blacklist')
]
