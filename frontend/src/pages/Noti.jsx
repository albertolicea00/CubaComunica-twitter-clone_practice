import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getNoti, mark } from "../api/noti"
import Loader from "../components/Loader"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';


/**
 * Componente funcional que muestra las notificaciones del usuario.
 * Permite marcar las notificaciones como leídas y proporciona enlaces a las acciones relacionadas.
 *
 * @returns {JSX.Element} Elemento JSX que contiene la interfaz de las notificaciones.
 */
const Noti = () => {
  const APIbaseURL = "http://127.0.0.1:8000"; // process.env.REACT_APP_API_BASE_URL;
  const queryClient = useQueryClient()

  const markMutation = useMutation({
    mutationFn: mark,
    onSuccess: () => {
      queryClient.invalidateQueries("noti")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["noti"],
    queryFn: getNoti,
  })

  useEffect(() => {
    markMutation.mutate()
  }, [])


  if (isLoading) return <Loader />
  if (isError) return toast.error(error.message)

  return (
    <div>

      <div className="border-b-[1px] border-neutral-800 p-5">
        <div className="flex flex-row items-start gap-3">

          <div>
            <div className="flex flex-row items-center gap-2">
              <p className="text-white font-semibold text-xl">
                Novedades
              </p>
            </div>
          </div>

        </div>
      </div>

      {data?.map((p) => (
        <div key={p.id}>
            <div key={p.id} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
              <div className="flex flex-row items-start gap-3">

                <img className="h-11 w-11 rounded-full" 
                src={`${APIbaseURL + p.avatar}`} />

                <div>
                  <div className="flex flex-row items-center gap-2">

                    <p className="text-white font-semibold cursor-pointer hover:underline">
                      <Link to={`${p.user}`}>
                      @{p.from_user}
                      </Link>
                    </p>

                    <span className="text-neutral-500 text-sm">
                      {formatDistanceToNow(new Date(p.created_at), { addSuffix: true, locale: es })}
                    </span>

                  </div>


                  <div className="text-white mt-1 text-start">
                    {p.type}
                  </div>


                </div>

              </div>
            </div>
        </div>
      ))}
    </div>
  )
}

export default Noti
