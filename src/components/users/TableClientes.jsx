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

import { Filters } from './Filters';

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
    <div className="flex flex-col gap-4 md:p-3">
      <Filters
        globalFilters={globalFilters}
        setGlobalFilters={setGlobalFilters}
        location={location}
      />
      <div className="flex flex-col flex-wrap relative overflow-auto">
        <Table className="w-full rounded-md border overflow-auto">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay clientes cargados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

TableClientes.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  location: PropTypes.object
};
