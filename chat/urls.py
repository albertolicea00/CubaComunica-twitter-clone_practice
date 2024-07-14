from django.urls import path
from . import  views

urlpatterns = [
    # Ruta para obtener mensajes de chat entre el usuario autenticado y otro usuario
    path('canal/<str:username>/', views.chat),
]
