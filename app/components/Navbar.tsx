import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
const { auth } = usePuterStore();
const navigate = useNavigate();

return (
    <nav className="navbar flex items-center justify-between">
    <Link to="/">
        <p className="text-2xl font-bold text-gradient">Resumind</p>
    </Link>

    <div className="flex items-center gap-4">
        <Link to="/upload" className="primary-button w-fit">
        Upload Resume
        </Link>

        {auth.isAuthenticated && (
        <button
            onClick={() => {
            auth.signOut();
            navigate("/auth");
            }}
            className="px-5 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 active:bg-red-700 transition"
        >
            Log Out
        </button>
        )}
    </div>
    </nav>
);
};

export default Navbar;
