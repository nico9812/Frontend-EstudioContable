import { File } from "lucide-react";

const ProgramasRecientes = ({ programas }) => {
  return (
    <div className="grid xl:grid-cols-3 grid-cols-2  gap-2 w-full">
      {programas !== undefined && programas.length > 0 ? (
        programas.map(programa => (
          <div
            key={programa.id}
            className="flex items-center font-medium text-sm"
          >
            <div className="flex flex-row items-center justify-center gap-2">
              <File className="h-4 w-4" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{programa.nombre}</span>
                <small>
                  <strong>Usuario:</strong> {programa.propietario_nombre}{' '}
                </small>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-3 text-center font-sm">No hay programas cargados.</div>
      )}
    </div>
  );
};
export default ProgramasRecientes;
