from rest_framework import serializers
from . models import Chat

class ChatSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Chat.

    Meta:
        model: Modelo asociado al serializador (Chat).
        fields: Lista de campos que se incluirán en la serialización.
    """
    class Meta:
        model = Chat
        fields = '__all__'
