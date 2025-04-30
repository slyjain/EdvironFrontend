import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const Signin = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    const signinData = { role, email, password };
    console.log(signinData);
    try {
      const response = await axios.post("http://localhost:3000/auth/login", signinData);
      console.log(response);
      if (response.status === 201) {
        console.log("Signin successful");

        
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/dashboard/profile"); 
      } else {
        console.error("Signin failed:", response.data.message);
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Signin error:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Something went wrong during signin.");
    }
  };

  return (
    <div className="bg-blue-200 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-4 h-max">
          <Heading label="Sign in" />
          <SubHeading label="Enter your credentials to access your account" />

          <div className="pt-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="trustee">Trustee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <InputBox
            label="Email"
            placeholder="user@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            label="Password"
            placeholder="123456"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="pt-4">
            <Button label="Sign in" onClick={handleSignin} />
          </div>

          <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" />
        </div>
      </div>
    </div>
  );
};

// --- Reusable small components (same like Signup.jsx) ---

function Heading({ label }) {
  return <div className="font-bold text-4xl pt-6">{label}</div>;
}

function SubHeading({ label }) {
  return <div className="text-slate-500 text-md pt-1 px-4 pb-4">{label}</div>;
}

function InputBox({ label, placeholder, value, onChange, type = "text" }) {
  return (
    <div className="pt-2">
      <div className="text-sm font-medium text-left py-1">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
    </div>
  );
}

function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2"
    >
      {label}
    </button>
  );
}

function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div>{label}</div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
  );
}
