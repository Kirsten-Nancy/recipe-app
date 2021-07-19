import re
from django.db import models
from django.db.models.deletion import CASCADE
from rest_framework import serializers

# Create your models here.


class Recipe(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    serving_size = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    # @property
    # def ingredients(self):
    #     return self.ingredients_set.all()

    # @property
    # def instructions(self):
    #     return self.instructions_set.all()


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
