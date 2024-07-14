/**
 * Componente Loader.
 * 
 * Un componente de React que muestra un indicador de carga mientras se espera que se complete una operación asíncrona.
 * 
 * @component
 * @returns {JSX.Element} El componente Loader con un indicador de carga animado.
 */
const Loader = () => (
    <div className="flex min-h-full items-center justify-center py-14  ">
      <div className='m-5 p-10'>
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center items-center py-3">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-sky-500" />
          </div>
        </div>
      </div>
    </div>
  );
export default Loader;
