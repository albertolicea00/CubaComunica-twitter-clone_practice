import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { getComments, deleteComment } from "../api/blog"
import Loader from "./Loader"
import toast from "react-hot-toast"
import AddComment from "./AddComment"
import { Link } from "react-router-dom"
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import EditComment from "./EditComment"
import { useState } from "react"
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';



/**
 * Componente para mostrar y gestionar los comentarios de una publicación.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.post - Información de la publicación.
 * @returns {JSX.Element} El componente Comments.
 */
const Comments = ({ post }) => {

  const queryClient = useQueryClient()
  // Estado para rastrear el comentario que se está editando
  const [show, setShow] = useState(false)
  const [editingCommentId, setEditingCommentId] = useState(null); 
  const user = localStorage.getItem("username");

  // Consulta los comentarios de la publicación.
  const { data: comments, isLoading, isError, error } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => getComments(post.id)
  })

  // Mutación para eliminar un comentario.
  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries("comments")
      toast.success("Eliminaste el comentario")
    },
    onError: (error) => {
      toast.error('Algo ha ido mal!')
    }
  })

  if (isLoading) return <Loader />
  if (isError) return toast.error(error.message)

  return (

    <>
      <AddComment post={post}/>
      {comments.map(c => (
        <div key={c.id} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
          <div className="flex flex-row items-start gap-3">

            <img className="h-11 w-11 rounded-full" src={`http://127.0.0.1:8000${c.avatar}`} />
            <div>
              <div className="flex flex-row items-center gap-2">

                <p className="text-white font-semibold cursor-pointer hover:underline">
                  <Link to={`../../../profile/${c.user}`}>
                    {c.user}
                  </Link>
                </p>

                <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                  @{c.user}
                </span>

                <span className="text-neutral-500 text-sm">
                  {formatDistanceToNow(new Date(c.created_at), { addSuffix: true, locale: es })}
                </span>

              </div>

              <div className="text-white mt-1 text-start">
                {c.body}
              </div>

              {user === c.user && (
                <div className='flex justify-start gap-3 mt-4'>
                  <div 
                    className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                    <BsFillTrashFill  
                      onClick={() => deleteCommentMutation.mutate(c.id)}
                      size={20} />
                  </div>

                  <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-yellow-300">
                    <AiFillEdit onClick={() => setEditingCommentId(c.id)} size={25} />
                    {editingCommentId === c.id && <EditComment c={c} close={() => setEditingCommentId(null)} />}
                  </div>
                </div> 
                )}

            </div>
          </div>
        </div>
      ))}
    </>

  )
}

export default Comments
