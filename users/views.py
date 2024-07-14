from rest_framework import status
from rest_framework import generics
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import MyTokenObtainPairSerializer, MyUserSerializer, UserSerializer, SearchSerializer
from .permissions import IsUserOrReadOnly
from noti.serializers import NotiSerializer
from noti.models import Noti
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow(request, username):
    """
    Permite a un usuario autenticado seguir o dejar de seguir a otro usuario.

    Métodos HTTP admitidos:
        - POST

    Args:
        request: Objeto de solicitud.
        username (str): Nombre de usuario del usuario al que se desea seguir.

    Returns:
        Response: Respuesta JSON indicando el resultado de la operación.
    """
    me = request.user
    user = User.objects.get(username=username)

    if user in me.following.all():
        me.following.remove(user)
        return Response({ 'detail': 'Ya no lo sigues' }, status=status.HTTP_200_OK)
    else:
        me.following.add(user)
        noti = Noti(
            type='te empezó a seguir',
            to_user=user,
            from_user=me
                )
        noti.save()
        serializer = NotiSerializer(noti, many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def reco(request):
    """
    Recopila y devuelve una lista de usuarios recomendados para seguir.

    Métodos HTTP admitidos:
        - GET

    Args:
        request: Objeto de solicitud.

    Returns:
        Response: Respuesta JSON con la lista de usuarios recomendados.
    """
    users = User.objects.exclude(username=request.user.username)
    users = users.exclude(id__in = request.user.following.all())[:5]
    serializer = SearchSerializer(users, many=True, context={"request": request})
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search(request):
    """
    Busca y devuelve una lista de usuarios que coinciden con la consulta proporcionada.

    Métodos HTTP admitidos:
        - GET

    Args:
        request: Objeto de solicitud.

    Query Parameters:
        query (str): Cadena de búsqueda para encontrar usuarios por su nombre de usuario.

    Returns:
        Response: Respuesta JSON con la lista de usuarios coincidentes.
    """
    query = request.query_params.get('query', None)
    if query is not None:
        users = User.objects.filter(username__icontains=query)
        serializer = SearchSerializer(users, many=True, context={"request": request})
        return Response({ 'users': serializer.data })
    else:
        return Response({'users': []})


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Vista para ver, actualizar y eliminar detalles de un usuario.

    Métodos HTTP admitidos:
        - GET: Obtiene los detalles de un usuario.
        - PUT/PATCH: Actualiza los detalles de un usuario.
        - DELETE: Elimina un usuario.

    Atributos:
        queryset: Conjunto de objetos de usuarios disponibles para esta vista.
        serializer_class: Clase del serializador utilizada para serializar y deserializar objetos de usuario.
        permission_classes: Lista de clases de permisos que se aplican a esta vista.
        lookup_field: Campo utilizado para buscar usuarios en la base de datos.
        lookup_url_kwarg: Nombre del argumento de la URL que contiene el valor del campo de búsqueda.

    Args:
        username: Nombre de usuario del usuario cuyos detalles se están solicitando, actualizando o eliminando.

    Returns:
        Response: Respuesta JSON con los detalles del usuario o el resultado de la acción.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]
    lookup_field = 'username'
    lookup_url_kwarg = 'username'

class MyTokenObtainPairView(TokenObtainPairView):
    """
    Vista para obtener un par de tokens de acceso y de actualización.

    Atributos:
        serializer_class: Clase del serializador utilizada para la obtención de tokens.

    Métodos HTTP admitidos:
        - POST: Obtiene un nuevo par de tokens utilizando credenciales de usuario.

    Args:
        request: Objeto de solicitud con credenciales de usuario.

    Returns:
        Response: Respuesta JSON con el par de tokens de acceso y actualización.
    """
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def register(request):
    """
    Vista para registrar un nuevo usuario.

    Métodos HTTP admitidos:
        - POST: Crea un nuevo usuario.

    Args:
        request: Objeto de solicitud con los datos del nuevo usuario.

    Returns:
        Response: Respuesta JSON indicando el resultado del registro o posibles errores.
    """
    data = request.data

    
    if User.objects.filter(username=data['username']).exists():
        return Response("El nombre de usuario ya está en uso.")

    try:
        validate_email(data['email'])
    except ValidationError:
        return Response("El correo electrónico no tiene un formato válido.")
    if User.objects.filter(email=data['email']).exists():
        return Response("El correo electrónico ya está en uso.")

    user = User.objects.create(
        username=data['username'],
        email=data['email'],
        password=make_password(data['password'])
    )
    serializer = MyUserSerializer(user, many=False)
    return Response(serializer.data)