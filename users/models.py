from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager

class CustomUserManager(UserManager):
    """
    Manager personalizado para el modelo de usuario personalizado.

    Este manager extiende las capacidades del manager predeterminado de Django
    para la gestión de usuarios.

    Métodos:
        _create_user(email, password, **extra_fields): Crea y guarda un usuario con un correo electrónico y contraseña.
        create_user(email, password, **extra_fields): Crea y guarda un usuario estándar con un correo electrónico y contraseña.
        create_superuser(email, password, **extra_fields): Crea y guarda un superusuario con privilegios de administrador.
    """
    def _create_user(self, email, password, **extra_fields):
        """
        Crea y guarda un usuario con un correo electrónico y contraseña.

        Args:
            email (str): Correo electrónico del usuario.
            password (str): Contraseña del usuario.
            **extra_fields: Otros campos adicionales para el usuario.

        Returns:
            User: Objeto del usuario creado.
        """
        if not email:
            raise ValueError('Debes proporcionar una dirección de correo electrónico válida')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email=None, password=None, **extra_fields):
        """
        Crea y guarda un usuario estándar con un correo electrónico y contraseña.

        Args:
            email (str): Correo electrónico del usuario.
            password (str): Contraseña del usuario.
            **extra_fields: Otros campos adicionales para el usuario.

        Returns:
            User: Objeto del usuario creado.
        """
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        """
        Crea y guarda un superusuario con privilegios de administrador.

        Args:
            email (str): Correo electrónico del superusuario.
            password (str): Contraseña del superusuario.
            **extra_fields: Otros campos adicionales para el superusuario.

        Returns:
            User: Objeto del superusuario creado.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    """
    Modelo personalizado de usuario que utiliza un correo electrónico como identificador único.

    Atributos:
        username (str): Nombre de usuario del usuario.
        email (str): Correo electrónico único del usuario.
        name (str): Nombre del usuario.
        following (ManyToManyField): Relación de usuarios seguidos por este usuario.
        bio (str): Biografía del usuario.
        avatar (ImageField): Imagen de perfil del usuario.
        cover_image (ImageField): Imagen de portada del usuario.
        date_joined (datetime): Fecha y hora de registro del usuario.
        is_staff (bool): Indica si el usuario tiene permisos de administrador.

    Métodos:
        followed_usernames: Devuelve una lista de diccionarios con información de usuarios seguidos.
    """
    username = models.CharField(max_length=200, unique=True)
    email = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=255, blank=True)
    following = models.ManyToManyField("self",symmetrical=False,related_name="followed" ,blank=True)
    bio = models.CharField(max_length=255, blank=True)
    avatar = models.ImageField(default='profiles/default/avatar.png', upload_to='profiles/avatars')
    cover_image = models.ImageField(default='profiles/default/cover.png', upload_to='profiles/covers') 
    date_joined = models.DateTimeField(default=timezone.now)

    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        ordering = ['-date_joined']

    @property
    def followed_usernames(self):
        return [{'username': user.username, 'avatar': user.avatar.url} for user in self.followed.all()]