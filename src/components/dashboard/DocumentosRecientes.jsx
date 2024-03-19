import { BsFilePdf } from 'react-icons/bs';

const DocumentosRecientes = ({ documentos }) => {
  return (
    <div className="grid xl:grid-cols-3 grid-cols-2  gap-2 w-full">
      {documentos !== undefined && documentos.length > 0 ? (
        documentos.map(documento => (
          <div
            key={documento.id}
            className="flex items-center font-medium text-sm"
          >
            <div className="flex flex-row items-center justify-center gap-2">
              <BsFilePdf className="h-4 w-4" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{documento.nombre}</span>
                <small>
                  <strong>Usuario:</strong> {documento.propietario_nombre}{' '}
                </small>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-3 text-center font-sm">No hay documentos cargados.</div>
      )}
    </div>
  );
};
export default DocumentosRecientes;
