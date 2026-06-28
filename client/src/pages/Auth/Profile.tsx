import { useEffect, useState } from "react";
import { me, logout } from "@/services/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    me()
      .then((u) => setUser(u))
      .catch(() => setUser(null));
  }, []);

  const doLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>

      <button onClick={doLogout} className="mt-4 rounded bg-red-600 px-4 py-2">Logout</button>
    </div>
  );
}

export default Profile;
