import { CalendarIcon } from 'lucide-react';

const VencimientosProximos = ({ vencimientos }) => {
  vencimientos = vencimientos.map(({ nombre, fecha, propietario_nombre }) => ({
    nombre,
    fecha: fecha.toLocaleString('es-AR'),
    propietario_nombre
  }));

  return (
    <div className="grid gap-2 w-full">
      {vencimientos.length > 0 ? (
        vencimientos.map(vencimiento => (
          <div
            key={vencimiento.id}
            className="flex items-center font-medium text-sm"
          >
            <div className="flex flex-row items-center justify-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <div className="flex flex-col">
                {vencimiento.nombre}
                <small>Usuario: {vencimiento.propietario_nombre}</small>
              </div>
            </div>
            <div className="ml-auto">Vence el {vencimiento.fecha}</div>
          </div>
        ))
      ) : (
        <div className="text-center font-sm">No hay vencimientos proximos.</div>
      )}
    </div>
  );
};
export default VencimientosProximos;
