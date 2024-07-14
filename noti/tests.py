from django.test import TestCase
from users.models import User
from blog.models import Post, Comment
from noti.models import Noti

class NotiModelTests(TestCase):
    """
    Pruebas para el modelo Noti.

    Métodos:
        setUpTestData(): Configura datos de prueba para las pruebas.
        test_noti_creation(): Verifica la creación adecuada de una instancia Noti.
    """

    @classmethod
    def setUpTestData(cls):
        """
        Configura datos de prueba para las pruebas.

        Crea usuarios de prueba, un Post y un Comentario.
        """
        cls.user1 = User.objects.create_user(username='user1', email='user1@example.com', password='testpass123')
        cls.user2 = User.objects.create_user(username='user2', email='user2@example.com', password='testpass123')

        cls.post = Post.objects.create(content='Hello, world!', user=cls.user1)

        cls.comment = Comment.objects.create(body='Buena pubblicación!', user=cls.user2, post=cls.post)

    def test_noti_creation(self):
        """
        Verifica la creación adecuada de una instancia Noti.
        """
        noti = Noti.objects.create(
            type='te ha comentado la publicación',
            from_user=self.user2,
            to_user=self.user1,
            post=self.post,
            comment=self.comment
        )
        self.assertEqual(noti.type, 'te ha comentado la publicación')
        self.assertEqual(noti.from_user, self.user2)
        self.assertEqual(noti.to_user, self.user1)
        self.assertEqual(noti.post, self.post)
        self.assertEqual(noti.comment, self.comment)
        self.assertFalse(noti.is_read)
