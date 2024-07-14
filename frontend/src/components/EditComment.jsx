import { editComment } from "../api/blog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { Formik, Field, Form } from 'formik'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";


/**
 * EditComment Component
 *
 * Este componente proporciona una interfaz para editar comentarios. Utiliza
 * Formik para gestionar el estado del formulario y React Query para realizar
 * la mutación de edición del comentario.
 *
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.c - El comentario que se va a editar.
 * @param {Function} props.close - Función para cerrar la interfaz de edición.
 * @return {JSX.Element} El elemento JSX que representa el componente.
 */
const EditComment = ({ c, close }) => {

  const queryClient = useQueryClient()

  const editCommentMutation = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      queryClient.invalidateQueries("comments")
      toast.success("Comentario actualizado")
      close()
    },
    onError: (error) => {
      toast.error('Algo ha ido mal!')
      close()
    }
  })

  return (

    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 w-[500px] h-[200px] rounded-md">
      <button onClick={close}>
          <AiOutlineCloseCircle className="text-white text-1xl absolute top-3 right-3 cursor-pointer" />
        </button>

        <p className="text-xl text-white text-center my-8 ">Edita tu comentario 
        <BsFillPencilFill className="inline -mt-4 ml-3"/>
        </p>

        <Formik
          initialValues={{
            body: c.body,
          }}
          onSubmit={(values) => {
            if(values.body == '')  toast.error('El comentario no puede estar vacío..')
            else editCommentMutation.mutate({ id: c.id, body: values.body, post: c.post})}}
        >
          <Form>
            <Field name='body' id='body' className="w-64 bg-gray-700 text-white rounded-full p-2 pl-4 ml-7" />
            <button type='submit'className="bg-sky-500 mr-7 text-white font-semibold rounded-full px-10 py-2 mt-3 ml-3 hover:bg-sky-600 transition">
              Actualizalo
            </button>
          </Form>
        </Formik>
      </div>
    </div>

  )

}

export default EditComment
