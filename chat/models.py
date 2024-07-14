from django.db import models

class Chat(models.Model):
    """
    Modelo para almacenar mensajes de chat.

    Atributos:
        username (str): Nombre de usuario asociado al mensaje.
        message (str): Contenido del mensaje.
        canal (str): Nombre del canal de chat al que pertenece el mensaje.
    """
    username = models.CharField(max_length=50)
    message = models.CharField(max_length=50)
    canal = models.CharField(max_length=50)
