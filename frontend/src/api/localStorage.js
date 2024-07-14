import { jwtDecode } from "jwt-decode";

/**
 * Almacena los datos de autenticación en el almacenamiento local.
 * @param {Object} data - Datos de autenticación que incluyen access y refresh tokens.
 */
export const storeAuthData = (data) => {
  const { access, refresh } = data;

  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);

  const user = jwtDecode(localStorage.getItem("access"));

  localStorage.setItem("username", user.username);
  localStorage.setItem("user_id", user.user_id);
  localStorage.setItem("avatar", user.avatar);
};

/**
 * Elimina todos los datos de autenticación del almacenamiento local.
 */
export const clearAuthData = () => {
  localStorage.clear();
};
