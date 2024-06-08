import React, { useMemo } from 'react'

import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table'

const BasicTable = () => {
    const data = useMemo(() => [
        {
            name: {
                first_name: 'Haddis',
                last_name: 'Fata',
            },
            info: {
                email: 'haddisfun@gmail.com',
                profession: 'Web Developer',
            }
        },
    ], [])

    const columnHelper = createColumnHelper()

    const columns = useMemo(() => [
        columnHelper.group({
            header: 'Name',
            cell: row => {
                console.log(row)
                return 'full Name'
            },
            columns: [
                columnHelper.accessor('name.first_name',{
                    header: () => 'First Name'
                }),
                columnHelper.accessor('name.last_name',{
                    header: () => 'Last Name'
                }),

            ]
        })
    ], [])

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <div>
            <h3>Basic Table</h3>
            <table className='w-[700px] mx-auto'>
                <thead className='bg-green-500 text-white'>
                    {
                        table.getHeaderGroups().map(headerGroup => {
                            return (
                                <tr key={headerGroup.id}>
                                    {
                                        headerGroup.headers.map(cellGroup => {
                                            return (
                                                <th className='p-1 text-left hover:bg-green-400 cursor-pointer' key={cellGroup.id}>
                                                    {
                                                        flexRender(
                                                            cellGroup.column.columnDef.header,
                                                            cellGroup.getContext()
                                                        )
                                                    }
                                                </th>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map(row => {
                            return (
                                <tr key={row.id} className='border-b border-green-100 hover:bg-green-50'>
                                    {
                                        row.getVisibleCells().map(cell => {
                                            return (
                                                <td className='px-1 py-2' key={cell.id}>
                                                    {
                                                        flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )
                                                    }
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default BasicTable
