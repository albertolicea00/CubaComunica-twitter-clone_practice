import { useMutation } from "@tanstack/react-query";
import { registerReq } from "../api/users";
import { Formik, Field, Form } from "formik";
import Loader from "../components/Loader";
import { Link, useNavigate, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

/**
 * Página de registro que permite a los usuarios crear nuevas cuentas.
 * Si el usuario ya está autenticado, redirige automáticamente a la página principal.
 *
 * @returns {JSX.Element} Elemento JSX que contiene el formulario de registro.
 */
const Register = () => {
  // Comprueba si el usuario ya está autenticado y redirige a la página principal si es así.
  const user = localStorage.getItem("user_id");
  if (user) return <Navigate to="/" replace={true} />;

  // Variables y funciones necesarias para el manejo del formulario y las consultas.
  const navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: registerReq,
    onSuccess: () => {
      navigate("/register");
    },
    onError: (error) => {
      toast.error("Algo ha ido mal!");
      console.error(error);
    },
  });

  // Renderiza el componente de carga mientras la autenticación está en progreso.
  if (registerMutation.isLoading) return <Loader />;

  // Renderiza el formulario de registrarse.
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className=" m-5 p-10 bg-grey-3">
        <div className="w-[300px]  max-w-md space-y-8 md:w-[400px] lg:w-[400px]">
          <div>
            <div className="mx-auto text-sky-500 h-12 w-164 -mt-24">
              <img src="public/full-logo.png" alt="logo" />
            </div>
            <h2 className="mt-32 text-center text-3xl text-grey">
              convierte en miembro
            </h2>
          </div>
          <Formik
            initialValues={{
              email: "",
              username: "",
              password: "",
            }}
            onSubmit={(values) => {
              registerMutation.mutate(values);
            }}
          >
            <Form>
              <Field
                id="username"
                name="username"
                placeholder="Username"
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
              <Field
                id="email"
                name="email"
                placeholder="Email"
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

              <Field
                type="password"
                id="password"
                name="password"
                placeholder="*******"
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
              <button
                type="submit"
                className="bg-sky-400 my-2 w-full hover:bg-sky-500 p-2 px-5 rounded-full text-white font-bold"
              >
                Regístrate
              </button>
            </Form>
          </Formik>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to={"/login"}>
                ¿ Ya tienes una cuenta, mi loco ?
                <span className="hover:text-sky-500 ml-2 transition-colors">
                  Logeate aquí !
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
