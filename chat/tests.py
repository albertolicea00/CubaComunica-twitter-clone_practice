from django.test import TestCase
from chat.models import Chat

class ChatModelTests(TestCase):
    """
    Pruebas para el modelo Chat.

    Métodos:
        test_chat_creation(): Verifica la creación adecuada de una instancia Chat.
    """
    def test_chat_creation(self):
        """
        Verifica la creación adecuada de una instancia Chat.
        """
        chat = Chat.objects.create(
            username='user1',
            message='Que bolá, bro!',
            canal='general'
        )
        self.assertEqual(chat.username, 'user1')
        self.assertEqual(chat.message, 'Que bolá, bro!')
        self.assertEqual(chat.canal, 'general')
