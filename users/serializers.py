from .models import User
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id','email','first_name','password',)
        # Ensures the hashed password is not displayed requests ie get
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        # Set pass method creates a hash for the password to prevent saving password as text in db
        user.set_password(password)
        user.save()
        return user