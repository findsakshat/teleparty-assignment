import { Input } from "@/components/ui/input";
import { ChangeEventHandler } from "react";

type UserListHeaderProps = {
  value?: string,
  onSearch: ChangeEventHandler<HTMLInputElement>
}

export default function UserListHeader(props: UserListHeaderProps) {
  const { onSearch, value } = props;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div style={{ flex: 0.6 }}>
          <h3 className="text-xl font-medium">Users</h3>
          <p className="text-sm text-gray-500">Displaying all users from GitHub API</p>
        </div>
        <div style={{ flex: 0.4 }}>
          <Input
            className="h-[44px]"
            placeholder="Search users"
            onChange={onSearch}
            value={value}
          />
        </div>
      </div>
    </div>
  )
}