import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from . models import Chat

class PersonalChatConsumer(AsyncWebsocketConsumer):
    """
    Consumidor de WebSockets para el chat personal entre dos usuarios.

    Métodos:
        connect(): Maneja la conexión del WebSocket.
        receive(text_data): Maneja la recepción de mensajes desde el WebSocket.
        chat_message(event): Maneja el envío de mensajes al WebSocket del grupo de chat.
        disconnect(code): Maneja la desconexión del WebSocket.

        save_message(username, canal, message): Guarda el mensaje en la base de datos de manera asincrónica.
    """
    async def connect(self):
        """
        Maneja la conexión del WebSocket entre dos usuarios.
        Configura el nombre del canal de chat y añade el canal al grupo.

        Args:
            Ninguno.

        Returns:
            None.
        """
        self.my_user = self.scope['url_route']['kwargs']['my_username']
        self.other_username = self.scope['url_route']['kwargs']['username']

        if self.my_user > self.other_username:
            self.room_name = f'{self.other_username}-{self.my_user}'
        else:
            self.room_name = f'{self.my_user}-{self.other_username}'

        self.room_group_name = f'chat_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def receive(self, text_data=None):
        """
        Maneja la recepción de mensajes desde el WebSocket.
        Guarda el mensaje en la base de datos y envía el mensaje al grupo de chat.

        Args:
            text_data (str): Datos de texto recibidos desde el WebSocket.

        Returns:
            None.
        """
        data = json.loads(text_data)
        message = data['message']
        username = data['username']

        await self.save_message(username, self.room_group_name, message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
            }
        )

    async def chat_message(self, event):
        """
        Maneja el envío de mensajes al WebSocket del grupo de chat.
        Envia el mensaje al WebSocket del usuario.

        Args:
            event (dict): Evento con información del mensaje.

        Returns:
            None.
        """
        message = event['message']
        username = event['username']

        await self.send(text_data=json.dumps({
            'type': 'chat_message_echo',
            'message': message,
            'username': username
        }))

    async def disconnect(self, code):
        """
        Maneja la desconexión del WebSocket.
        Remueve el canal del grupo.

        Args:
            code: Código de desconexión.

        Returns:
            None.
        """
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    @database_sync_to_async
    def save_message(self, username, canal, message):
        """
        Guarda el mensaje en la base de datos de manera asincrónica.

        Args:
            username (str): Nombre de usuario asociado al mensaje.
            canal (str): Nombre del canal de chat al que pertenece el mensaje.
            message (str): Contenido del mensaje.
        """
        Chat.objects.create(
            username=username, message=message, canal=canal)
