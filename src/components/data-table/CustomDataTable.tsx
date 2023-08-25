import {
  Button,
  DataTable,
  DataTableSkeleton,
  Table,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableToolbar,
  TableToolbarContent
} from '@carbon/react'
import React, { Dispatch, SetStateAction } from 'react'
import { Icon, Translation } from 'src/@types'
import { Stack } from 'src/components/stack'
import { TableEmptyRows, TableNoData, TablePaginationCustom, emptyRows } from 'src/components/table'
import { capitalizeFirstLetter } from 'src/utils/strings'

type RowComponentPropsBase = JSX.IntrinsicAttributes & {
  row: any
  rowProps: any
  selectionProps?: any
}

type CustomDataTableProps<T extends { id: string }, U extends RowComponentPropsBase> = {
  buttonsProps?: {
    disabled?: boolean
    id?: string
    kind?:
      | 'primary'
      | 'secondary'
      | 'danger'
      | 'ghost'
      | 'danger--primary'
      | 'danger--ghost'
      | 'danger--tertiary'
      | 'tertiary'
    label: string
    renderIcon?: Icon
    hasIconOnly?: boolean
    onClick?: (e: any) => void
  }[]
  data: T[] | null
  getRowComponentProps?: (row: T) => Omit<U, 'row' | 'rowProps' | 'selectionProps'>
  isNotFound: boolean
  isSelectable?: boolean
  isSortable?: boolean
  onSelectAll?: (rows: T[], checked: boolean) => void
  onSelectRow?: (row: T, checked: boolean) => void
  page: number
  RowComponent: (props: U, children?: React.ReactNode) => JSX.Element
  rowsPerPage: number
  setPage: Dispatch<SetStateAction<number>>
  setRowsPerPage: Dispatch<SetStateAction<number>>
  tableHead: { key: string; header: React.ReactNode }[]
  tableName: string
  title?: string
  ToolbarContent?: React.ReactNode
  batchActions?: { icon: Icon; title: string; onClick: (selectedRows: any[]) => void }[]
  selection?: string[]
  noDataText: Translation
}

