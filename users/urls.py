from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Ruta para seguir/dejar de seguir a un usuario
    path('follow/<str:username>/', views.follow),

    # Ruta para buscar usuarios
    path('u/search/', views.search),

    # Ruta para obtener recomendaciones de usuarios
    path('reco/', views.reco),

    # Ruta para registrar un nuevo usuario
    path('register/', views.register),

    # Ruta para iniciar sesión y obtener tokens de acceso/actualización
    path('login/', views.MyTokenObtainPairView.as_view()),

    # Ruta para obtener un nuevo token de acceso utilizando un token de actualización
    path('refresh/', TokenRefreshView.as_view()),

    # Ruta para ver, actualizar y eliminar detalles de un usuario
    path('<str:username>/', views.UserDetailView.as_view()),
]
