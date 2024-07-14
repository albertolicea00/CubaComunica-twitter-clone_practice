/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import { q, reco } from "../api/users";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import FollowBtn from "./FollowBtn";

const APIbaseURL = "http://127.0.0.1:8000"; // process.env.REACT_APP_API_BASE_URL;


/**
 * Componente Result.
 * 
 * Un componente de React que muestra los resultados de búsqueda de usuarios.
 * Si está cargando, muestra un componente Loader.
 * Si hay un error, muestra un mensaje de error utilizando la librería toast.
 * Muestra la información de los usuarios encontrados, incluyendo avatar, nombre de usuario y botón de seguir.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.data - Datos de los usuarios encontrados.
 * @param {boolean} props.isLoading - Indica si la búsqueda está en proceso.
 * @param {boolean} props.isError - Indica si hubo un error durante la búsqueda.
 * @param {Object} props.error - Objeto de error, en caso de haber ocurrido.
 * @returns {JSX.Element} El componente Result con la información de los usuarios encontrados.
 */
function Result({ data, isLoading, isError, error }) {

  if(isLoading) return <Loader/>
  if (isError) return toast.error(error.message)

  console.log(data)

  return (
      <div className="text-[#d9d9d9] space-y-3 bg-[#202327]  rounded-xl w-11/12 xl:w-9/12">
          {data && data.map((user) => (
          <div
            key={user.username}
            className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
          >
            <img
              src={user.avatar}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="ml-4 leading-5 group">
              <h4 className="font-bold group-hover:underline">
                <Link to={`/profile/${user.username}`}>
                {user.name ? user.name : user.username}
                </Link>
              </h4>
              <h5 className="text-gray-500 text-[15px]">
              @{user.username}
            </h5>
            </div>
            <FollowBtn user={user} page={false}/>
          </div>

          ))}
          </div>

  )
}


/**
 * Componente Search.
 * 
 * Un componente de React que proporciona funcionalidad de búsqueda de usuarios.
 * Utiliza React Query para manejar las consultas de búsqueda y recomendaciones de usuarios.
 * Muestra una barra de búsqueda, resultados de búsqueda y recomendaciones de usuarios.
 * 
 * @component
 * @returns {JSX.Element} El componente Search con la barra de búsqueda, resultados y recomendaciones.
 */
const Search = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["search", search],
    queryFn: () => {
      if(search) {
        return q(search)
      }
      return {users: []}
    }
  })

  const { data : user } = useQuery({
    queryKey: ["user"],
    queryFn: reco
  })

  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
      <div className="sticky top-0 py-1.5 bg-black z-50 w-11/12 xl:w-9/12">
        <div className="flex items-center bg-[#202327] p-3 rounded-full relative">
          <BsSearch className="text-gray-500 h-5 z-50" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="bg-transparent placeholder-gray-500 outline-none mt-0 text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full focus:outline-none rounded-full focus:shadow-lg"
            placeholder="Encuentra amigos"
          />
        </div>
      </div>

      {data?.users.length > 0 && <Result data={data.users} isLoading={isLoading} isError={isError} error={error}/>}

      <div className="text-[#d9d9d9] space-y-3 bg-[#202327] pt-2 rounded-xl w-11/12 xl:w-9/12">
        <h4 className="font-bold text-xl px-4">Quien por ahi ? 👀</h4>
          {/* Aqui comienza el map */}
          {user && user.map((user) => (

            <div key={user.username} className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center">
              <img src={user.avatar}
                width={40}
                height={40}
                // objectFit="cover"
                className="rounded-full"
              />
              <div className="ml-4 leading-5 group">
                <h4 className="font-bold group-hover:underline">
                  <Link to={`/profile/${user.username}`}>
                  {user.name ? user.name : user.username}
                  </Link>
                </h4>
                <h5 className="text-gray-500 text-[15px]">
                @{user.username}
                </h5>
              </div>
              

              <FollowBtn user={user} page={false}/>

            </div>

          ))}

        <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
          {/* Mostrar más */} 
        </button>
      </div>
    </div>

  )
}

export default Search
