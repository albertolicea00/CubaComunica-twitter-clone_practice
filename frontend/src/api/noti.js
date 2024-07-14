import { authAxios } from "./useAxios";

/**
 * Marca todas las notificaciones como leídas.
 * @returns {Promise<void>} - Promesa que se resuelve después de marcar las notificaciones como leídas.
 */
export const mark = async () => {
  await authAxios.put("/noti/leer/");
}

/**
 * Obtiene todas las notificaciones no leídas.
 * @returns {Promise<Array>} - Promesa que se resuelve con los datos de las notificaciones no leídas.
 */
export const getNoLeidas = async () => {
  const res = await authAxios.get("/noti/no/");
  return res.data;
}

/**
 * Obtiene todas las notificaciones.
 * @returns {Promise<Array>} - Promesa que se resuelve con los datos de todas las notificaciones.
 */
export const getNoti = async () => {
  const res = await authAxios.get("/noti/");
  return res.data;
}

