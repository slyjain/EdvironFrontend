import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [phone, setPhone] = useState("");
  const [studentId, setStudentId] = useState("");
  const [monthlyFees, setMonthlyFees] = useState("");

  const handleSignup = async () => {
    if (!role || !email.trim() || !password.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = {
      role,
      email: email.trim(),
      password: password.trim(),
    };

    if (role === "student") {
      if (!name || !schoolName || !phone || !studentId) {
        alert("Please fill all student fields.");
        return;
      }
      Object.assign(payload, { name, schoolName, phone, studentId });
    }

    if (role === "trustee") {
      if (!name || !schoolName || !monthlyFees) {
        alert("Please fill all trustee fields.");
        return;
      }
      Object.assign(payload, { name, schoolName, monthlyFees });
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/signup", payload);
      if (response.status === 201) {
        console.log("Signup successful");
        navigate("/dashboard");
      } else {
        alert(response.data.message || "Signup failed.");
      }
    } catch (err) {
      console.error("Signup error:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Something went wrong during signup.");
    }
  };

  return (
    <div className="bg-blue-200 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-4 h-max">
          <Heading label="Sign up" />
          <SubHeading label="Create your account by filling the information" />

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

          <InputBox label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputBox label="Password" placeholder="••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {(role === "student" || role === "trustee") && (
            <>
              <InputBox label={role === "student" ? "Student Name" : "Trustee Name"} placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
              <InputBox label="School Name" placeholder="ABC High School" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
            </>
          )}

          {role === "student" && (
            <>
              <InputBox label="Phone Number" placeholder="9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <InputBox label="Student ID" placeholder="STD12345" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
            </>
          )}

          {role === "trustee" && (
            <InputBox label="Monthly Fees" placeholder="2000" type="number" value={monthlyFees} onChange={(e) => setMonthlyFees(e.target.value)} />
          )}

          <div className="pt-4">
            <Button label="Sign up" onClick={handleSignup} />
          </div>

          <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" />
        </div>
      </div>
    </div>
  );
};

// Reuse shared UI components from Signin
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
