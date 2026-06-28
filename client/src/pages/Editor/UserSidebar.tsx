type Props = {
  users: string[];
};

function UserSidebar({ users }: Props) {
  return (
    <div className="w-60 bg-zinc-950 text-white border-r border-white/15 flex flex-col">
      <div className="p-4 border-b border-white/15">
        <h2 className="text-lg font-semibold">Online Users</h2>
        <p className="text-sm text-zinc-400">
          {users.length} user{users.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {users.map((user) => (
          <div
            key={user}
            className="rounded border border-white/10 bg-white/5 px-3 py-2"
          >
            {user}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSidebar;
