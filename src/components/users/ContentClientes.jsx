import { useGetUsersQuery } from '@/redux/api/usersApiSlice';
import { TableClientes } from '@/components/users/TableClientes';
import { extractRawData } from '@/helpers';
import { AccionesBtn } from '@/components/users/AccionesBtn';
import { useLocation } from 'react-router-dom';

const ContentClientes = () => {
  const location = useLocation();

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
        return (
          <AccionesBtn sentId={props.row?.original?.id} location={location} />
        );
      }
    }
  ];

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>{error}</p>;
  } else if (isSuccess) {
    const renderedUsers = extractRawData(users);

    content = (
      <TableClientes
        data={renderedUsers}
        columns={columns}
        location={location}
      />
    );
  }
  return content;
};

export default ContentClientes;
