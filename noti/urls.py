from django.urls import path
from . import views

urlpatterns = [
    # Ruta para obtener notificaciones leídas
    path('', views.noti),

    # Ruta para obtener notificaciones no leídas
    path('no/', views.noti_no_l),

    # Ruta para marcar notificaciones no leídas como leídas
    path('leer/', views.noti_read),
]

