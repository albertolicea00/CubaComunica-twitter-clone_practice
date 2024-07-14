from django.contrib import admin
from .models import Post, Comment

class PostAdmin(admin.ModelAdmin):
    """
    Configuración de administración para el modelo Post.
    """

class CommentAdmin(admin.ModelAdmin):
    """
    Configuración de administración para el modelo Comment.
    """



admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
