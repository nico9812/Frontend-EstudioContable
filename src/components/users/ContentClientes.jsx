import { useGetUsersQuery } from '@/redux/api/usersApiSlice';
import { TableClientes } from '@/components/users/TableClientes';
import { extractRawData } from '@/helpers';
import { AccionesBtn } from '@/components/users/AccionesBtn';

const ContentClientes = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery('getUsers');

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
        return <AccionesBtn editId={props.row?.original?.id} />;
      }
    }
  ];

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error}</p>;
  } else if (isSuccess) {
    const renderedUsers = extractRawData(users.entities);

    content = <TableClientes data={renderedUsers} columns={columns} />;
  }
  return content;
};

export default ContentClientes;
