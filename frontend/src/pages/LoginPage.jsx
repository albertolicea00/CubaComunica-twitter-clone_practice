import { useMutation, useQueryClient } from "@tanstack/react-query"
import { loginReq } from "../api/users"
import { Formik, Field, Form } from "formik"
import Loader from "../components/Loader";
import { Link, useNavigate, Navigate } from "react-router-dom"
import toast from "react-hot-toast"

/**
 * Página de inicio de sesión que permite a los usuarios autenticarse en la aplicación.
 * Si el usuario ya está autenticado, redirige automáticamente a la página principal.
 *
 * @returns {JSX.Element} Elemento JSX que contiene el formulario de inicio de sesión.
 */
const LoginPage = () => {
  // Comprueba si el usuario ya está autenticado y redirige a la página principal si es así.
  const user = localStorage.getItem("user_id");
  if (user) return <Navigate to="/" replace={true} />;
  

  // Variables y funciones necesarias para el manejo del formulario y las consultas.
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const loginMutation = useMutation({
    mutationFn: loginReq,
    onSuccess: () => {
      queryClient.invalidateQueries("posts")
      navigate("/blog")
    },
    onError: (error) => {
      console.error(error)
      toast.error('Algo ha ido mal!')
    }
  })
  
  // Renderiza el componente de carga mientras la autenticación está en progreso.
  if (loginMutation.isLoading) return <Loader />

  // Renderiza el formulario de inicio de sesión.
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className='m-5 p-10 bg-grey-3'>
        <div className="w-[300px]  max-w-md space-y-8 md:w-[400px] lg:w-[400px]">
          <div>
            <div className="mx-auto text-sky-500 h-12 w-164 -mt-24">
              <img src="public/full-logo.png" alt="logo" />
            </div>
            <h2 className="mt-32 text-center text-3xl text-grey">
              empieza a compartir
            </h2>
          </div>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(values) => {
              loginMutation.mutate(values)
            }}
          >
            <Form>
              <Field id='email' name='email' placeholder='Email'
                className="
                border-b-[1px] 
                border-neutral-800 
                w-full
                p-5 
                cursor-pointer 
                my-3
                bg-transparent outline-neutral-800 
                "
              />

              <Field type='password' id='password' name='password' placeholder='*******' 
                className="
                my-3
                border-b-[1px] 
                border-neutral-800 
                w-full
                p-5 
                cursor-pointer 
                bg-transparent outline-neutral-800 
                "
              />
              <button type='submit' className="bg-sky-400 my-2 w-full hover:bg-sky-500 p-2 px-5 rounded-full text-white font-bold">
                Logeate
              </button>

            </Form>
          </Formik>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to={'/register'}>
                ¿ No tienes una cuenta, que esperas ?
                <span className='hover:text-sky-500 ml-2 transition-colors'>
                  Regístrate aquí !
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage