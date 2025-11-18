import LogoutButton from "./LogoutButton";

type Props = {
  user: { name: string; role: string };
};

const DashboardTopBar = ({ user }: Props) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <p className="mb-4">
          <span>{user.role}: </span>
          <span className="font-bold">{user.name}</span>
        </p>
        <LogoutButton />
      </div>
    </div>
  );
};

export default DashboardTopBar;
