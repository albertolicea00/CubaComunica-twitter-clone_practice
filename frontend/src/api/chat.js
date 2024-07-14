import { authAxios } from "./useAxios";

/**
 * Obtiene los mensajes de chat entre el usuario autenticado y otro usuario.
 * @param {string} username - Nombre de usuario del otro usuario en el chat.
 * @returns {Promise} - Promesa que se resuelve con los mensajes de chat.
 */
export const getChat = async (username) => {
  const response = await authAxios.get(`/chat/canal/${username}/`);
  return response.data;
}
