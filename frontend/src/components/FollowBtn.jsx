import { follow } from "../api/users"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'


/**
 * Botón de Seguir/Dejar de Seguir.
 * 
 * Este componente proporciona un botón para seguir o dejar de seguir a un usuario.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.user - Información del usuario al que se sigue.
 * @param {boolean} props.page - Indica si se muestra en una página de usuario individual.
 * @returns {JSX.Element} El componente FollowBtn.
 */
const FollowBtn = ({ user, page }) => {

  const queryClient = useQueryClient()

  const followMutation = useMutation({
    mutationFn: follow,
    onSuccess: () => {
      queryClient.invalidateQueries(['user'])
      toast.success(user.i_follow ? 'Ya no lo sigues' : 'Ahora lo sigues')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return (
    <>
    {page  ? (
        <button 
            onClick={() => followMutation.mutate(user.username)}
            className="bg-slate-200 mr-7 text-black font-semibold rounded-full px-8 py-3 mt-5 ml-3 hover:bg-slate-400 transition">
            {user.i_follow ? "Dejar de Seguir" : "Seguir"}
        </button>
    ) : (

        <button 
            onClick={() => followMutation.mutate(user.username)}
            className="ml-auto bg-white text-black rounded-full font-bold text-sm py-1.5 px-3.5">
            {user.i_follow ? "No Seguir" : "Seguir"}
        </button>
    )}
    </>
  )
}

export default FollowBtn  
