from django.db import models
from users.models import User
from blog.models import Post, Comment

class Noti(models.Model):
    """
    Modelo para almacenar notificaciones.

    Atributos:
        type (str): Tipo de notificación.
        from_user (User): Usuario que envía la notificación.
        to_user (User): Usuario que recibe la notificación.
        post (Post): Post asociado a la notificación (opcional).
        comment (Comment): Comentario asociado a la notificación (opcional).
        created_at (datetime): Fecha y hora de creación de la notificación.
        is_read (bool): Indica si la notificación ha sido leída.

    Meta:
        ordering: Lista de campos utilizados para ordenar las notificaciones por fecha de creación.
    """
    type = models.CharField(max_length=40)
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='noti_from')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='noti_to')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
