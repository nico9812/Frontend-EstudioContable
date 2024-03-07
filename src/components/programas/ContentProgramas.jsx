/* eslint-disable react/prop-types */
import { TableProgramas } from '@/components/programas/TableProgramas';
import { AccionesBtn } from '@/components/programas/AccionesBtn';
import { useLocation, useParams } from 'react-router-dom';
import { QueryHooks } from '@/hooks/QueryHooks';
import { useGetProgramasQuery } from '@/redux/api/programasApiSlice';

const ContentProgramas = ({ userId, group }) => {
  let { userId: idParams } = useParams();

  if (userId === undefined) {
    userId = idParams;
  }

  const location = useLocation();

  const columns = [
    {
      accessorKey: 'nombre',
      header: 'Nombre',
      cell: props => <div className="capitalize">{props.getValue()}</div>
    },
    {
      accessorKey: 'resolucion',
      header: 'Resolucion',
      cell: props => <div className="capitalize">{props.getValue()}</div>
    },
    {
      accessorKey: 'localidad',
      header: 'Localidad',
      cell: props => <div className="capitalize">{props.getValue()}</div>
    },
    {
      accessorKey: 'fecha_inicio',
      header: 'Fecha Inicio',
      cell: props => (
        <div className="capitalize">
          {new Date(props.getValue()).toLocaleDateString('es-AR', {
            timeZone: 'UTC'
          })}
        </div>
      )
    },
    {
      accessorKey: 'fecha_final',
      header: 'Fecha Final',
      cell: props => (
        <div className="capitalize">
          {new Date(props.getValue()).toLocaleDateString('es-AR', {
            timeZone: 'UTC'
          })}
        </div>
      )
    },
    {
      accessorKey: 'dias',
      header: 'Dias',
      cell: props => <div className="capitalize">{props.getValue()}</div>
    },
    {
      accessorKey: 'profesional',
      header: 'Profesional',
      cell: props => <div className="capitalize">{props.getValue()}</div>
    },
    {
      accessorKey: 'estado',
      header: 'Estado',
      cell: props => <div className="capitalize">{props.getValue()}</div>
    }
  ];

  if (group === 1) {
    const accionBtn = {
      accessorKey: 'actions',
      header: 'Acciones',
      cell: props => {
        return (
          <AccionesBtn sentId={props.row?.original?.id} location={location} />
        );
      }
    };
    columns.push(accionBtn);
  }

  return (
    <QueryHooks
      useQuery={useGetProgramasQuery(userId)}
      childrenObjects={renderArray => ({
        data: renderArray,
        columns: columns,
        location: location
      })}
    >
      {({ data, columns, location }) => (
        <TableProgramas
          data={data}
          columns={columns}
          location={location}
          group={group}
        />
      )}
    </QueryHooks>
  );
};

export default ContentProgramas;
