import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Flex from '../common/Flex';
import { Filters } from './Filters';

export const TableUser = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <Flex direction="column" className="gap-3">
      <Filters />
      <Table striped bordered hover responsive size="sm">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Flex>
  );
};

TableUser.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array
};
