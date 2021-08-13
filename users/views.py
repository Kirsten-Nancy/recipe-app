from rest_framework import response
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
from users.serializers import RegisterSerializer, UserSerializer
from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class GetCurrentUser(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class BlacklistTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    