from rest_framework import serializers
from . models import Post, Comment

class CommentSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Comment.

    Atributos:
        user (str): Nombre de usuario del creador del comentario.
        avatar (str): URL del avatar del creador del comentario.

    Meta:
        model: Modelo Comment.
        fields: Todos los campos del modelo Comment.
    """

    user = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.ReadOnlyField(source='user.avatar.url')

    class Meta:
        model = Comment
        fields = '__all__'

    def get_avatar(self, obj):
        """
        Obtiene la URL del avatar del usuario asociado al objeto.

        Args:
            obj: Objeto Comment o Post.

        Returns:
            str: URL del avatar del usuario asociado al objeto.
        """
        return obj.user.avatar.url

class MyPostSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Post (personalizado).

    Atributos:
        likes_count (int): Cantidad de "me gusta" recibidos por la publicación.
        shareds_count (int): Cantidad de veces que la publicación fue compartida.
        user (str): Nombre de usuario del creador de la publicación.
        avatar (str): URL del avatar del creador de la publicación.

    Meta:
        model: Modelo Post.
        fields: Lista de campos personalizada para el serializador.
    """
    
    likes_count = serializers.SerializerMethodField(read_only=True)
    shareds_count = serializers.SerializerMethodField(read_only=True)
    user = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.ReadOnlyField(source='user.avatar.url')

    class Meta:
        model = Post
        fields = ['id', 'user', 
                  'avatar', 
                  'content', 
                  'image', 'liked', 
                  'shared', 'created_at', 
                  'likes_count', 'shareds_count','parent']

    def get_avatar(self, obj):
        """
        Obtiene la URL del avatar del usuario asociado al objeto.

        Args:
            obj: Objeto Comment o Post.

        Returns:
            str: URL del avatar del usuario asociado al objeto.
        """
        return obj.user.avatar.url

    def get_likes_count(self, obj):
        """
        Obtiene la cantidad de "me gusta" recibidos por la publicación.

        Args:
            obj: Objeto Post.

        Returns:
            int: Cantidad de "me gusta" recibidos por la publicación.
        """
        return obj.liked.all().count()

    def get_shareds_count(self, obj):
        """
        Obtiene la cantidad de veces que la publicación fue compartida.

        Args:
            obj: Objeto Post.

        Returns:
            int: Cantidad de veces que la publicación fue compartida.
        """
        return obj.shared.all().count()

class PostSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Post.

    Atributos:
        likes_count (int): Cantidad de "me gusta" recibidos por la publicación.
        shareds_count (int): Cantidad de veces que la publicación fue compartida.
        iliked (bool): Indica si el usuario actual dio "me gusta" a la publicación.
        ishared (bool): Indica si el usuario actual compartió la publicación.
        user (str): Nombre de usuario del creador de la publicación.
        avatar (str): URL del avatar del creador de la publicación.

    Meta:
        model: Modelo Post.
        fields: Lista de campos para el serializador.
    """

    user = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.ReadOnlyField(source='user.avatar.url')

    likes_count = serializers.SerializerMethodField(read_only=True)
    shareds_count = serializers.SerializerMethodField(read_only=True)

    iliked = serializers.SerializerMethodField(read_only=True)
    ishared = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 
                  'avatar', 
                  'content', 
                  'image', 'liked', 'shared', 'created_at', 'likes_count', 'shareds_count', 'iliked', 'ishared', 'parent']



    def get_avatar(self, obj):
        """
        Obtiene la URL del avatar del usuario asociado al objeto.

        Args:
            obj: Objeto Comment o Post.

        Returns:
            str: URL del avatar del usuario asociado al objeto.
        """
        return obj.user.avatar.url

    def get_likes_count(self, obj):
        """
        Obtiene la cantidad de "me gusta" recibidos por la publicación.

        Args:
            obj: Objeto Post.

        Returns:
            int: Cantidad de "me gusta" recibidos por la publicación.
        """
        return obj.liked.all().count()

    def get_shareds_count(self, obj):
        """
        Obtiene la cantidad de veces que la publicación fue compartida.

        Args:
            obj: Objeto Post.

        Returns:
            int: Cantidad de veces que la publicación fue compartida.
        """
        return obj.shared.all().count()

    def get_iliked(self, obj):
        """
        Indica si el usuario actual dio "me gusta" a la publicación.

        Args:
            obj: Objeto Post.

        Returns:
            bool: True si el usuario actual dio "me gusta", False de lo contrario.
        """
        return True if self.context['request'].user in obj.liked.all() else False

    def get_ishared(self, obj):
        """
        Indica si el usuario actual compartió la publicación.

        Args:
            obj: Objeto Post.

        Returns:
            bool: True si el usuario actual compartió la publicación, False de lo contrario.
        """
        return True if self.context['request'].user in obj.shared.all() else False
