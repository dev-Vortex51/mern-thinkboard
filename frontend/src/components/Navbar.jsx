import { Link } from "react-router";
import { LogOut, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState();
  const { logout } = useAuth();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/api/auth/me", {
          withCredentials: true,
        });
        setUser(data);
        console.log(data);
      } catch (err) {
        setUser(null);
      } finally {
      }
    };

    fetchUser();
  }, []);

  async function handleLogout() {
    await logout();
  }

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            ThinkBoard
          </h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
            <div className=" btn-primary size-10  transition-colors duration-200 t bg-primary  flex items-center justify-center rounded-full">
              <h2 className="text-[#171212] font-semibold ext-md">
                {user?.email.charAt(0).toUpperCase()}
              </h2>
            </div>
            <button className="btn text-error" onClick={handleLogout}>
              <LogOut className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
