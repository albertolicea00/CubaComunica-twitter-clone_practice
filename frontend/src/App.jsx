import { BrowserRouter, Routes, Route } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import AuthLayout from "./components/AuthLayout"
import { Toaster } from 'react-hot-toast';

import LoginPage from "./pages/LoginPage"
import Register from "./pages/Register"
import Blog from "./pages/Blog"
import UserProfile from "./pages/UserProfile"
import SoloPost from "./pages/SoloPost"
import Noti from "./pages/Noti"
import Chat from "./pages/Chat"
import Contacts from "./pages/Contacts"


/**
 * Componente principal de la aplicación.
 * @returns {JSX.Element} - Elemento JSX que representa la estructura de la aplicación.
 */
function App() {

  return (
    <BrowserRouter>
    <Toaster/>
      <Routes>
        <Route element={<PrivateRoute/>}>
            <Route path="/" element={<AuthLayout/>} >
                <Route path="/" element={<Blog/>} />
                <Route path="/blog" element={<Blog/>} />
                <Route path="/post/:id" element={<SoloPost/>} />
                <Route path="/blog/post/:id" element={<SoloPost/>} />
                <Route path="/profile/:username" element={<UserProfile/>} />
                <Route path="/noti" element={<Noti/>} />
                <Route path="/chat/:user" element={<Chat/>} />
                <Route path="/contacts" element={<Contacts/>} />
            </Route>
        </Route>

            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<Register/>} />

      </Routes>
    </BrowserRouter>
  )

}
export default App