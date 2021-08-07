import re
from django.db import models
from django.db.models.deletion import CASCADE
from rest_framework import serializers
from rest_framework.fields import ImageField
from django.conf import settings
# Create your models here.


class Recipe(models.Model):
    
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='recipes')
    serving_size = models.IntegerField(default=0)
    image = models.ImageField(upload_to='images',blank=True,null=True)


    def __str__(self):
        return self.title




class Ingredient(models.Model):
    recipe = models.ForeignKey(
        Recipe, on_delete=CASCADE, related_name="ingredients", null=True, blank=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Instruction(models.Model):
    recipe = models.ForeignKey(
        Recipe, on_delete=CASCADE, related_name="instructions", null=True, blank=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
