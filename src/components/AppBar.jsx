import { Link, useNavigate } from "react-router-dom";

const AppBar = ({ role }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const links = [
    { to: "/dashboard/profile", label: "Profile" },
    ...(role === "student" ? [{ to: "/dashboard/payment", label: "Make Payment" }] : []),
    ...(role === "trustee" ? [{ to: "/dashboard/fees", label: "Fee Updates" }] : []),
    ...(role === "admin" ? [{ to: "/dashboard/orders", label: "All Orders" }] : []),
  ];

  return (
    <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* App title */}
      <div className="text-2xl font-semibold text-blue-700">Edviron</div>

      {/* Navigation links */}
      <nav className="flex items-center space-x-6 text-gray-700 font-medium">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="hover:text-blue-600 transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Logout button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AppBar;
