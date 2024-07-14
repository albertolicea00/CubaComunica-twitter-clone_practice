from django.contrib import admin
from .models import Noti

class NotiAdmin(admin.ModelAdmin):
    """
    Configuración de administración para el modelo Noti.
    """



admin.site.register(Noti, NotiAdmin)
