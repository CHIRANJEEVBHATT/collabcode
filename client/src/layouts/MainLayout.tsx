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
    <div className="min-h-screen bg-black text-white">
      {showAppHeader ? (
        <header className="border-b border-white/15 bg-black/90 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold">CollabCode</span>
            <span className="hidden text-sm text-zinc-400 sm:inline">Real-time collaborative editor</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/profile")}
              className="rounded border border-white/20 px-3 py-2 text-sm hover:bg-white/10"
            >
              Profile
            </button>
            <button
              onClick={handleSignOut}
              className="rounded border border-white bg-white px-3 py-2 text-sm font-medium text-black hover:bg-zinc-200"
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
