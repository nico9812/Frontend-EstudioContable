/* eslint-disable react/prop-types */
import { useGetUsersQuery } from '@/redux/api/usersApiSlice';
import { TableClientes } from '@/components/users/TableClientes';
// import { AccionesBtn } from '@/components/users/AccionesBtn';
import { useLocation } from 'react-router-dom';
import { QueryHooks } from '@/hooks/QueryHooks';
import { DropDownActionsMenu } from '@/components/users/DropDownActionsMenu';

const ContentClientes = () => {
  const location = useLocation();

  const columns = [
    {
      accessorKey: 'username',
      header: 'Usuario',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('username')}</div>
      )
    },
    {
      accessorKey: 'last_name',
      header: 'Apellido',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('last_name')}</div>
      )
    },
    {
      accessorKey: 'first_name',
      header: 'Nombre',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('first_name')}</div>
      )
    },
    {
      accessorKey: 'email',
      header: 'Correo',
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('email')}</div>
      )
    },
    {
      accessorKey: 'actions',
      header: 'Acciones',
      cell: ({ row }) => (
        <DropDownActionsMenu sentId={row?.original?.id} location={location} />
      )
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
