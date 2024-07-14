import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { storeAuthData, clearAuthData } from "./localStorage";

const baseURL = "http://127.0.0.1:8000"; // process.env.REACT_APP_API_BASE_URL;
const usersURL = "users";
const resetToken = 1000 * 60 * 5; // 5 MINUTOS  // process.env.REACT_APP_RESET_TOKEN_TIMER;

/**
 * Instancia de Axios para realizar solicitudes como un usuario invitado.
 * @type {AxiosInstance}
 */
export const guestAxios = axios.create({
  baseURL,
});

/**
 * Instancia de Axios para realizar solicitudes autenticadas.
 * @type {AxiosInstance}
 */
export const authAxios = axios.create({
  baseURL,
  withCredentials: true,
});

/**
 * Interceptor de solicitud para la instancia de Axios autenticada.
 * Agrega el token de acceso a los encabezados de la solicitud y maneja la actualización del token.
 * @param {Object} config - Configuración de la solicitud Axios.
 * @returns {Object} - Configuración de la solicitud actualizada.
 */
authAxios.interceptors.request.use(async (config) => {
  const access = localStorage.getItem("access");

  config.headers = {
    Authorization: `Bearer ${access}`,
  };

  const decoded = jwtDecode(access);

  const exp = new Date(decoded.exp * 1000);
  const now = new Date();

  // Verifica si el token de acceso está a punto de expirar
  if (exp.getTime() - now.getTime() < resetToken) {
    try {
      const oldRefresh = localStorage.getItem("refresh");
      // Realiza una solicitud para obtener un nuevo par de tokens de acceso y actualiza los datos de autenticación
      const res = await guestAxios.post(`${usersURL}/refresh/`, { oldRefresh });
      storeAuthData(res.data);
    } catch (err) {
      // Limpia los datos de autenticación y redirige a la página de inicio de sesión en caso de error
      clearAuthData();
      localStorage.clear();
      window.location.href = "/login";
    }
  } else {
    return config;
  }

  return config;
});
