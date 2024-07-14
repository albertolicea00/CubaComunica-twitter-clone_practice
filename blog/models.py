from django.db import models
from users.models import User

class Post(models.Model):
    """
    Modelo para almacenar publicaciones.

    Atributos:
        user (User): Usuario que creó la publicación.
        content (str): Contenido de la publicación.
        image (ImageField): Imagen asociada a la publicación (opcional).
        liked (ManyToManyField): Usuarios que han dado "me gusta" a la publicación.
        shared (ManyToManyField): Usuarios que han compartido la publicación.
        created_at (DateTimeField): Fecha y hora de creación de la publicación.

    Meta:
        ordering: Orden de las publicaciones por fecha de creación descendente.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=140)
    image = models.ImageField(blank=True, null=True)
    liked = models.ManyToManyField(User, default=None, blank=True, related_name='liked')
    shared = models.ManyToManyField(User, default=None, blank=True, related_name='shared')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

class Comment(models.Model):
    """
    Modelo para almacenar comentarios en publicaciones.

    Atributos:
        user (User): Usuario que creó el comentario.
        post (Post): Publicación a la que pertenece el comentario.
        body (str): Contenido del comentario.
        created_at (DateTimeField): Fecha y hora de creación del comentario.

    Meta:
        ordering: Orden de los comentarios por fecha de creación descendente.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='parent')
    body = models.CharField(max_length=140)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']


