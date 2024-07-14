import { Link } from "react-router-dom";
import { userProfile } from "../api/users";
import { useQuery } from "@tanstack/react-query";


/**
 * Página que muestra la lista de contactos del usuario.
 *
 * @returns {JSX.Element} Elemento JSX que representa la página de contactos.
 */
const Contacts = () => {
  const APIbaseURL = "http://127.0.0.1:8000"; // process.env.REACT_APP_API_BASE_URL;
  const username = localStorage.getItem("username");

  // Obtiene la información del perfil del usuario, incluyendo los contactos seguidos.
  const { data } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => userProfile(username),
  });


  return (
    <>
      {/* Cabecera de la página */}
      <div className="border-b-[1px] border-neutral-800 p-5">
        <div className="flex flex-row items-start gap-3">
          <div>
            <div className="flex flex-row items-center gap-2">
              <p className="text-white font-semibold text-xl">Mis Contactos</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lista de contactos */}
      {data?.followed_usernames?.map((contact) => (
        <Link key={contact.username} to={`/chat/${contact.username}`}>
          <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
            <div className="flex flex-row items-start gap-3">
              <img
                className="h-11 w-11 rounded-full"
                src={`${APIbaseURL + contact.avatar}`}
              />

              <div>
                <div className="flex flex-row items-center gap-2">
        
                <Link to={`/profile/${contact.username}`}>
                  <p className="text-white font-semibold cursor-pointer hover:underline">
                    {contact.username}
                  </p>
                </Link>

                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Contacts;
