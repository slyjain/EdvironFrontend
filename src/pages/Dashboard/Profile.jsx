import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const {
    name,
    email,
    school_id,
    role,
    phone_number,
    school_name,
    student_id,
    trustee_name,
    monthly_fees,
    trustee,
  } = user;

  const capitalizedRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : "User";

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-2">User Profile</h2>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
            {name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{name || "User"}</h3>
            <p className="text-gray-500">{capitalizedRole}</p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-5 text-sm sm:text-base">
          <InfoRow label="Email" value={email} />
          {school_name && <InfoRow label="School Name" value={school_name} />}
          {role === "student" && student_id && <InfoRow label="Student ID" value={student_id} />}
          {role === "trustee" && trustee_name && <InfoRow label="Trustee Name" value={trustee_name} />}
          {role === "trustee" && monthly_fees && <InfoRow label="Monthly Fees" value={`$${monthly_fees}`} />}
          {role === "school" && trustee && <InfoRow label="Trustee Email" value={trustee} />}
          {phone_number && <InfoRow label="Phone Number" value={phone_number} />}
          {school_id && <InfoRow label="School ID" value={school_id} />}
        </div>
      </div>
    </div>
  );
};

// Reusable info row component
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <span className="text-gray-600">{label}:</span>
    <span className="text-gray-800 font-medium">{value}</span>
  </div>
);

export default Profile;
