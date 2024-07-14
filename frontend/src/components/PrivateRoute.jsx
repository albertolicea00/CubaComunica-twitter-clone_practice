import { Outlet, Navigate } from "react-router-dom";

/**
 * Componente PrivateRoute.
 * 
 * Un componente de React que sirve como ruta privada para proteger las rutas que requieren autenticación.
 * Verifica si hay un usuario autenticado almacenado en el almacenamiento local.
 * Si existe, renderiza el contenido de la ruta (Outlet); de lo contrario, redirige a la página de inicio de sesión.
 * 
 * @component
 * @returns {JSX.Element} El componente PrivateRoute que renderiza el contenido de la ruta o redirige a la página de inicio de sesión.
 */
const PrivateRoute = () => {
  const user = localStorage.getItem("user_id");

  return user ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;
