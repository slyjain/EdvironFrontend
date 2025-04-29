import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { PrivateRoute } from "./components/PrivateRoute";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";

import Profile from "./pages/Dashboard/Profile";
import MakePayment from "./pages/Dashboard/MakePayment";
import FeeUpdates from "./pages/Dashboard/FeeUpdates";
import AllOrders from "./pages/Dashboard/AllOrders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="payment" element={<MakePayment />} />
            <Route path="fees" element={<FeeUpdates />} />
            <Route path="orders" element={<AllOrders />} />
          </Route>
        </Route>

        {/* Redirect /dashboard to /dashboard/profile */}
        <Route path="/dashboard" element={<Navigate to="/dashboard/profile" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
