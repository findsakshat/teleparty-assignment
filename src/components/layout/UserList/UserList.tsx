"use client";

import { Input } from "@/components/ui/input"
import { getUsersWithFollowersService } from '@/services/users';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";

export default function UserList() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const getUsersWithFollowers = async () => {
      try {
        setIsLoading(true);
        const usersResponse = await getUsersWithFollowersService();
        setUsers(usersResponse);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    }

    getUsersWithFollowers();
  }, []);

  return (
    <div>
      <div>
        <UserListHeader />
      </div>
      <div className="mt-4">
        {isLoading && (
          <div className="flex justify-center">
            <Loader isLoading={isLoading} />
          </div>
        )}
        {!isLoading && users && users.length > 0 && (
          <div className="border rounded-md shadow-md">
            <UserListTable users={users.slice(0, 10)} />
          </div>
        )}
      </div>
    </div>
  )
}

function UserListHeader() {

  return (
    <div>
      <div className="flex items-center justify-between">
        <div style={{ flex: 0.3 }}>
          <h3 className="text-xl font-medium">Users (20)</h3>
        </div>
        <div style={{ flex: 0.4 }}>
          <Input
            className="h-[44px]"
            placeholder="Search users"
          />
        </div>
      </div>
    </div>
  )
}

type UserListTableProps = {
  users: Array<any>
}

function UserListTable(props: UserListTableProps) {
  const [data, setData] = useState<any>(props.users);

  const headers = ["#", "username", "email", "name", "followers"]
  const rowKeys = ["id", "login", "email", "name", "followers"]

  const handleSort = (key: string) => {
    const temp = [...data];
    temp.sort((a, b) => a[key] - b[key]);
    setData(temp);
  }

  return (
    <Table>
      {/* <TableCaption>All github users</TableCaption> */}
      <TableHeader className="bg-gray-100 hover:bg-gray-100">
        <TableRow>
          {headers && headers.map((item, index: number) => (<TableHead key={index}>{item.toUpperCase()} <span onClick={() => {
            handleSort('followers');
          }} className="text-sm">SORT</span></TableHead>))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length > 0 && data.map((item: any, index: number) => {
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