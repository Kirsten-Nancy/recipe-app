from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


class CustomUserAdmin(UserAdmin):
    ordering = ('email',)
    search_fields = ('email', 'first_name', 'last_name',)
    list_display = ('email','id', 'first_name','is_staff','is_active')
    fieldsets = (
        (None, {'fields': ('email', 'first_name','last_name')}),
        ('Personal info', {'fields': ('avatar',)}),
        ('Permissions', {'fields': ('is_active','is_staff',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name','last_name','password1', 'password2','is_staff','is_active',),
        }),
    )

admin.site.register(User, CustomUserAdmin)
