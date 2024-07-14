import { useQuery } from "@tanstack/react-query"
import { AiOutlineMessage } from "react-icons/ai"
import { getUserShared } from "../api/blog"
import { toast } from "react-hot-toast"
import Loader from "./Loader"
import Like from "./Like"
import Shared from "./Shared"
import { Link } from "react-router-dom"
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';


/**
 * Componente MyShared.
 * 
 * Un componente de React que muestra las publicaciones compartidas de un usuario.
 * Utiliza React Query para obtener las publicaciones compartidas del servidor.
 * Muestra la información de cada publicación, como el usuario que la compartió,
 * la fecha de creación, el contenido de la publicación y estadísticas como comentarios,
 * compartidos y likes.
 * 
 * @component
 * @param {Object} props - Las propiedades pasadas al componente.
 * @param {Object} props.user - El objeto de usuario para el cual se están mostrando las publicaciones compartidas.
 * 
 * @returns {JSX.Element} El componente MyShared con las publicaciones compartidas del usuario.
 */
const MyShared = ({ user }) => {
  const APIbaseURL = "http://127.0.0.1:8000"; // process.env.REACT_APP_API_BASE_URL;
  const userId = localStorage.getItem('user_id')

  const { data: shared, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getUserShared(user.username),
  })

  if (isLoading) return <Loader />
  if (isError) return toast.error(error.message)

  if (!Array.isArray(shared) || shared.length === 0) return <></>;

  return (
    <>
    <div>
    {shared.map(p => (
  <div key={p.id} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
    <div className="flex flex-row items-start gap-3">

      <img className="h-11 w-11 rounded-full" src={APIbaseURL + p.avatar} />

      <div>
        <div className="flex flex-row items-center gap-2">

          <p className="text-white font-semibold cursor-pointer hover:underline">
            {p.user}
          </p>


          <span className="text-neutral-500 text-sm">
            {formatDistanceToNow(new Date(p.created_at), { addSuffix: true, locale: es })}
          </span>

        </div>

          <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
            @{p.user}
          </span>

        <div className="text-white mt-1 text-start">
          {p.content}
        </div>
          
          { p.image ? <img src={`${ APIbaseURL + p.image}`} /> : '' }

        <div className="flex flex-row items-center mt-3 gap-10">

          <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
          <Link to={`/post/${p.id}`}>

                      <AiOutlineMessage size={20} />
                      </Link>

                      <p>
                        {p.parent.length}
                      </p>

          </div>

          <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-500">
            <Shared p={p} user={userId}/>
            <p>
              {p.shareds_count}
            </p>
          </div>

          <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
            <Like p={p} user={userId} />
            <p>
              {p.likes_count}
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>

    ))}
    </div>
    </>
  )
}


export default MyShared
