import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader
} from '../ui/table';

export const TableClientes = ({ data, columns, location }) => {
  const [globalFilters, setGlobalFilters] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: globalFilters
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <div className="w-full rounded-md border overflow-auto">
      {/* <TableHeader
        globalFilters={globalFilters}
        setGlobalFilters={setGlobalFilters}
        location={location}
      /> */}
      <Table className="w-full">
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="text-left">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

TableClientes.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  location: PropTypes.object
};
