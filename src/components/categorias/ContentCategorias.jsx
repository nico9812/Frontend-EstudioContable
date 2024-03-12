/* eslint-disable react/prop-types */
import { TableCategorias } from '@/components/categorias/TableCategorias';
import { AccionesBtn } from '@/components/categorias/AccionesBtn';
import { useLocation } from 'react-router-dom';
import { QueryHooks } from '@/hooks/QueryHooks';
import { useGetCategoriasQuery } from '@/redux/api/categoriasApiSlice';

const ContentCategorias = () => {
  const location = useLocation();

  const columns = [
    {
      accessorKey: 'nombre',
      header: 'Nombre',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('nombre')}</div>
      )
    },
    {
      accessorKey: 'actions',
      header: 'Acciones',
      cell: ({ row }) => {
        return <AccionesBtn sentId={row.original?.id} location={location} />;
      }
    }
  ];

  return (
    <QueryHooks
      useQuery={useGetCategoriasQuery()}
      childrenObjects={renderArray => ({
        data: renderArray,
        columns: columns,
        location: location
      })}
    >
      {({ data, columns, location }) => (
        <TableCategorias data={data} columns={columns} location={location} />
      )}
    </QueryHooks>
  );
};

export default ContentCategorias;
