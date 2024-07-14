import { Outlet } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import SideBar from "./SideBar";
import Search from "./Search";



/**
 * Layout para páginas autenticadas.
 * Este layout incluye la barra lateral, la sección principal y la barra de búsqueda.
 * 
 * @component
 * @returns {JSX.Element} El componente AuthLayout.
 */
const AuthLayout = () => {
  return (
    <>
    <Toaster/>

    <div className="flex justify-center">
      <div className="shrink w-9 sm:w-60 md:w-40">
        <SideBar/>
      </div>

      <div className="shrink w-[1200px] pr-6 pl-11 pt-1">
        <Outlet/>
      </div>

      <div className="shrink w-0 sm:w-14 md:w-64 lg:2-[450px] xl:w-[450px]">
        <Search/>
      </div>
    </div>
  </>
  )
}

export default AuthLayout