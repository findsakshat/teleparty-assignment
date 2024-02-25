import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type UserListTableProps = {
  users: Array<any>,
  headers: string[] | [],
  rowKeys: string[] | []
}

export default function UserListTable(props: UserListTableProps) {
  const { headers, rowKeys, users } = props;

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          {headers && headers.map((item, index: number) => (
            <TableHead className="border" key={index}>{item.toUpperCase()}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users && users.length > 0 && users.map((item: any, index: number) => {
          return (
            <TableRow key={index}>
              {rowKeys && rowKeys.length && rowKeys.map((key: any, index: number) => (
                <TableCell className="border" key={index}>{item[key] || "-"}</TableCell>
              ))}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}