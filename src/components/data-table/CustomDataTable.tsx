import { CarbonIconType } from '@carbon/icons-react'
import {
  Button,
  DataTable,
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
import React, { Dispatch, ElementType, SetStateAction } from 'react'
import { Stack } from 'src/components/stack'
import { TableEmptyRows, TableNoData, TablePaginationCustom, emptyRows } from 'src/components/table'
import { capitalizeFirstLetter } from 'src/utils/strings'

type CustomDataTableProps<T extends { id: string }> = {
  buttonsProps?: {
    disabled?: boolean
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
    renderIcon?: CarbonIconType
    hasIconOnly?: boolean
    onClick?: (e: any) => void
  }[]
  data: T[]
  getRowComponentProps?: (row: T) => any
  isNotFound: boolean
  isSelectable?: boolean
  isSortable: boolean
  onSelectAll?: React.MouseEventHandler<HTMLInputElement>
  page: number
  RowComponent: ElementType
  rowsPerPage: number
  setPage: Dispatch<SetStateAction<number>>
  setSelected?: Dispatch<SetStateAction<string[]>>
  setRowsPerPage: Dispatch<SetStateAction<number>>
  tableHead: { key: string; header: React.ReactNode }[]
  tableName: string
  title?: string
  allChecked?: boolean
  ToolbarContent: React.ReactNode
  getKey?: (row: T) => any
  batchActions?: { icon: CarbonIconType; title: string; onClick: (selectedRows: any[]) => void }[]
}

export default function CustomDataTable<T extends { id: string }>({
  buttonsProps,
  data,
  getRowComponentProps,
  isNotFound,
  isSelectable = false,
  isSortable,
  onSelectAll,
  page,
  RowComponent,
  rowsPerPage,
  setPage,
  setSelected,
  setRowsPerPage,
  tableHead,
  tableName,
  title,
  ToolbarContent,
  allChecked,
  getKey,
  batchActions
}: CustomDataTableProps<T>) {
  return (
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
          selectedRows
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
        }) => (
          <TableContainer
            style={{ paddingTop: 0 }}
            id={`tour-${tableName}-table`}
            {...getTableContainerProps()}
          >
            <TableToolbar
              id={`${tableName}-table`}
              title={title}
              {...getToolbarProps()}
              aria-label="contract table toolbar"
            >
              {batchActions && isSelectable && (
                <TableBatchActions
                  {...getBatchActionProps()}
                  onCancel={() => {
                    if (setSelected) setSelected([])
                    getBatchActionProps().onCancel()
                  }}
                >
                  {batchActions.map((action) => (
                    <TableBatchAction
                      key={action.title}
                      tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                      renderIcon={action.icon}
                      onClick={() => action.onClick(selectedRows)}
                    >
                      {action.title}
                    </TableBatchAction>
                  ))}
                </TableBatchActions>
              )}
              <TableToolbarContent>
                {ToolbarContent}
                {buttonsProps && (
                  <Stack orientation="horizontal">
                    {buttonsProps.map((p) => (
                      <span key={p.label}>
                        <Button
                          disabled={p.disabled}
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
            <Table {...getTableProps()} size="xl">
              <TableHead>
                <TableRow>
                  {isSelectable && data.length > 0 && (
                    <TableSelectAll
                      {...getSelectionProps()}
                      checked={allChecked}
                      onSelect={(e) => {
                        getSelectionProps().onSelect(e)
                        if (onSelectAll) onSelectAll(e)
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
                <TableBody>
                  {rows
                    .slice((page - 1) * rowsPerPage)
                    .slice(0, rowsPerPage)
                    .map((row, i) => (
                      <RowComponent
                        selectionProps={{ ...getSelectionProps({ row }) }}
                        rowProps={{ ...getRowProps({ row }) }}
                        key={getKey ? getKey(data[i]) : row.id}
                        row={row}
                        {...(getRowComponentProps ? getRowComponentProps(data[i]) : {})}
                      />
                    ))}
                  {emptyRows(page, rowsPerPage, data.length) !== rowsPerPage && (
                    <TableEmptyRows
                      emptyRows={emptyRows(page, rowsPerPage, data.length)}
                      cols={9}
                    />
                  )}
                  <TableNoData isNotFound={isNotFound} cols={9} />
                </TableBody>
              )}
            </Table>
          </TableContainer>
        )}
      </DataTable>
      <TablePaginationCustom
        id={`tour-${tableName}-pagination`}
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
  )
}
