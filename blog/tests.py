from django.test import TestCase
from users.models import User
from blog.models import Post, Comment

class PostModelTests(TestCase):
    """
    Pruebas para el modelo Post.

    Métodos:
        test_post_creation(): Verifica la creación adecuada de una instancia Post.
    """

    @classmethod
    def setUpTestData(cls):
        """
        Configuración de datos para las pruebas.
        """
        cls.user1 = User.objects.create_user(username='user1', email='user1@example.com', password='testpass123')

    def test_post_creation(self):
        """
        Verifica la creación adecuada de una instancia Post.
        """
        post = Post.objects.create(
            user=self.user1,
            content='Que hay, world!',
        )
        self.assertEqual(post.user, self.user1)
        self.assertEqual(post.content, 'Que hay, world!')
        self.assertEqual(post.liked.count(), 0)
        self.assertEqual(post.shared.count(), 0)

class CommentModelTests(TestCase):
    """
    Pruebas para el modelo Comment.

    Métodos:
        test_comment_creation(): Verifica la creación adecuada de una instancia Comment.
    """

    @classmethod
    def setUpTestData(cls):
        """
        Configuración de datos para las pruebas.
        """
        
        cls.user1 = User.objects.create_user(username='user1', email='user1@example.com', password='testpass123')
        cls.user2 = User.objects.create_user(username='user2', email='user2@example.com', password='testpass123')

        cls.post = Post.objects.create(content='Que hay, world!', user=cls.user1)

    def test_comment_creation(self):
        """
        Verifica la creación adecuada de una instancia Comment.
        """
        comment = Comment.objects.create(
            user=self.user2,
            post=self.post,
            body='Buena publicación!',
        )
        self.assertEqual(comment.user, self.user2)
        self.assertEqual(comment.post, self.post)
        self.assertEqual(comment.body, 'Buena publicación!')
