from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from users.models import User
from . models import Chat
from . serializers import ChatSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def chat(request, username):
    """
    Vista para obtener mensajes de chat entre el usuario autenticado y otro usuario.

    Métodos HTTP admitidos:
        - GET: Obtiene los mensajes de chat entre el usuario autenticado y otro usuario.

    Args:
        request: Objeto de solicitud con el usuario autenticado.
        username (str): Nombre de usuario del otro usuario con el que se desea obtener el chat.

    Returns:
        Response: Respuesta JSON con los mensajes de chat.
    """
    user_obj = User.objects.get(username=username)

    if request.user.username > user_obj.username:
        canal = f'chat_{user_obj.username}-{request.user.username}'
        print(canal)

    else:
        canal = f'chat_{request.user.username}-{user_obj.username}'
        print(canal)

    mess = Chat.objects.filter(canal=canal)
    serializer = ChatSerializer(mess, many=True)
    return Response(serializer.data)