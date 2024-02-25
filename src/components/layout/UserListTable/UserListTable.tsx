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
        <TableRow className="bg-gray-100 dark:bg-gray-900">
          {headers && headers.map((item, index: number) => (
            <TableHead className="border" key={index}>{item.toUpperCase()}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users && users.length > 0 && users.map((item: any, index: number) => {
          return (
            <TableRow key={index}>
              {rowKeys && rowKeys.length && rowKeys.map((key: any, index: number) => {
                if (key === "avatar_url") {
                  return <TableCell className="w-[80px] text-center" key={index}>
                    <img height={40} width={40} className="rounded-full text-center" src={item[key]} />
                  </TableCell>
                }
                if (key === "login") {
                  return <TableCell className="border font-medium" key={index}>{item[key] || "-"}</TableCell>
                }
                return <TableCell className="border" key={index}>{item[key] || "-"}</TableCell>
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}