export default function CustomDataTable<T extends { id: string }, U extends RowComponentPropsBase>({
  buttonsProps,
  data,
  getRowComponentProps,
  isNotFound,
  isSelectable = false,
  isSortable = false,
  onSelectAll,
  onSelectRow,
  page,
  RowComponent,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  tableHead,
  tableName,
  title,
  ToolbarContent,
  batchActions,
  selection,
  noDataText
}: CustomDataTableProps<T, U>) {
  return (
    <>
      {data ? (
        <>
          <DataTable isSortable={isSortable} headers={tableHead} rows={data}>
            {({
              rows,
              headers,
              getHeaderProps,
              getRowProps,
              getTableProps,
              getToolbarProps,
              getBatchActionProps,
              getSelectionProps,
              getTableContainerProps,
              selectedRows,
              selectRow
            }: {
              rows: any[]
              headers: { key: string; header: React.ReactNode }[]
              getHeaderProps: any
              getRowProps: any
              getTableProps: any
              getBatchActionProps: any
              getToolbarProps: any
              getTableContainerProps: any
              getSelectionProps: any
              selectedRows: any[]
              selectRow: any
            }) => {
              if (selection) {
                selection.forEach((id) => {
                  if (selectedRows.map((r) => r.id).includes(id)) return
                  selectRow(id)
                })
                selectedRows
                  .map((r) => r.id)
                  .forEach((id) => {
                    if (selection.includes(id)) return
                    selectRow(id)
                  })
              }
              return (
                <TableContainer
                  id={`${tableName}-table-container`}
                  style={{ paddingTop: 0 }}
                  {...getTableContainerProps()}
                >
                  {ToolbarContent && (
                    <TableToolbar
                      id={`${tableName}-table-toolbar`}
                      title={title}
                      {...getToolbarProps()}
                      aria-label="contract table toolbar"
                    >
                      {batchActions && isSelectable && (
                        <TableBatchActions {...getBatchActionProps()}>
                          {batchActions.map((action) => (
                            <TableBatchAction
                              key={action.title}
                              tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                              renderIcon={action.icon}
                              onClick={() => action.onClick(selectedRows)}
                            >
                              {capitalizeFirstLetter(action.title)}
                            </TableBatchAction>
                          ))}
                        </TableBatchActions>
                      )}
                      <TableToolbarContent id={`${tableName}-table-toolbar-content`}>
                        {ToolbarContent}
                        {buttonsProps && (
                          <Stack orientation="horizontal">
                            {buttonsProps.map((p) => (
                              <span key={p.label}>
                                <Button
                                  disabled={p.disabled}
                                  id={p.id}
                                  onClick={p.onClick}
                                  kind={p.kind}
                                  renderIcon={p.renderIcon}
                                  iconDescription={p.label}
                                  hasIconOnly={p.hasIconOnly}
                                >
                                  {p.label}
                                </Button>
                              </span>
                            ))}
                          </Stack>
                        )}
                      </TableToolbarContent>
                    </TableToolbar>
                  )}
                  <Table {...getTableProps()} size="xl">
                    <TableHead id={`${tableName}-table-head`}>
                      <TableRow>
                        {isSelectable && data.length > 0 && (
                          <TableSelectAll
                            {...getSelectionProps()}
                            onSelect={(e) => {
                              getSelectionProps().onSelect(e)
                              // @ts-ignore
                              if (onSelectAll) onSelectAll(data, e.target.checked)
                            }}
                          />
                        )}
                        {headers.map((header: { key: string; header: React.ReactNode }) => (
                          <TableHeader
                            {...getHeaderProps({ header })}
                            isSortable={header.key !== '' && header.key !== '-'}
                            key={header.key}
                          >
                            {typeof header.header === 'string'
                              ? capitalizeFirstLetter(header.header)
                              : header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    {data && (
                      <TableBody id={`${tableName}-table-body`}>
                        {rows
                          .slice((page - 1) * rowsPerPage)
                          .slice(0, rowsPerPage)
                          .map((row, i) => (
                            // @ts-ignore
                            <RowComponent
                              selectionProps={{
                                ...getSelectionProps({
                                  row,
                                  // @ts-ignore
                                  onClick: (e) =>
                                    onSelectRow ? onSelectRow(data[i], e.target.checked) : null
                                })
                              }}
                              rowProps={{ ...getRowProps({ row }) }}
                              key={row.id}
                              row={row}
                              {...(getRowComponentProps ? getRowComponentProps(data[i]) : {})}
                            />
                          ))}
                        <TableNoData text={noDataText} isNotFound={isNotFound} cols={9} />
                        {emptyRows(page, rowsPerPage, data.length, isNotFound) !== rowsPerPage && (
                          <TableEmptyRows
                            emptyRows={emptyRows(page, rowsPerPage, data.length, isNotFound)}
                            cols={9}
                          />
                        )}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              )
            }}
          </DataTable>
          <TablePaginationCustom
            id={`${tableName}-table-pagination`}
            count={data.length}
            page={page}
            onChangePagination={(pageInfo) => {
              if (pageInfo.page && page !== pageInfo.page) setPage(pageInfo.page)
              if (pageInfo.pageSize && rowsPerPage !== pageInfo.pageSize)
                setRowsPerPage(pageInfo.pageSize)
            }}
            rowsPerPage={rowsPerPage}
          />
        </>
      ) : (
        <DataTableSkeleton
          className=""
          showHeader
          showToolbar
          zebra={false}
          rowCount={5}
          columnCount={tableHead.length}
          compact={false}
          headers={tableHead.map((header) =>
            typeof header.header === 'string' ? capitalizeFirstLetter(header.header) : header.header
          )}
        />
      )}
    </>
  )
}
