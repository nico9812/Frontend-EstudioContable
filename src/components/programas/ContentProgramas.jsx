/* eslint-disable react/prop-types */
import { TableProgramas } from '@/components/programas/TableProgramas';
import { AccionesBtn } from '@/components/programas/AccionesBtn';
import { useLocation, useParams } from 'react-router-dom';
import { QueryHooks } from '@/hooks/QueryHooks';
import { useGetProgramasQuery } from '@/redux/api/programasApiSlice';

const ContentProgramas = () => {
  const { userId } = useParams();
  const location = useLocation();

  const columns = [
    {
      accessorKey: 'nombre',
      header: 'Nombre',
      cell: props => <>{props.getValue()}</>
    },
    {
      accessorKey: 'resolucion',
      header: 'Resolucion',
      cell: props => <>{props.getValue()}</>
    },
    {
      accessorKey: 'localidad',
      header: 'Localidad',
      cell: props => <>{props.getValue()}</>
    },
    {
      accessorKey: 'fecha_inicio',
      header: 'Fecha Inicio',
      cell: props => (
        <>
          {new Date(props.getValue()).toLocaleDateString('es-AR', {
            timeZone: 'UTC'
          })}
        </>
      )
    },
    {
      accessorKey: 'fecha_final',
      header: 'Fecha Final',
      cell: props => (
        <>
          {new Date(props.getValue()).toLocaleDateString('es-AR', {
            timeZone: 'UTC'
          })}
        </>
      )
    },
    {
      accessorKey: 'dias',
      header: 'Dias',
      cell: props => <>{props.getValue()}</>
    },
    {
      accessorKey: 'profesional',
      header: 'Profesional',
      cell: props => <>{props.getValue()}</>
    },
    {
      accessorKey: 'estado',
      header: 'Estado',
      cell: props => <>{props.getValue()}</>
    },
    {
      accessorKey: 'actions',
      header: 'Acciones',
      cell: props => {
        return (
          <AccionesBtn sentId={props.row?.original?.id} location={location} />
        );
      }
    }
  ];

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
        <TableProgramas data={data} columns={columns} location={location} />
      )}
    </QueryHooks>
  );
};

export default ContentProgramas;
