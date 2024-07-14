import { addComment } from "../api/blog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Loader from "./Loader"
import { useFormik } from "formik";
import toast from "react-hot-toast"

/**
 * Componente AddComment.
 * 
 * Un componente de React para agregar comentarios a una publicación. Incluye un formulario con un campo de entrada
 * para escribir comentarios y un botón de envío. Utiliza Formik para el manejo del formulario y Toast para mensajes de error.
 * 
 * @component
 * @param {Object} props - Las propiedades pasadas al componente.
 * @param {Object} props.post - El objeto de la publicación a la que se está agregando el comentario.
 * 
 * @returns {JSX.Element} El componente AddComment con un formulario de entrada de comentarios.
 */
const AddComment = ({ post }) => {

  // Utiliza QueryClient de React Query para gestionar consultas.
  const queryClient = useQueryClient()
  // Obtiene el avatar del usuario desde localStorage.
  const avatar = localStorage.getItem('avatar')

   // Utiliza useMutation de React Query para manejar la mutación de addComment.
  const addCommmentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries('Comentaste! 🥳')
    },
    onError: (error) => {
      toast.error('Algo ha ido mal!')
    }
  })

  // Función para inicializar los valores del formulario.
  const iniV = () => ({
    body: ''
  })

  // Utiliza Formik para el manejo del formulario.
  const formik = useFormik({

    initialValues: iniV(),

    onSubmit: (values, { resetForm }) => {
      // Verifica si el cuerpo del comentario está vacío y muestra un mensaje de error si lo está.
      if(values.body == '')  toast.error('Escribe algo .. ')
      else {
        // Llama a la mutación addComment con los valores del comentario y el ID de la publicación.
        addCommmentMutation.mutate({ ...values, id: post.id })
        resetForm()
      }
    }
  })

  // Muestra un componente Loader si la mutación addCommment está en proceso.
  if (addCommmentMutation.isLoading) return <Loader />

  // Renderiza el formulario de comentarios.
  return (
    <div
      className="
      border-b-[1px] 
      border-neutral-800 
      p-5 
      ">

      <form onSubmit={formik.handleSubmit} >
        <div className='flex gap-3 w-full border-b-[1px] 
          border-neutral-800 p-3'>

          <img src={`http://127.0.0.1:8000${avatar}`} className='h-14 w-14 rounded-full ' />

          <input 
            type="text" name="body" onChange={formik.handleChange} value={formik.values.body} 
            className='bg-transparent grow outline-none ' placeholder="Dile algo ..." />


        </div>

        <div className="flex justify-end mt-4">

          <button type='submit' className="bg-sky-400 hover:bg-sky-500 p-2 px-5 rounded-full text-white font-bold">
            Comentar
          </button>

        </div>
      </form>

    </div>

  )
  // return(<>sd</>)

}

export default AddComment
