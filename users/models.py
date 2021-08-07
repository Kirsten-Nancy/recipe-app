from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):

    def create_user(self, email, password, **other_fields):
        other_fields.setdefault('is_superuser', False)
        
        if not email:
            raise ValueError(_('Users must have an email address')) 

        # Normalizing email means lowercasing the domain portion of the email address
        email = self.normalize_email(email)

        user = self.model(email=email, **other_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **other_fields):
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_active', True)


        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')
        if other_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))

        return self.create_user(email, password, **other_fields)



class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    last_login = models.DateTimeField(_('last login'), auto_now=True)
    # Send email to user before activating account: TODO
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='avatar/', blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        db_table = 'auth_user'

    def __str__(self):
        return self.email

    