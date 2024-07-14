import { AiOutlineRetweet } from 'react-icons/ai'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { shared } from '../api/blog'
import toast from "react-hot-toast";

/**
 * Componente Shared.
 * 
 * Un componente de React que representa la funcionalidad de compartir una publicación.
 * Utiliza React Query para manejar la mutación de compartir y actualizar las consultas relacionadas.
 * Muestra el ícono de retweet y cambia su color si el usuario actual ya ha compartido la publicación.
 * 
 * @component
 * @param {Object} props - Las propiedades pasadas al componente.
 * @param {Object} props.p - La publicación a compartir.
 * @param {string} [props.user] - El ID del usuario actual obtenido del almacenamiento local.
 * 
 * @returns {JSX.Element} El componente Shared con el ícono de retweet y manejo de compartir.
 */
const Shared = ({ p, user = localStorage.getItem("user_id") }) => {

  const queryClient = useQueryClient()

  const SharedMutation = useMutation({
    mutationFn: shared,
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const found = p.shared.some((key) => {
    if(key == user){
      return true
    } else {
      return false
    }
  })

  return (

    <AiOutlineRetweet size={20}
      onClick={() => SharedMutation.mutate(p.id)}
      { ...p.ishared || found ? {color: 'green'} : {color: 'white'}}
      />
  )
}

export default Shared
