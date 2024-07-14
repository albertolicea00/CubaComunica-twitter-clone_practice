from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from . models import Post, Comment
from users.models import User
from . serializers import PostSerializer, MyPostSerializer, CommentSerializer
from .permissions import IsUserOrReadOnly
from backend.pagination import CustomPagination
from noti.models import Noti

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_likes(request, username):
    """
    Obtiene las publicaciones que le han gustado al usuario especificado.

    Args:
        request: Objeto de solicitud de Django.
        username (str): Nombre de usuario del usuario cuyas publicaciones le han gustado.

    Returns:
        Response: Respuesta con las publicaciones que le han gustado al usuario.
    """
    user = User.objects.get(username=username)
    posts = Post.objects.filter(liked=user)
    serializer = MyPostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_shared(request, username):
    """
    Obtiene las publicaciones compartidas por el usuario especificado.

    Args:
        request: Objeto de solicitud de Django.
        username (str): Nombre de usuario del usuario que ha compartido publicaciones.

    Returns:
        Response: Respuesta con las publicaciones compartidas por el usuario.
    """
    user = User.objects.get(username=username)
    posts = Post.objects.filter(shared=user)
    serializer = MyPostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like(request, pk):
    """
    Maneja la acción de dar o quitar "Me gusta" a una publicación.

    Args:
        request: Objeto de solicitud de Django.
        pk (int): Clave primaria de la publicación.

    Returns:
        Response: Respuesta indicando el estado de la acción.
    """
    post = Post.objects.get(pk=pk)
    if request.user in post.liked.all():
        post.liked.remove(request.user)
    else:
        post.liked.add(request.user)
        if request.user != post.user:
            Noti.objects.get_or_create(type='le gusto tu publicación', post=post, to_user=post.user, from_user=request.user)
    return Response({'status': 'ok'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def shared(request, pk):
    """
    Maneja la acción de compartir o dejar de compartir una publicación.

    Args:
        request: Objeto de solicitud de Django.
        pk (int): Clave primaria de la publicación.

    Returns:
        Response: Respuesta indicando el estado de la acción.
    """
    post = Post.objects.get(pk=pk)
    if request.user in post.shared.all():
        post.shared.remove(request.user)
    else:
        post.shared.add(request.user)
        if request.user != post.user:
            Noti.objects.get_or_create(type='compartió tu publicación', post=post, to_user=post.user, from_user=request.user)
    return Response({'status': 'ok'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_posts(request, username):
    """
    Obtiene las publicaciones del usuario especificado.

    Args:
        request: Objeto de solicitud de Django.
        username (str): Nombre de usuario del usuario cuyas publicaciones se desean obtener.

    Returns:
        Response: Respuesta con las publicaciones del usuario.
    """
    user = User.objects.get(username=username)
    posts = Post.objects.filter(user=user)
    serializer = MyPostSerializer(posts, many=True)
    return Response(serializer.data)

class PostList(generics.ListCreateAPIView):
    """
    Vista para listar y crear publicaciones.

    Attributes:
        queryset (QuerySet): Conjunto de datos de todas las publicaciones.
        serializer_class (PostSerializer): Clase del serializador para las publicaciones.
        permission_classes (list): Lista de clases de permisos requeridas para acceder a la vista.
        pagination_class (CustomPagination): Clase de paginación personalizada.

    Methods:
        perform_create(self, serializer): Crea una nueva publicación asociada al usuario actual.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination

    def perform_create(self, serializer):
        """
        Crea una nueva publicación asociada al usuario actual.

        Args:
            serializer: Instancia del serializador de la publicación.

        Returns:
            None
        """
        serializer.save(user=self.request.user)

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Vista para obtener, actualizar y eliminar una publicación específica.

    Attributes:
        queryset (QuerySet): Conjunto de datos de todas las publicaciones.
        serializer_class (PostSerializer): Clase del serializador para las publicaciones.
        permission_classes (list): Lista de clases de permisos requeridas para acceder a la vista.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Vista de detalle, actualización y eliminación de un comentario.

    Attributes:
        queryset (QuerySet): Conjunto de datos que representa todos los comentarios.
        serializer_class (CommentSerializer): Clase del serializador asociado a los comentarios.
        permission_classes (list): Lista de clases de permisos requeridos para acceder a la vista.
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]

class CommentList(generics.ListCreateAPIView):
    """
    Vista para obtener la lista de comentarios asociados a una publicación y crear nuevos comentarios.

    Attributes:
        queryset (QuerySet): Conjunto de datos que representa todos los comentarios.
        serializer_class (CommentSerializer): Clase del serializador asociado a los comentarios.
        permission_classes (list): Lista de clases de permisos requeridos para acceder a la vista.
    """
    
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        """
        Obtiene la publicación asociada al comentario.

        Args:
            pk (int): Clave primaria de la publicación.

        Returns:
            Post: Objeto de la publicación asociada al comentario.
        """
        post = Post.objects.get(id=pk)
        return post

    def get(self, request, pk):
        """
        Obtiene todos los comentarios asociados a una publicación.

        Args:
            request: Objeto de solicitud de Django.
            pk (int): Clave primaria de la publicación.

        Returns:
            Response: Respuesta con los comentarios asociados a la publicación.
        """
        post = self.get_object(pk)
        comments = Comment.objects.filter(post=post)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def create(self, request, pk):
        """
        Crea un nuevo comentario en una publicación.

        Args:
            request: Objeto de solicitud de Django.
            pk (int): Clave primaria de la publicación.

        Returns:
            Response: Respuesta con el comentario recién creado.
        """
        post = self.get_object(pk)
        data = request.data
        comment = Comment(
            user=request.user,
            body=data['body'],
            post=post
                )
        comment.save()
        if request.user != post.user:
            Noti.objects.get_or_create(type='Comentó tu publicación', post=post, to_user=post.user, from_user=request.user)
        serializer = CommentSerializer(comment, many=False)
        return Response(serializer.data)

