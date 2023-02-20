import { useMemo, ReactElement, useState, ChangeEvent } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  FilterFn,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';

import { IEmployee } from '../interface/Employee';
import { timestampToBirthday } from '../utils';

interface IProps {
  data: IEmployee[];
}

const Table = ({ data }: IProps): ReactElement => {
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<IEmployee>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
      },
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Last name',
        accessorKey: 'last_name',
      },
      {
        accessorFn: (row) => row.birthday,
        id: 'birthday',
        header: 'Birthday',
        accessorKey: 'birthday',
        cell: (info) => timestampToBirthday(info.getValue() as number),
      },
    ],
    []
  );

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);

    addMeta({
      itemRank,
    });

    return itemRank.passed;
  };

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    initialState: { pagination: { pageSize: 10 } },
  });

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    setGlobalFilter(value);
  };

  return (
    <>
      <div className="columns is-gapless">
        <div className="column is-4">
          <input className="input" value={globalFilter} onChange={handleFilterChange} placeholder={'Search name'} />
        </div>
      </div>

      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="has-background-grey-light" />

      <div className="pagination is-right" role="navigation" aria-label="pagination">
        <div className="buttons mb-0">
          <button
            className="button is-small"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>

          <button
            className="button is-small"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>

          <button className="button is-small" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next page
          </button>

          <button
            className="button is-small"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
        </div>

        <div>
          <p className="is-size-7">
            Page:&nbsp;
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default Table;
