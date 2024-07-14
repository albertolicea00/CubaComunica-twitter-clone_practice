import { Link } from "react-router-dom"



/**
 * Componente SidebarLink.
 * 
 * Un enlace de la barra lateral que contiene un icono, texto y, opcionalmente, un número para indicar alguna notificación.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {JSX.Element} props.Icon - Elemento JSX del icono.
 * @param {string} props.text - Texto del enlace.
 * @param {string} props.link - URL a la que apunta el enlace.
 * @param {number} [props.num] - Número opcional para indicar notificaciones.
 * @returns {JSX.Element} El componente SidebarLink.
 */
const SidebarLink = ({ Icon, text, link, num }) => {

  return (
    <Link to={link}>
      <div className="text-xxl flex text-slate-200 cursor-pointer pr-2 pl-4 pt-4 pb-4">
        {Icon}
        <span className="hidden md:inline lg:inline xl:inline ml-2">{text}</span>

        {num > 0 && 
          <button 
            className="hidden md:inline lg:inline xl:inline ml-2i bg-sky-400 ml-1 -mt-2 rounded-full text-black w-7 h-6 text-sm">
            {num < 99 ? num : '+99'}
          </button>
        }

      </div>
    </Link>
  )
}

export default SidebarLink
