from rest_framework import serializers
from . models import Noti
from blog.serializers import MyPostSerializer

class NotiSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Noti.

    Atributos:
        to_user (str): Nombre de usuario del destinatario de la notificación.
        avatar (str): URL del avatar del remitente de la notificación.
        from_user (str): Nombre de usuario del remitente de la notificación.
        post (MyPostSerializer): Serializador del modelo Post asociado (solo lectura).

    Meta:
        model: Modelo asociado al serializador (Noti).
        fields: Lista de campos que se incluirán en la serialización.
    
    Métodos:
        get_avatar(obj): Obtiene la URL del avatar del usuario asociado a la notificación.
    """
    to_user = serializers.ReadOnlyField(source='to_user.username')
    avatar = serializers.ReadOnlyField(source='from_user.avatar.url')
    from_user = serializers.ReadOnlyField(source='from_user.username')
    post = MyPostSerializer(read_only=True)

    class Meta:
        model = Noti
        fields = '__all__'

    def get_avatar(self, obj):
        """
        Obtiene la URL del avatar del usuario asociado a la notificación.

        Args:
            obj: Instancia del modelo Noti.

        Returns:
            str: URL del avatar del usuario asociado a la notificación.
        """
        return obj.user.avatar.url
