import { Link, useLocation, useNavigate } from "react-router-dom";

const AppBar = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const links = [
    { to: "/dashboard/profile", label: "Profile" },
    ...(role === "student" ? [{ to: "/dashboard/payment", label: "Make Payment" }] : []),
    ...(role === "school" ? [{ to: "/dashboard/fees", label: "Fee Updates" }] : []),
    ...(role === "admin" ? [{ to: "/dashboard/transactions", label: "All Orders" }] : []),
  ];

  return (
    <header className="bg-white shadow-md px-6 py-4 flex flex-wrap items-center justify-between sticky top-0 z-50">
      {/* App Title */}
      <div className="text-3xl font-bold text-blue-700 tracking-tight">
        <Link to="/">Edviron</Link>
      </div>

      {/* Navigation */}
      <nav className="flex gap-4 items-center flex-wrap text-gray-700 mt-3 sm:mt-0">
        {links.map((link) => {
          const isActive = location.pathname.startsWith(link.to);
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold shadow"
                  : "hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-3 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Logout
      </button>
    </header>
  );
};

export default AppBar;
