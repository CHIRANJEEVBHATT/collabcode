import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "@/services/auth";

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  const showAppHeader = !["/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {showAppHeader ? (
        <header className="border-b border-slate-800 bg-slate-900/80 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold">CollabCode</span>
            <span className="hidden text-sm text-slate-400 sm:inline">Real-time collaborative editor</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/profile")}
              className="rounded border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"
            >
              Profile
            </button>
            <button
              onClick={handleSignOut}
              className="rounded bg-red-600 px-3 py-2 text-sm hover:bg-red-700"
            >
              Sign out
            </button>
          </div>
        </div>
        </header>
      ) : null}

      <div className="mx-auto w-full max-w-7xl px-2 py-3 sm:px-4 lg:px-6">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;