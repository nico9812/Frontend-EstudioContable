/* eslint-disable react/prop-types */
import { useGetUsersQuery } from '@/redux/api/usersApiSlice';
import { TableClientes } from '@/components/users/TableClientes';
import { AccionesBtn } from '@/components/users/AccionesBtn';
import { useLocation } from 'react-router-dom';
import { QueryHooks } from '@/hooks/QueryHooks';

const ContentClientes = () => {
  const location = useLocation();

  const columns = [
    {
      accessorKey: 'username',
      header: 'Usuario',
      cell: props => <>{props.getValue()}</>
    },
    {
      accessorKey: 'last_name',
      header: 'Apellido',
      cell: props => <>{props.getValue()}</>
    },
    {
      accessorKey: 'first_name',
      header: 'Nombre',
      cell: props => <>{props.getValue()}</>
    },
    {
      accessorKey: 'email',
      header: 'Correo',
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
      useQuery={useGetUsersQuery()}
      childrenObjects={renderArray => ({
        data: renderArray,
        columns: columns,
        location: location
      })}
    >
      {({ data, columns, location }) => (
        <TableClientes data={data} columns={columns} location={location} />
      )}
    </QueryHooks>
  );
};

export default ContentClientes;
