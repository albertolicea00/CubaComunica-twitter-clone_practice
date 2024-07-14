import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useFormik } from "formik";
import { updateUserData } from "../api/users";
import toast from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";


/**
 * Componente para la edición del perfil de usuario.
 * 
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.user - Información del usuario.
 * @param {function} props.close - Función para cerrar el componente.
 * @returns {JSX.Element} El componente EditProfile.
 */
const EditProfile = ({ user, close }) => {

  const queryClient = useQueryClient()
  console.log(user)
  const updateProfileMutation = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', user.username]})
      toast.success('Perfil actualizado')
      close()
    }, 
    onError: (error) => {
      toast.error(error.message)
      toast.error('Algo ha ido mal!')
      close()
    }
  })

  // Manejador del envío del formulario.
  const formik = useFormik({
    initialValues: {
      name: user.name,
      bio: user.bio,
      avatar: '',
      cover_image: '',
    },
    onSubmit: (values) => {
      const { name, bio, avatar, cover_image } = values
      const formData = new FormData()

      name ? formData.append('name', name) : formData.append('name', '')
      bio ? formData.append('bio', bio) : formData.append('bio', '')
      if(avatar) formData.append('avatar', avatar)
      if(cover_image) formData.append('cover_image', cover_image)

      updateProfileMutation.mutate(formData)
    },
  })

  return (

    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#202327] h-[600px] w-[600px] rounded-md">
        <button onClick={close}>
          <AiOutlineCloseCircle className="text-white text-1xl absolute top-3 right-3 cursor-pointer" />
        </button>

        <div className="flex min-h-full items-center justify-center sm:px-6 lg:px-8">
          <div className='m-1 p-1 '>
            <div className="w-[300px]  max-w-md space-y-8 md:w-[500px] lg:w-[500px]">
              <div>
                <h2 className="mt-2 text-center text-3xl text-grey">
                    Actualiza tu Perfil 
                    <BsFillPencilFill className="inline -mt-4 ml-3"/>
                </h2>
              </div>
              {/* <sub className="my-2"> <strong>NOTA: </strong>es necesario que actualice todos los campos para guardar cambios</sub> */}

              <form onSubmit={formik.handleSubmit}>
              
                {formik.values.name ? <label className="text-sm text-gray-500 block ">nombre:</label> : '' }
                <input placeholder='¿ Como te llaman ?'
                  id='name' name='name'
                  onChange={formik.handleChange} value={formik.values.name}
                  className="
                  border-b-[1px] 
                  border-neutral-800 
                  w-full
                  p-3 
                  cursor-pointer 
                  mb-6
                  bg-transparent outline-neutral-800 
                  "
                />
                
                
                {formik.values.bio ? <label className="text-sm text-gray-500 block">bio:</label> : ''}
                <textarea
                onChange={formik.handleChange} value={formik.values.bio}
                id='bio' name='bio'
                placeholder='¿ Que hay sobre ti ?'
                className="
                    border-b-[1px] 
                    border-neutral-800 
                    w-full
                    p-3 
                    cursor-pointer 
                    bg-transparent outline-neutral-800 
                    ">

                </textarea>


                <span className="my-1">
                  <label className="text-sm text-gray-200 block my-2">Imagen de perfil:</label>
                  <input 
                    className="mb-4 text-sm text-gray-500 cursor-pointer" 
                    type="file" name="avatar" onChange={(event) => formik.setFieldValue("avatar", event.currentTarget.files[0])} 
                    />
                
                  <label className="text-sm text-gray-200 block my-2">Imagen de fondo:</label>
                  <input 
                    className=" text-sm text-gray-500 cursor-pointer" 
                    type="file" name="cover_image" onChange={(event) => formik.setFieldValue("cover_image", event.currentTarget.files[0])} 
                    />
                </span>
                
                <button type='submit' className="bg-sky-700 mt-11  my-2 w-full hover:bg-sky-500 p-2 px-5 rounded-full text-white font-bold">
                  Guardar Cambios
                </button>

              </form>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EditProfile
