"use client";

import { getUsersWithFollowersService } from '@/services/users';
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import UserListHeader from "../UserListHeader/UserListHeader";
import UserListTable from '../UserListTable/UserListTable';

const TABLE_HEADERS = ["#", "username", "email", "name", "followers"];
const TABLE_ROW_KEYS = ["id", "login", "email", "name", "followers"];

export default function UserList() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  // Searching
  let filteredUsers = users.filter((user: any) => {
    if (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
  });

  // Sorting
  filteredUsers = filteredUsers.sort((a: any, b: any) => b['followers'] - a['followers']);

  return (
    <div>
      <div>
        <UserListHeader 
          value={searchQuery}
          onSearch={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
      </div>
      <div className="mt-4">
        {isLoading && (
          <div className="flex justify-center">
            <Loader isLoading={isLoading} />
          </div>
        )}
        {!isLoading && (
          <div className="border rounded-md shadow-md">
            <UserListTable
              headers={TABLE_HEADERS}
              rowKeys={TABLE_ROW_KEYS}
              users={filteredUsers} 
            />
          </div>
        )}
      </div>
    </div>
  )
}

