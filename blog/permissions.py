from rest_framework import permissions

class IsUserOrReadOnly(permissions.BasePermission):
    """
    Permisos personalizados para permitir el acceso de lectura a cualquier usuario
    y permisos de escritura solo al propietario del objeto.

    Métodos:
        has_object_permission(request, view, obj): Determina si el usuario tiene permisos sobre el objeto.

    Args:
        request (HttpRequest): Objeto de solicitud.
        view: Vista que maneja la solicitud.
        obj: Objeto sobre el cual se están verificando los permisos.

    Returns:
        bool: True si el usuario tiene permisos, False en caso contrario.
    """
    def has_object_permission(self, request, view, obj):
        """
        Determina si el usuario tiene permisos sobre el objeto.

        Args:
            request (HttpRequest): Objeto de solicitud.
            view: Vista que maneja la solicitud.
            obj: Objeto sobre el cual se están verificando los permisos.

        Returns:
            bool: True si el usuario tiene permisos, False en caso contrario.
        """
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user

