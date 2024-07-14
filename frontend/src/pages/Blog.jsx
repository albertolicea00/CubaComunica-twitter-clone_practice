import { getPosts } from "../api/blog";
import { AiOutlineMessage } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import AddPost from "../components/AddPost";
import Like from "../components/Like";
import Shared from "../components/Shared";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";


/**
 * Componente funcional que representa la sección principal del blog.
 * Muestra una lista de publicaciones, permitiendo la carga infinita de nuevas publicaciones.
 *
 * @returns {JSX.Element} Elemento JSX que contiene la interfaz del blog.
 */
const Blog = () => {
  const APIbaseURL = "http://127.0.0.1:8000"; // process.env.REACT_APP_API_BASE_URL;

  const { ref, inView } = useInView();


  let queryResult = {};
  try {
    queryResult = useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: getPosts,
      getNextPageParam: (lastPage) => lastPage?.meta?.next || null,
    });
  } catch (error) {
    location.reload();
  }
  
  const { data, isLoading, isError, error, isFetchingNextPage, fetchNextPage, hasNextPage, } =  queryResult

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <Loader />;
  if (isError) return toast.error(error.message);


  return (
    <>
      <div className="border-b-[1px] border-neutral-800 p-5">
        <div className="flex flex-row items-centr gap-3">
          <div>
            <div className="flex flex-row items-center gap-2">
              <p className="text-white font-semibold text-xl">El Postureo</p>
            </div>
          </div>
        </div>
      </div>

      <AddPost />

      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.data.map((p) => (
            <>
              <div
                key={p.id}
                className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
              >
                <div className="flex flex-row items-start gap-3">
                  <img
                    className="h-11 w-11 rounded-full"
                    src={APIbaseURL + p.avatar}
                  />

                  <div>
                    <div className="flex flex-row items-center gap-2">
                      <p className="text-white font-semibold cursor-pointer hover:underline">
                        <Link to={`../profile/${p.user}`}>{p.user}</Link>
                      </p>

                      <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                        @{p.user}
                      </span>
                    </div>
                    <span className="text-neutral-500 text-sm">
                      {formatDistanceToNow(new Date(p.created_at), {
                        addSuffix: true,
                        locale: es,
                      })}
                    </span>

                    <Link to={`post/${p.id}`}>
                      <div className="text-white mt-1 text-start">
                        {p.content}
                      </div>
                    </Link>

                    {p.image ? <img src={`${p.image}`} /> : ""}

                    <div className="flex flex-row items-center mt-3 gap-10">
                      <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                        <Link to={`post/${p.id}`}>
                          <AiOutlineMessage size={20} />
                        </Link>

                        <p>{p.parent.length}</p>
                      </div>

                      <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-500">
                        <Shared p={p} />
                        <p>{p.shareds_count}</p>
                      </div>

                      <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                        <Like p={p} />

                        <p>{p.likes_count}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {!isLoading && data.pages.length === 0 && <p>Sin contenido por el momento</p>}
              {!isLoading && data.pages.length > 0 && hasNextPage && (
                <div ref={ref}>
                  {isLoading || isFetchingNextPage ? <Loader /> : null}
                </div>
              )}
            </>
          ))}
        </div>
      ))}
    </>
  );
};

export default Blog;
