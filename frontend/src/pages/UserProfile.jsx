import { useParams, Link} from "react-router-dom"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getUserData } from "../api/users"
import Loader from "../components/Loader"
import { AiOutlineArrowLeft,} from "react-icons/ai";
import { IoMdCalendar } from "react-icons/io";
import { 
  BsBagHeartFill ,
  BsFillGrid1X2Fill,
  BsFillFolderSymlinkFill,
  BsCollectionFill,

} from "react-icons/bs";
import EditProfile from "../components/EditProfile";
import MyPosts from "../components/MyPosts"
import MyLikes from "../components/MyLikes"
import MyShared from "../components/MyShared"
import MyMedia from "../components/MyMedia"
import FollowBtn from "../components/FollowBtn"
import toast from "react-hot-toast"
import { getUserPosts } from "../api/blog"
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';


/**
 * Página de perfil de usuario que muestra la información del usuario, sus publicaciones,
 * compartidos, álbum y me gusta (o le gusta) según la pestaña seleccionada.
 *
 * @returns {JSX.Element} Elemento JSX que representa la página de perfil de usuario.
 */
const UserProfile = () => {
  // Obtiene el nombre de usuario de los parámetros de la URL.
  const { username } = useParams()
  
  // Obtiene el nombre de usuario del usuario autenticado.
  const myUser = localStorage.getItem('username')
  
  // Estado para controlar la edición del perfil.
  const [isEditing, setIsEditing] = useState(false)
  
  // Estado para controlar la pestaña actual (publicaciones, compartidos, álbum, me gusta).
  const [show, setShow] = useState(0)


  // Obtiene la información del usuario mediante una consulta.
  const { data: user, isLoading: loadingUser , isError: isErrorUser, error : errorUser } = useQuery({
    queryKey: ['user', username],
    queryFn: () => getUserData(username),
  })

  // Obtiene las publicaciones del usuario mediante una consulta.
  const { data: posts, isLoading: loadingPosts, isError: isErrorPosts, error: errorPosts } = useQuery({
    queryFn: () => getUserPosts(username),
    queryKey: ['user_posts']
  })

  if(loadingPosts) return <Loader />
  if(isErrorPosts) return <div>Error: {errorPosts.message}</div>
  
  // Renderiza el componente de carga mientras se obtiene la información del usuario.
  if (loadingUser ) return <Loader/>
  // Renderiza un mensaje de error si ocurre un problema al obtener la información del usuario.
  if (isErrorUser ) return toast.error('Error')

  // Renderiza la página de perfil de usuario.
  return (
    <>
      {isEditing && ( <EditProfile user={user} close={() => setIsEditing(false)} /> )}

      <div className="border-b-[1px] border-neutral-800 p-5">
        <div className="flex flex-row items-start gap-3">
          <div>

            <div className="flex flex-row items-center gap-2">
              <Link to={'/'}>
                <AiOutlineArrowLeft
                  size={20}
                  className="mr-4 hover:text-slate-200 text-slate-500 cursor-pointer"
                />
              </Link>
              <p className="text-white font-semibold text-xl">
                {user.username}
              </p>
            </div>
          </div>
        </div>
      </div>


      <img className="bg-black h-[180px] w-full" src={user.cover_image} />

      <div className="flex justify-between">

        <img
          src={user.avatar}
          className="w-40 h-40 ml-3 object-cover border-8 border-black -mt-20 shadow-2xl rounded-full" />

        <div>

          {myUser === username ? (

            <button 
              onClick={() => setIsEditing(true)}
              className="bg-slate-200 mr-7 text-black font-semibold rounded-full px-8 py-3 mt-5 ml-3 hover:bg-slate-400 transition">
              Editar 
            </button>
          ) : (
              <>
                <FollowBtn user={user} page={true}/>
              </>
            )}
        </div>

      </div>
      <p className="text-start ml-4 mt-4 text-xl font-bold ">
        { user.name != '' ? user.name : user.username}
      </p>

      <div className="text-white text-start ml-4">

        <span className="text-neutral-500 hidden md:block">
          @{user.username}
        </span>

        <div className="flex gap-3 w-full p-2 text-neutral-500 ">
          <IoMdCalendar className="mt-1 mb-3" size={20} />
          Unido {' '}  {formatDistanceToNow(new Date(user.date_joined), { addSuffix: true, locale: es })}
        </div>

        <div className="p-0 text-neutral-500 ">
          {user.bio}
        </div>

        <div className="flex gap-3 w-full p-2 text-neutral-500 ">
          <span className="text-white">{user.followers}</span> Seguidores {' '} <span className="text-white">{user.following}</span> Seguidos
        </div>

      </div>
      <div className="border-b-[1px] border-neutral-800 grid grid-cols-4 gap-4">

        <button 
          onClick={() => setShow(0)}
          className="p-5 cursor-pointer hover:bg-neutral-900 transition">
          <BsFillGrid1X2Fill className="inline mr-2 mb-1"/>
          Publicaiones
        </button>

        <button  
          onClick={() => setShow(1)}
          className="p-5 cursor-pointer hover:bg-neutral-900 transition">
          <BsFillFolderSymlinkFill className="inline mr-2 mb-1"/>
          Compartidos
        </button>

        <button  
          onClick={() => setShow(2)}
          className="p-5 cursor-pointer hover:bg-neutral-900 transition">
          <BsCollectionFill className="inline mr-2 mb-1"/>
          Album
        </button>
      
        <button  
          onClick={() => setShow(3)}
          className="p-5 cursor-pointer hover:bg-neutral-900 transition">
          <BsBagHeartFill className="inline mr-2 mb-1"/>
          {myUser === username ? 'Me Gusta' : 'Le Gusta'}
        </button>
 
      </div>
        {show === 0 && <MyPosts user={user} posts={posts} myUser={myUser} />}
        {show === 1 && <MyShared user={user} />}
        {show === 2 && <MyMedia posts={posts} />}
        {show === 3 && <MyLikes user={user} />}

    </>
  )
}

export default UserProfile