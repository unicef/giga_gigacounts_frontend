import {
  Button,
  DataTable,
  DataTableHeader,
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
import { TableRowProps } from '@carbon/react/lib/components/DataTable/TableRow'
import React from 'react'
import { Icon, Translation } from 'src/@types'
import { Stack } from 'src/components/stack'
import { TableEmptyRows, TableNoData, TablePaginationCustom, emptyRows } from 'src/components/table'
import { ICONS, KEY_DEFAULTS, PICTOGRAMS } from 'src/constants'
import { useLocales } from 'src/locales'
import { capitalizeFirstLetter } from 'src/utils/strings'

type RowComponentPropsBase = JSX.IntrinsicAttributes & {
  row: any
  rowProps: TableRowProps
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
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  }[]
  data: T[] | null
  RowComponent: (props: U, children?: React.ReactNode) => JSX.Element
  getRowComponentProps?: (row: T) => Omit<U, 'row' | 'rowProps' | 'selectionProps'>
  isNotFound: boolean
  isSelectable?: boolean
  isSortable?: boolean
  onSelectAll?: (rows: T[], checked: boolean) => void
  onSelectRow?: (row: T, checked: boolean) => void
  page: number
  rowsPerPage: number
  setPage: (page: number) => void
  setRowsPerPage: (rowsPerPage: number) => void
  tableHead: DataTableHeader[]
  tableName: string
  title?: string
  ToolbarContent?: React.ReactNode
  batchActions?: { icon: Icon; title: string; onClick: (selectedRows: any[]) => void }[]
  selection?: string[]
  emptyText: Translation
  isEmpty: boolean
  getDataKey?: (row: T) => string | number
  rowToDataKey?: (row: any) => string
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
  emptyText,
  isEmpty,
  getDataKey,
  rowToDataKey
}: CustomDataTableProps<T, U>) {
  const { translate, replaceTranslated } = useLocales()
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
              if (selection && rowToDataKey) {
                selection.forEach((selectedItem) => {
                  if (selectedRows.map(rowToDataKey).includes(selectedItem)) return
                  const row = rows.find((r) => rowToDataKey(r) === selectedItem)
                  if (row) selectRow(row.id)
                })
                selectedRows.map(rowToDataKey).forEach((selectedItem) => {
                  if (selection.includes(selectedItem)) return
                  const row = rows.find((r) => rowToDataKey(r) === selectedItem)
                  if (row) selectRow(row.id)
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
                      {...getToolbarProps()}
                      aria-label="contract table toolbar"
                    >
                      {batchActions && isSelectable && (
                        <TableBatchActions {...getBatchActionProps()}>
                          {batchActions.map((action) => (
                            <TableBatchAction
                              key={action.title}
                              tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
                              renderIcon={action.icon ? ICONS[action.icon] : undefined}
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
                                  renderIcon={p.renderIcon ? ICONS[p.renderIcon] : undefined}
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
                            isSortable={!Object.values(KEY_DEFAULTS).includes(header.key as any)}
                            key={header.key}
                          >
                            {typeof header.header === 'string'
                              ? capitalizeFirstLetter(header.header)
                              : header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>

                    {!isEmpty && !isNotFound && (
                      <TableBody id={`${tableName}-table-body`}>
                        {rows
                          .slice((page - 1) * rowsPerPage)
                          .slice(0, rowsPerPage)
                          .map((row) => {
                            const element = data.find((d) =>
                              getDataKey && rowToDataKey
                                ? getDataKey(d) === rowToDataKey(row)
                                : d.id === row.id
                            )
                            return (
                              // @ts-ignore
                              <RowComponent
                                selectionProps={{
                                  ...getSelectionProps({
                                    row
                                  }),
                                  // @ts-ignore
                                  onChange: (value) => {
                                    selectRow(row.id)
                                    if (onSelectRow && element) onSelectRow(element, value)
                                  }
                                }}
                                rowProps={{ ...getRowProps({ row }) }}
                                key={getDataKey && element ? getDataKey(element) : element?.id}
                                row={row}
                                {...(getRowComponentProps && element
                                  ? getRowComponentProps(element)
                                  : {})}
                              />
                            )
                          })}
                        {emptyRows(page, rowsPerPage, data.length) !== rowsPerPage && (
                          <TableEmptyRows
                            emptyRows={emptyRows(page, rowsPerPage, data.length)}
                            cols={10}
                          />
                        )}
                      </TableBody>
                    )}
                  </Table>
                  {(isEmpty || isNotFound) && (
                    <>
                      <TableNoData
                        Icon={PICTOGRAMS.Assets}
                        rowsPerPage={rowsPerPage}
                        title={translate('table_empty.title')}
                        subtitle={replaceTranslated(
                          'table_empty.subtitle',
                          '{{content}}',
                          emptyText
                        )}
                        isNotFound={isEmpty}
                      />
                      <TableNoData
                        Icon={PICTOGRAMS.DesignResearch}
                        rowsPerPage={rowsPerPage}
                        title={translate('table_not_found.title')}
                        subtitle={translate('table_not_found.subtitle')}
                        isNotFound={isNotFound}
                      />
                    </>
                  )}
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
          headers={tableHead.map((h) => ({
            ...h,
            header: typeof h.header === 'string' ? capitalizeFirstLetter(h.header) : h.header
          }))}
        />
      )}
    </>
  )
}
