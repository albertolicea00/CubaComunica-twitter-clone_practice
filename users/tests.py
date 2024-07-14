from django.test import TestCase
from django.contrib.auth import get_user_model

class CustomUserTests(TestCase):
    """
    Pruebas para el modelo de usuario personalizado.

    Métodos:
        test_create_user(): Verifica la creación de un usuario estándar.
        test_create_superuser(): Verifica la creación de un superusuario.
    """

    def test_create_user(self):
        """
        Verifica la creación de un usuario estándar.
        """
        User = get_user_model()
        user = User.objects.create_user(
            username='user1',
            email='user1@example.com',
            password='testpass123'
        )
        self.assertEqual(user.username, 'user1')
        self.assertEqual(user.email, 'user1@example.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        """
        Verifica la creación de un superusuario.
        """
        User = get_user_model()
        admin_user = User.objects.create_superuser(
            username='superadmin',
            email='superadmin@example.com',
            password='testpass123'
        )
        self.assertEqual(admin_user.username, 'superadmin')
        self.assertEqual(admin_user.email, 'superadmin@example.com')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)

class UserProfileTests(TestCase):
    """
    Pruebas para el perfil de usuario.

    Métodos:
        setUpTestData(): Configuración de datos de prueba.
        test_user_profile(): Verifica la información del perfil de usuario.
    """
    
    @classmethod
    def setUpTestData(cls):
        """
        Configuración de datos de prueba.
        """
        User = get_user_model()
        cls.user = User.objects.create_user(
            username='user1',
            email='user1@example.com',
            password='testpass123'
        )

    def test_user_profile(self):
        """
        Verifica la información del perfil de usuario.
        """
        self.assertEqual(f'{self.user.username}', 'user1')
        self.assertEqual(f'{self.user.email}', 'user1@example.com')
        self.assertEqual(self.user.followed.count(), 0)
