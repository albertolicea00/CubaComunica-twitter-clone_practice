from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User

class SearchSerializer(serializers.ModelSerializer):
    """
    Serializer para la búsqueda de usuarios.

    Campos:
        name (str): Nombre del usuario.
        username (str): Nombre de usuario del usuario.
        avatar (str): URL de la imagen de perfil del usuario.
        i_follow (bool): Indica si el usuario actual sigue al usuario en cuestión.

    Métodos:
        get_i_follow(obj): Obtiene si el usuario actual sigue al usuario en cuestión.
    """

    username = serializers.ReadOnlyField()
    i_follow = serializers.SerializerMethodField(read_only=True) 

    class Meta:
        model = User
        fields = ['name', 'username', 'avatar', 'i_follow']

    def get_i_follow(self, obj):
        """
        Obtiene si el usuario actual sigue al usuario en cuestión.

        Args:
            obj: Objeto del usuario en cuestión.

        Returns:
            bool: True si el usuario actual sigue al usuario, False en caso contrario.
        """
        current_user = self.context.get('request').user
        return True if current_user in obj.followed.all() else False


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo de usuario.

    Campos:
        id (int): Identificador único del usuario.
        username (str): Nombre de usuario del usuario.
        email (str): Correo electrónico del usuario.
        avatar (str): URL de la imagen de perfil del usuario.
        bio (str): Biografía del usuario.
        cover_image (str): URL de la imagen de portada del usuario.
        date_joined (datetime): Fecha y hora de registro del usuario.
        i_follow (bool): Indica si el usuario actual sigue al usuario en cuestión.
        followers (int): Número de seguidores del usuario.
        following (int): Número de usuarios a los que sigue el usuario.
        name (str): Nombre del usuario.
        followed_usernames (list): Lista de diccionarios con información de usuarios seguidos.

    Métodos:
        get_i_follow(obj): Obtiene si el usuario actual sigue al usuario en cuestión.
        get_followers(obj): Obtiene el número de seguidores del usuario.
        get_following(obj): Obtiene el número de usuarios a los que sigue el usuario.
        get_followed_usernames(obj): Obtiene la lista de diccionarios con información de usuarios seguidos.
    """

    email = serializers.ReadOnlyField()
    username = serializers.ReadOnlyField()
    followers =  serializers.SerializerMethodField(read_only=True)
    i_follow = serializers.SerializerMethodField(read_only=True) 
    following = serializers.SerializerMethodField(read_only=True) 
    followed_usernames = serializers.SerializerMethodField(read_only=True) 

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'avatar', 'bio', 'cover_image', 
                  'date_joined', 'i_follow', 'followers', 'following', 'name', 'followed_usernames']

    def get_i_follow(self, obj):
        """
        Obtiene si el usuario actual sigue al usuario en cuestión.

        Args:
            obj: Objeto del usuario en cuestión.

        Returns:
            bool: True si el usuario actual sigue al usuario, False en caso contrario.
        """
        current_user = self.context.get('request').user
        return True if current_user in obj.followed.all() else False

    def get_followers(self, obj):
        """
        Obtiene el número de seguidores del usuario.

        Args:
            obj: Objeto del usuario en cuestión.

        Returns:
            int: Número de seguidores del usuario.
        """
        return obj.followed.count()

    def get_following(self, obj):
        """
        Obtiene el número de usuarios a los que sigue el usuario.

        Args:
            obj: Objeto del usuario en cuestión.

        Returns:
            int: Número de usuarios a los que sigue el usuario.
        """
        return obj.following.count()

    def get_followed_usernames(self, obj):
        """
        Obtiene la lista de diccionarios con información de usuarios seguidos.

        Args:
            obj: Objeto del usuario en cuestión.

        Returns:
            list: Lista de diccionarios con información de usuarios seguidos.
        """
        return obj.followed_usernames


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Serializer personalizado para la obtención de tokens de acceso.

    Métodos:
        get_token(user): Obtiene el token de acceso y añade información adicional (username, avatar).

    Args:
        user: Objeto del usuario para el cual se está generando el token.

    Returns:
        dict: Token de acceso con información adicional (username, avatar).
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['avatar'] = user.avatar.url

        return token


class MyUserSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo de usuario utilizado en la obtención de tokens.

    Campos:
        username (str): Nombre de usuario del usuario.
        email (str): Correo electrónico del usuario.
        password (str): Contraseña del usuario.
    """
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
