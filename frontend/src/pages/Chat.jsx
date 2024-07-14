import  useWebSocket  from "react-use-websocket";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { getChat } from "../api/chat";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineArrowLeft,} from "react-icons/ai";
import toast from "react-hot-toast";
import Loader from "../components/Loader";



/**
 * Página que muestra la interfaz de chat entre el usuario y otro usuario específico.
 *
 * @returns {JSX.Element} Elemento JSX que representa la página de chat.
 */
const Chat = () => {

  const { user } = useParams()

  const { username: me } = jwtDecode(localStorage.getItem("access"));

  const [messageHistory, setMessageHistory] = useState([])
  const [message, setMessage] = useState('')
  
  // Obtiene la información del chat entre el usuario actual y el usuario especificado.
  const { data: canal, isLoading, isError, error } = useQuery({
    queryKey: ['chat', user],
    queryFn: () => getChat(user),
  })

    const baseURL = import.meta.env.VITE_BACKEND_WS

  const { sendJsonMessage } = useWebSocket(`${baseURL}/${user}/${me}/`, {
    onOpen: () => {
      console.log('Connected!')
    },
    onClose: (e) => {
      console.log(e)
      console.log('Disconnected!')
    },
    onMessage: (e) => {
      try {
        const data = JSON.parse(e.data)
        switch (data.type) {
          case 'chat_message_echo':
            setMessageHistory((prev) => prev.concat(data))
            break
          default:
            console.error('Received unknown message type: ', data.type)
            break
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    }
  })

  function sendMsj () {
    sendJsonMessage({
      type: 'chat_message',
      message: message,
      username: me,
    })
    setMessage('')
  }

  // Combina el historial de mensajes del chat y el historial local de mensajes.
  if(canal) {
    const sortedChat = [...canal, ...messageHistory].sort((a, b) => a.timestamp - b.timestamp);
    var chat = ([...canal, ...messageHistory])
  }

  if(isLoading) return <Loader/>
  if(isError) return toast.error(error.message)

  return (
    <>
      {/* Cabecera de la página */}
      <div className="border-b-[1px] border-neutral-800 p-5">
        <div className="flex flex-row items-start gap-3">

          <div>
            <div className="flex flex-row items-center gap-2">
            <Link to={'/contacts'}>
                <AiOutlineArrowLeft
                  size={20}
                  className="mr-4 hover:text-slate-200 text-slate-500 cursor-pointer"
                />
              </Link>
              <p className="text-white font-semibold text-xl">
                {user}
              </p>
            </div>
          </div>

        </div>
      </div>
      
      {/* Historial de mensajes */}
      <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer ">
        <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
          <ul className="space-y-2">
            {chat.map((message) => (
              <>
              {message.username === me ? (
                <li className="flex justify-end">
                  <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                    <span className="block">{message.message}</span>
                  </div>
                </li>

              ) : (

                  <li className="flex justify-start">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span className="block text-indigo-600 xl:inline">{message.username}</span>
                      <span className="block">{message.message}</span>
                    </div>
                  </li>

                )}

                </>

            ))}
          </ul>

        </div>
      </div>

      {/* Área de entrada de mensajes */}
      <div className="flex items-center justify-between w-full p-3 ">
        <input type="text" placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="block w-full py-2 pl-4 mx-3 bg-slate-200 rounded-full outline-none focus:text-gray-900"
          required />

    {/* Botón para enviar mensajes */}
        <button 
          onClick={sendMsj}
          type='submit'>
          <svg className="w-5 h-5 text-slate-500 hover:text-slate-200 transition origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>

      </div>
    </>

  )
}

export default Chat
