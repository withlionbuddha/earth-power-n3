import type { Key, ReactNode } from 'react'
import './ui.css'

export type TableColumn<T> = {
  key: string
  header: string
  render: (row: T) => ReactNode
  align?: 'left' | 'center' | 'right'
}
export type TableProps<T> = {
  columns: readonly TableColumn<T>[]
  rows: readonly T[]
  getRowKey: (row: T) => Key
  caption: string
  emptyMessage?: string
  className?: string
}

export default function Table<T>({ columns, rows, getRowKey, caption, emptyMessage = '표시할 데이터가 없습니다.', className = '' }: TableProps<T>) {
  return <div className={['ui-table-wrap', className].filter(Boolean).join(' ')}>
    <table className="ui-table">
      <caption className="ui-table__caption">{caption}</caption>
      <thead><tr>{columns.map(column => <th key={column.key} scope="col" className={column.align ? `ui-table__${column.align}` : undefined}>{column.header}</th>)}</tr></thead>
      <tbody>{rows.length === 0
        ? <tr><td className="ui-table__empty" colSpan={Math.max(columns.length, 1)}>{emptyMessage}</td></tr>
        : rows.map(row => <tr key={getRowKey(row)}>{columns.map(column => <td key={column.key} className={column.align ? `ui-table__${column.align}` : undefined}>{column.render(row)}</td>)}</tr>)}
      </tbody>
    </table>
  </div>
}
