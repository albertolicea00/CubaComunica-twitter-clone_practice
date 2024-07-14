/**
 * Componente MyMedia.
 * 
 * Un componente de React que muestra las imágenes de las publicaciones proporcionadas.
 * 
 * @component
 * @param {Object} props - Las propiedades pasadas al componente.
 * @param {Array} props.posts - La lista de publicaciones con imágenes a mostrar.
 * 
 * @returns {JSX.Element} El componente MyMedia con las imágenes de las publicaciones.
 */
const MyMedia = ({ posts }) => {
  const APIbaseURL = "http://127.0.0.1:8000"; // process.env.REACT_APP_API_BASE_URL;

  return (

    <>
      {posts.map && posts.map(p => (
          p.image ? 
            <div className="flex flex-row items-start gap-3"
              style={{
                maxWidth : '50%',
                float: 'left'
              }}
              >
              <img 
                src={APIbaseURL + p.image} />
            </div>
          : '' 
        ))}
    </>

  )
}

export default MyMedia
