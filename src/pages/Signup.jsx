import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhone] = useState("");
  const [school, setSchool] = useState("");
  const [monthlyFees, setMonthlyFees] = useState("");
  const [schools, setSchools] = useState([]);

  // Fetch school data from API
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get("https://edvironbackend-iyr6.onrender.com/school");
        if (response.status === 200) {
          const mappedSchools = response.data.map(s => ({
            id: s._id,
            name: s.school_name
          }));
          setSchools(mappedSchools);
        } else {
          console.error("Failed to fetch schools:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching schools:", error.message);
      }
    };
    fetchSchools();
  }, []);

  const handleSignup = async () => {
    if (!role || !email.trim() || !password.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    let signupData;

    if (role === "student") {
      if (!name.trim() || !phone_number.trim() || !school?.id) {
        alert("Please complete all student fields.");
        return;
      }

      signupData = {
        role,
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        phone_number: phone_number.trim(),
        school_id: school.id,
      };
    } else if (role === "trustee") {
      if (!name.trim() || !school.trim() || !monthlyFees.trim()) {
        alert("Please complete all trustee fields.");
        return;
      }

      signupData = {
        role,
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        school_name: school.trim(),
        monthly_fees: monthlyFees.trim(),
      };
    } else {
      signupData = {
        role,
        email: email.trim(),
        password: password.trim(),
      };
    }

    try {
      const response = await axios.post("https://edvironbackend-iyr6.onrender.com/auth/signup", signupData);
      if (response.status === 201 || response.status === 200) {
        console.log("Signup successful");
        navigate("/signin");
      } else {
        console.error("Signup failed:", response.data.message);
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Signup error:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Something went wrong during signup.");
    }
  };

  return (
    <div className="bg-blue-100 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-4 h-max">
          <Heading label="Sign up" />
          <SubHeading label="Enter your information to create an account" />

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

          {role === "student" && (
            <>
              <InputBox label="Name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
              <InputBox label="Email" placeholder="student@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <InputBox label="Password" placeholder="123456" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <SchoolSearch label="School" value={school} onChange={setSchool} schools={schools} />
              <InputBox label="Phone Number" placeholder="Phone number" value={phone_number} onChange={(e) => setPhone(e.target.value)} />
            </>
          )}

          {role === "trustee" && (
            <>
              <InputBox label="Trustee Name" placeholder="Trustee Name" value={name} onChange={(e) => setName(e.target.value)} />
              <InputBox label="Email" placeholder="trustee@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <InputBox label="Password" placeholder="123456" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <InputBox label="School Name" placeholder="Enter New School Name" value={school} onChange={(e) => setSchool(e.target.value)} />
              <InputBox label="Monthly Fees" placeholder="Monthly Fees" value={monthlyFees} onChange={(e) => setMonthlyFees(e.target.value)} />
            </>
          )}

          {role === "admin" && (
            <>
              <InputBox label="Email" placeholder="admin@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <InputBox label="Password" placeholder="123456" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </>
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

// --- Components ---

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

function SchoolSearch({ label, value, onChange, schools }) {
  const [inputValue, setInputValue] = useState("");

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="pt-2">
      <div className="text-sm font-medium text-left py-1">{label}</div>
      <input
        type="text"
        placeholder="Search School..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
      {filteredSchools.length > 0 && (
        <div className="border rounded bg-white mt-1 max-h-40 overflow-y-auto">
          {filteredSchools.map((school) => (
            <div
              key={school.id}
              onClick={() => {
                onChange(school);
                setInputValue(school.name);
              }}
              className="p-2 hover:bg-slate-100 cursor-pointer text-left"
            >
              {school.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
