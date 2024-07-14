import { guestAxios, authAxios } from "./useAxios";
import { storeAuthData, clearAuthData } from "./localStorage";
import toast from "react-hot-toast";

const usersURL = "users";

/**
 * Realiza una solicitud para seguir a un usuario.
 * @param {string} username - Nombre de usuario del usuario a seguir.
 */
export const follow = async (username) => {
  await authAxios.post(`/${usersURL}/follow/${username}/`);
};

/**
 * Obtiene recomendaciones de usuarios para seguir.
 * @returns {Promise} - Promesa que se resuelve con los datos de recomendación.
 */
export const reco = async () => {
  const res = await authAxios.get(`/${usersURL}/reco/`);
  return res.data;
};

/**
 * Realiza una búsqueda de usuarios según una consulta.
 * @param {string} query - Consulta de búsqueda.
 * @returns {Promise} - Promesa que se resuelve con los resultados de la búsqueda.
 */
export const q = async (query) => {
  const res = await authAxios.get(`/${usersURL}/u/search/?query=${query}`);
  return res.data;
};

/**
 * Actualiza los datos del usuario autenticado.
 * @param {object} data - Datos a actualizar.
 */
export const updateUserData = async (data) => {
  await authAxios.put(
    `/${usersURL}/${localStorage.getItem("username")}/`,
    data
  );
};

/**
 * Obtiene los datos de un usuario.
 * @param {string} username - Nombre de usuario del usuario.
 * @returns {Promise} - Promesa que se resuelve con los datos del usuario.
 */
export const getUserData = async (username) => {
  const res = await authAxios.get(`/${usersURL}/${username}/`);
  return res.data;
};

/**
 * Obtiene el perfil de un usuario.
 * @param {string} username - Nombre de usuario del usuario.
 * @returns {Promise} - Promesa que se resuelve con los datos del perfil del usuario.
 */
export const userProfile = async (username) => {
  const res = await authAxios.get(`/${usersURL}/${username}/`);
  return res.data;
};

/**
 * Realiza una solicitud de registro de usuario.
 * @param {object} data - Datos de registro del usuario.
 */
export const registerReq = async (data) => {
  try {
    const res = await guestAxios.post(`/${usersURL}/register/`, data);
    if (res.data.username) loginReq(data);
    else if (res.data) toast.error(res.data);
  } catch (error) {
    toast.error("Ocurrió un error");
  }
};

/**
 * Realiza una solicitud de inicio de sesión.
 * @param {object} data - Credenciales de inicio de sesión.
 */
export const loginReq = async (data) => {
  try {
    const res = await guestAxios.post(`/${usersURL}/login/`, data);
    storeAuthData(res.data);
    window.location.href = "/";
  } catch (err) {
    toast.error("Credenciales invalidas");
  }
};

/**
 * Cierra la sesión del usuario autenticado.
 */
export const logout = () => {
  clearAuthData();
};
