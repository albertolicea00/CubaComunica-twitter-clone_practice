from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from . models import Noti
from . serializers import NotiSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def noti(request):
    """
    Vista para obtener notificaciones leídas de un usuario autenticado.

    Métodos HTTP admitidos:
        - GET: Obtiene notificaciones leídas del usuario.

    Args:
        request: Objeto de solicitud con el usuario autenticado.

    Returns:
        Response: Respuesta JSON con las notificaciones leídas.
    """
    user = request.user
    notis = Noti.objects.filter(to_user=user, is_read=True)
    serializer = NotiSerializer(notis, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def noti_no_l(request):
    """
    Vista para obtener notificaciones no leídas de un usuario autenticado.

    Métodos HTTP admitidos:
        - GET: Obtiene notificaciones no leídas del usuario.

    Args:
        request: Objeto de solicitud con el usuario autenticado.

    Returns:
        Response: Respuesta JSON con las notificaciones no leídas.
    """
    user = request.user
    notis = Noti.objects.filter(to_user=user, is_read=False)
    serializer = NotiSerializer(notis, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def noti_read(request):
    """
    Vista para marcar todas las notificaciones no leídas como leídas.

    Métodos HTTP admitidos:
        - PUT: Marca todas las notificaciones no leídas como leídas.

    Args:
        request: Objeto de solicitud con el usuario autenticado.

    Returns:
        Response: Respuesta JSON indicando que las notificaciones han sido marcadas como leídas.
    """
    user = request.user
    notis = Noti.objects.filter(to_user=user, is_read=False)
    for noti in notis:
        noti.is_read = True
        noti.save()
    return Response({ 'message': 'Leido'})