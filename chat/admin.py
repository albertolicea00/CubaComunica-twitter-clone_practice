from django.contrib import admin
from .models import Chat

class ChatAdmin(admin.ModelAdmin):
    """
    Configuración de administración para el modelo Chat.
    """


admin.site.register(Chat, ChatAdmin)

