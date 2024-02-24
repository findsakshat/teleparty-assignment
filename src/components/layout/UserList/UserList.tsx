"use client";

import { Input } from "@/components/ui/input"
import { getUsersWithFollowersService } from '@/services/users';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

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
      <div className="mt-4 border rounded-md shadow-md">
        { users && users.length > 0 && <UserListTable users={users} /> }
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
  const { users } = props;

  const headers = ["#", "username", "email", "name", "followers"]
  const rowKeys = ["id", "login", "email", "name", "followers"]
  const data = users;

  return (
    <Table>
      {/* <TableCaption>All github users</TableCaption> */}
      <TableHeader className="bg-gray-100 hover:bg-gray-100">
        <TableRow>
          {headers && headers.map((item, index) => (<TableHead key={index}>{item.toUpperCase()}</TableHead>))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length > 0 && data.map((item: any, index) => {
          return (
            <TableRow key={index}>
              {rowKeys && rowKeys.length && rowKeys.map((key: any, index) => (
                <TableCell key={index}>{item[key] || "-"}</TableCell>
              ))}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}