import { AiOutlineMessage } from "react-icons/ai";
import { getSoloPost } from "../api/blog";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import Shared from "../components/Shared";
import Like from "../components/Like";
import Comments from "../components/Comments";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";


/**
 * Página que muestra un post específico junto con sus detalles, como comentarios,
 * compartidos y me gusta.
 *
 * @returns {JSX.Element} Elemento JSX que representa la página de un solo post.
 */
const SoloPost = () => {
  const APIbaseURL = "http://127.0.0.1:8000"; // process.env.REACT_APP_API_BASE_URL;

  // Obtiene el ID del post de los parámetros de la URL.
  const { id } = useParams();
  // Obtiene la información del post mediante una consulta.
  const { data: post, isLoading, isError, error, } = useQuery({
    queryKey: ["soloPost", id],
    queryFn: () => getSoloPost(id),
  });

  // Renderiza el componente de carga mientras se obtiene la información del post.
  if (isLoading) return <Loader />;
  // Renderiza un mensaje de error si ocurre un problema al obtener la información del post.
  if (isError) return toast.error(error.message);

  return (
    <>
      <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
        <div className="flex flex-row items-start gap-3">
          <img
            className="h-11 w-11 rounded-full"
            src={`${APIbaseURL + post.avatar}`}
          />
          <div>
            <div className="flex flex-row items-center gap-2">
              <p className="text-white font-semibold cursor-pointer hover:underline">
                <Link to={`../../profile/${post.user}`}>{post.user}</Link>
              </p>

              <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                @{post.user}
              </span>
            </div>
            <span className="text-neutral-500 text-sm inline">
              {formatDistanceToNow(new Date(post.created_at), {
                addSuffix: true,
                locale: es,
              })}
            </span>

            <div className="text-white mt-1 text-start">{post.content}</div>

            <img src={post.image} />

            <div className="flex flex-row items-center mt-3 gap-10">
              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                <AiOutlineMessage size={20} />

                <p>0</p>
              </div>

              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-500">
                <Shared p={post} />
                <p>{post.shareds_count}</p>
              </div>

              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                <Like p={post} />
                <p>{post.likes_count}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Comments post={post} />
    </>
  );
};

export default SoloPost;
