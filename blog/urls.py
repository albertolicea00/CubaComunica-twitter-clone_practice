from django.urls import path
from . import views

urlpatterns = [
    # Ruta para obtener la lista de publicaciones y crear nuevas
    path('', views.PostList.as_view(), name='post-list'),

    # Ruta para obtener, actualizar y eliminar una publicación específica
    path('<int:pk>/', views.PostDetail.as_view(), name='post-detail'),

    # Ruta para obtener las publicaciones de un usuario específico
    path('my/<str:username>/', views.get_user_posts, name='user-posts'),

    # Ruta para dar "me gusta" o quitar "me gusta" a una publicación
    path('like/<int:pk>/', views.like, name='like-post'),

    # Ruta para compartir o dejar de compartir una publicación
    path('shared/<int:pk>/', views.shared, name='share-post'),

    # Ruta para obtener las publicaciones que le gustan a un usuario
    path('likes/<str:username>/', views.get_user_likes, name='user-likes'),

    # Ruta para obtener las publicaciones compartidas por un usuario
    path('shared/<str:username>/', views.get_user_shared, name='user-shared'),

    # Ruta para obtener la lista de comentarios y crear nuevos
    path('comments/<int:pk>/', views.CommentList.as_view(), name='comment-list'),

    # Ruta para obtener, actualizar y eliminar un comentario específico
    path('comment/<int:pk>/', views.CommentDetail.as_view(), name='comment-detail'),
]