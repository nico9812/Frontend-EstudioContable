import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Filters } from './Filters';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';

export const TableProgramas = ({ data, columns, location, group }) => {
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
        group={group}
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
                  No hay programas cargados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

TableProgramas.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  group: PropTypes.any,
  location: PropTypes.object
};
