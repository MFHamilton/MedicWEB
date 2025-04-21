import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
  } from "@heroui/table";
  
  type Column = {
    key: string;
    label: string;
  };
  
  type Row = {
    key: string;
    [key: string]: any;
  };
  
  type Props = {
    columns: Column[];
    rows: Row[];
  };
  
  export default function DynamicTable({ columns, rows }: Props) {
    return (
      <Table aria-label="Dynamic Table">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows} emptyContent={"No hay información que desplegar."}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
  