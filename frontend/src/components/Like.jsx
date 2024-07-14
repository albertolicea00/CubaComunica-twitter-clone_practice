import { AiFillHeart } from 'react-icons/ai'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { like } from '../api/blog'
import toast from 'react-hot-toast'


/**
 * Componente Like.
 * 
 * Un componente de React que representa la funcionalidad de dar "Me gusta" a una publicación.
 * Utiliza React Query para manejar la mutación de dar "Me gusta" y actualizar las consultas relacionadas.
 * Muestra el ícono de corazón y cambia su color si el usuario actual ya ha dado "Me gusta" a la publicación.
 * 
 * @component
 * @param {Object} props - Las propiedades pasadas al componente.
 * @param {Object} props.p - La publicación a la que se le dará "Me gusta".
 * @param {string} [props.user] - El ID del usuario actual obtenido del almacenamiento local.
 * 
 * @returns {JSX.Element} El componente Like con el ícono de corazón y manejo de dar "Me gusta".
 */
const Like = ({ p, user = localStorage.getItem("user_id") }) => {

  const queryClient = useQueryClient()

  const likeMutation = useMutation({
    mutationFn: like,
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const found = p.liked.some((key) => {
    if(key == user){
      return true
    } else {
      return false
    }
  })

  return (
    <AiFillHeart 
      onClick={() => likeMutation.mutate(p.id)}
      { ...p.iliked || found ? {color: 'red'} : {color: 'white'} }
      size={20} />
  )
}

export default Like
