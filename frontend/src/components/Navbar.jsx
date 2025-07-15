import { Link } from "react-router";
import { LogOut, PlusIcon, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import api from "../lib/axios";

const Navbar = () => {
  const [user, setUser] = useState();
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/me", {
          withCredentials: true,
        });
        setUser(data);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  async function handleLogout() {
    await logout();
  }

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary font-mono tracking-tight">
            ThinkBoard
          </h1>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-md text-primary focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4">
            <Link to="/create" className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>

            <div className="bg-primary size-10 flex items-center justify-center rounded-full">
              <h2 className="text-[#171212] font-semibold text-md">
                {user?.email.charAt(0).toUpperCase()}
              </h2>
            </div>

            <button className="btn text-error" onClick={handleLogout}>
              <LogOut className="size-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="flex flex-col sm:hidden mt-4 gap-3 border-t border-base-content/10 pt-4">
            {/* New Note Button */}
            <Link to="/create" className="btn btn-primary w-full">
              <PlusIcon className="size-5 mr-2" />
              <span>New Note</span>
            </Link>

            {/* User Info */}
            <div className="self-start px-2">
              <p className="text-sm text-muted">Logged in as:</p>
              <h2 className="text-[#171212] font-semibold text-md">
                {user?.name ?? "User"}
              </h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>

            {/* Logout Button */}
            <button className="btn text-error w-full " onClick={handleLogout}>
              <LogOut className="size-5 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
