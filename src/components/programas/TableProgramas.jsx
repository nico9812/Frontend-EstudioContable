import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import Flex from '../common/Flex';
import { TableHeader } from './Filters';

export const TableProgramas = ({ data, columns, location, group }) => {
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: globalFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <Flex direction="column" className="gap-3">
      <TableHeader
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        location={location}
        group={group}
      />
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

TableProgramas.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  group: PropTypes.any,
  location: PropTypes.object
};
