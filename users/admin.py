from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    """
    Configuración de administración para el modelo User.
    """



admin.site.register(User, UserAdmin)
