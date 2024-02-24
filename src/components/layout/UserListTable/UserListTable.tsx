import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDownUp } from "lucide-react";

type UserListTableProps = {
  users: Array<any>,
  headers: string[] | [],
  rowKeys: string[] | []
}

export default function UserListTable(props: UserListTableProps) {
  const { headers, rowKeys, users } = props;

  return (
    <Table className="rounded-md">
      {/* <TableCaption>All github users</TableCaption> */}
      <TableHeader>
        <TableRow>
          {headers && headers.map((item, index: number) => {
            // if (item === "followers") {
            //   return (<TableHead className="border" key={index}>
            //     <button className="flex items-center gap-1 p-2 rounded-md hover:bg-gray-200">
            //       <div>{item.toUpperCase()}</div>
            //       <ArrowDownUp size={20} />
            //     </button>
            //   </TableHead>)
            // }
            return <TableHead key={index}>{item.toUpperCase()}</TableHead>
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users && users.length > 0 && users.map((item: any, index: number) => {
          return (
            <TableRow key={index}>
              {rowKeys && rowKeys.length && rowKeys.map((key: any, index: number) => (
                <TableCell key={index}>{item[key] || "-"}</TableCell>
              ))}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}