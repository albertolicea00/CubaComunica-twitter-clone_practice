import { authAxios } from "./useAxios";

const blogURL = 'blog';

/**
 * Realiza una solicitud para editar un comentario.
 * @param {object} data - Datos del comentario a editar.
 */
export const editComment = async (data) => {
  await authAxios.put(`/${blogURL}/comment/${data.id}/`, data);
}

/**
 * Realiza una solicitud para eliminar un comentario.
 * @param {number} id - Identificador del comentario a eliminar.
 */
export const deleteComment = async (id) => {
  await authAxios.delete(`/${blogURL}/comment/${id}/`);
}

/**
 * Realiza una solicitud para agregar un comentario a una publicación.
 * @param {object} data - Datos del comentario a agregar.
 */
export const addComment = async (data) => {
  await authAxios.post(`/${blogURL}/comments/${data.id}/`, data);
}

/**
 * Obtiene los comentarios asociados a una publicación.
 * @param {number} id - Identificador de la publicación.
 * @returns {Promise} - Promesa que se resuelve con los comentarios de la publicación.
 */
export const getComments = async (id) => { 
  const response = await authAxios.get(`/${blogURL}/comments/${id}/`);
  return response.data;
}

/**
 * Obtiene las publicaciones que le gustan a un usuario.
 * @param {string} username - Nombre de usuario del usuario.
 * @returns {Promise} - Promesa que se resuelve con las publicaciones que le gustan al usuario.
 */
export const getUserLikes = async (username)  => {
  const response = await authAxios.get(`/${blogURL}/likes/${username}/`);
  return response.data;
}

/**
 * Obtiene las publicaciones compartidas por un usuario.
 * @param {string} username - Nombre de usuario del usuario.
 * @returns {Promise} - Promesa que se resuelve con las publicaciones compartidas por el usuario.
 */
export const getUserShared = async (username)  => {
  const response = await authAxios.get(`/${blogURL}/shared/${username}/`);
  return response.data;
}

/**
 * Obtiene los detalles de una publicación.
 * @param {number} id - Identificador de la publicación.
 * @returns {Promise} - Promesa que se resuelve con los detalles de la publicación.
 */
export const getSoloPost = async (id) => {
  const response = await authAxios.get(`/${blogURL}/${id}/`);
  return response.data;
}

/**
 * Realiza una solicitud para compartir una publicación.
 * @param {number} id - Identificador de la publicación a compartir.
 */
export const shared = async (id) => {
  await authAxios.post(`/${blogURL}/shared/${id}/`);
}

/**
 * Realiza una solicitud para indicar que a un usuario le gusta una publicación.
 * @param {number} id - Identificador de la publicación que le gusta al usuario.
 */
export const like = async (id) => {
  await authAxios.post(`/${blogURL}/like/${id}/`);
}

/**
 * Realiza una solicitud para eliminar una publicación.
 * @param {number} id - Identificador de la publicación a eliminar.
 */
export const deletePost = async (id) => {
  await authAxios.delete(`/${blogURL}/${id}/`);
}

/**
 * Realiza una solicitud para editar una publicación.
 * @param {object} data - Datos de la publicación a editar.
 */
export const editPost = async (data) => {
  await authAxios.put(`/${blogURL}/${data.get('id')}/`, data);
}

/**
 * Obtiene las publicaciones de un usuario.
 * @param {string} username - Nombre de usuario del usuario.
 * @returns {Promise} - Promesa que se resuelve con las publicaciones del usuario.
 */
export const getUserPosts = async (username) => {
  const response = await authAxios.get(`/${blogURL}/my/${username}/`);
  return response.data;

}

/**
 * Realiza una solicitud para agregar una nueva publicación.
 * @param {object} data - Datos de la nueva publicación.
 */
export const addPost = async (data) => {
  await authAxios.post(`/${blogURL}/`, data);
}

/**
 * Obtiene las publicaciones paginadas.
 * @param {object} params - Parámetros de paginación.
 * @returns {Promise} - Promesa que se resuelve con las publicaciones paginadas.
 */
export const getPosts = async ({ pageParam = 1 }) => {
  const response = await authAxios.get(`/${blogURL}/?page=${pageParam}&pages=10`);
  return response.data;
}

