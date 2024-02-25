"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import Pagination from '@/components/ui/pagination';
import UserListHeader from "../UserListHeader/UserListHeader";
import UserListTable from '../UserListTable/UserListTable';
import EmptyState from '../EmptyState/EmptyState';
import { getUsersWithFollowersService } from '@/services/users';
import { renderPageNuber } from '@/lib/utils';
import { USER_TABLE_CONSTANTS } from '@/lib/constants';

export default function UserList() {
  const [isLoading, setIsLoading] = useState<null | boolean>(null);
  const [users, setUsers] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const getUsersWithFollowers = async (currentPage: number) => {
      try {
        setIsLoading(true);
        const usersResponse = await getUsersWithFollowersService(currentPage);
        setUsers(usersResponse);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    getUsersWithFollowers(currentPage);
  }, [currentPage]);

  // Searching
  let filteredUsers = users?.filter((user: any) => user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Sorting
  filteredUsers = filteredUsers?.sort((a: any, b: any) => b['followers'] - a['followers']);

  const showLoader = isLoading === null || isLoading === true;
  const showEmptyState = isLoading === false && (!filteredUsers || filteredUsers.length === 0);
  const showTable = isLoading === false && filteredUsers && filteredUsers.length > 0;

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
        {showLoader && (
          <div className="flex justify-center">
            <Loader isLoading={showLoader} />
          </div>
        )}
        {showTable && (
          <div>
            <UserListTable
              headers={USER_TABLE_CONSTANTS.TABLE_HEADERS}
              rowKeys={USER_TABLE_CONSTANTS.TABLE_ROW_KEYS}
              users={filteredUsers}
            />
          </div>
        )}
        {showEmptyState && <EmptyState />}
        {/* FOOTER */}
        <div className='mt-4 flex justify-between items-center'>
          <p className='text-gray-500 text-sm'>Page: {renderPageNuber(1 + currentPage)}</p>
          <Pagination
            currentPage={currentPage}
            onPaginate={(page) => {
              setCurrentPage(page);
            }}
          />
        </div>
      </div>
    </div>
  )
}
