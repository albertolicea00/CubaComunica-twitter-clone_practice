import {
  AiOutlineMessage,
  AiFillEdit
} from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { getUserPosts, deletePost } from "../api/blog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "./Loader";
import EditPost from "./EditPost";
import { Link } from "react-router-dom";
import { useState } from "react";
import Like from "./Like";
import Shared from "./Shared";
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';


/**
 * Componente MyPosts.
 * 
 * Un componente de React que muestra las publicaciones de un usuario, 
 * permitiendo eliminar y editar sus propias publicaciones.
 * Utiliza React Query para obtener las publicaciones del servidor y manejar las mutaciones.
 * 
 * @component
 * @param {Object} props - Las propiedades pasadas al componente.
 * @param {Object} props.user - El objeto de usuario para el cual se están mostrando las publicaciones.
 * @param {string} props.myUser - El nombre de usuario del usuario actual.
 * @param {Array} props.posts - La lista de publicaciones del usuario.
 * 
 * @returns {JSX.Element} El componente MyPosts con las publicaciones del usuario y opciones de edición y eliminación.
 */
const MyPosts = ({ user, myUser, posts }) => {
  const APIbaseURL = "http://127.0.0.1:8000"; // process.env.REACT_APP_API_BASE_URL;
  const queryClient = useQueryClient()
  const [editingPostId, setEditingPostId] = useState(null);
  const userId = localStorage.getItem('user_id')

  const deletePostsMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", user.username])
      toast.success("Eliminaste la publicación! 🥺")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { data, isLoading, isError, error } = useQuery({
  queryKey: ["posts", user.username],
  queryFn: () => getUserPosts(user.username),
  })


  if(deletePostsMutation.isLoading) return <Loader/>
  if (isLoading) return <Loader/>
  if (isError) return toast.error(error.message)

  return (
    <>
    {data.map && data.map(p => (
  <div key={p.id} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
    <div className="flex flex-row items-start gap-3">

      <img className="h-11 w-11 rounded-full" src={user.avatar} />


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
            <Link to={`../post/${p.id}`}>
              <AiOutlineMessage size={20} />
            </Link>
              <p>{p.parent.length}</p>
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

          {myUser === user.username && (
            <>
              <div 
                className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                <BsFillTrashFill  
                        onClick={() => deletePostsMutation.mutate(p.id)}
                        size={20} />
              </div>

              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-yellow-300">
                    <AiFillEdit
                  onClick={() => setEditingPostId(p.id)}
                  size={25} />
              </div>
                {editingPostId === p.id && <EditPost post={p} close={() => setEditingPostId(null)} />}
            </> 
          )}
        </div>
      </div>
    </div>
  </div>

    ))}
    </>
  )
}

export default MyPosts
