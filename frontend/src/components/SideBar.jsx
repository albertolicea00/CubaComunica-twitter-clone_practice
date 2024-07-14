import { 
  BsFillPersonLinesFill ,
  BsChatHeartFill ,
  BsMailbox2Flag,
  BsUnlockFill ,
  BsFillPostcardHeartFill
 } from "react-icons/bs";
import SidebarLink from "./SidebarLink";
import { useQuery } from "@tanstack/react-query";
import { getNoLeidas } from "../api/noti";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/users";


/**
 * Componente SideBar.
 * 
 * Un componente de barra lateral que contiene enlaces a diferentes secciones, como Blog, Perfil, Chat, Notificaciones y Cerrar sesión.
 * 
 * @component
 * @returns {JSX.Element} El componente SideBar.
 */
const SideBar = () => {

  const username = localStorage.getItem('username')
  const nav = useNavigate()
  

  const { data } = useQuery({
    queryKey: ["notiNoLei"],
    queryFn: getNoLeidas,
  })

  return (

    <div className="sm:flex flex-col items-center xl:items-start xl:w-[188px] h-full fixed space-y-3">
      
      <div className="space-y-2.5  mt-3 mb-24 xl:ml-2 pb-2 pt-2 rounded-xl pb-20 xxl:bg-[#202327]">
        <span className="text-xxl flex text-slate-200 pr-7 pl-8 pt-4 pb-4">
          <img src="/public/icon-logo.png" alt="logo" width="80" />
        </span>
        <SidebarLink link='/blog' text="&nbsp;Blog" Icon={<BsFillPostcardHeartFill  size={26}/>} />
        <SidebarLink link={`/profile/${username}`} text="&nbsp;Mi Perfil" Icon={<BsFillPersonLinesFill  size={26}/>} />
        <SidebarLink link='/contacts' text="&nbsp;Chat" Icon={<BsChatHeartFill  size={26}/>} />
        <SidebarLink link='/noti'text="&nbsp;QPaso" num={data?.length} Icon={<BsMailbox2Flag   size={26}/>} />  
        <span onClick={ 
          () => { 
            logout(); 
            nav('/login');
          }}> <SidebarLink text="&nbsp;Pirate" Icon={<BsUnlockFill  size={26}/> }/> </span>        
      </div>
    </div>
  )
}

export default SideBar
