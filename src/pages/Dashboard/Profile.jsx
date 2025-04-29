import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <div>Loading...</div>;
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
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">User Profile</h2>

        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-semibold">
            {name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{name || "User"}</h3>
            <p className="text-gray-600">{capitalizedRole}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div className="flex justify-between border-b pb-4">
            <div className="text-gray-600">Email:</div>
            <div className="font-semibold text-gray-800">{email}</div>
          </div>

          {school_name && (
            <div className="flex justify-between border-b pb-4">
              <div className="text-gray-600">School Name:</div>
              <div className="font-semibold text-gray-800">{school_name}</div>
            </div>
          )}

          {role === "student" && student_id && (
            <div className="flex justify-between border-b pb-4">
              <div className="text-gray-600">Student ID:</div>
              <div className="font-semibold text-gray-800">{student_id}</div>
            </div>
          )}

          {role === "trustee" && trustee_name && (
            <div className="flex justify-between border-b pb-4">
              <div className="text-gray-600">Trustee Name:</div>
              <div className="font-semibold text-gray-800">{trustee_name}</div>
            </div>
          )}

          {role === "trustee" && monthly_fees && (
            <div className="flex justify-between border-b pb-4">
              <div className="text-gray-600">Monthly Fees:</div>
              <div className="font-semibold text-gray-800">${monthly_fees}</div>
            </div>
          )}

          {role === "school" && trustee && (
            <div className="flex justify-between border-b pb-4">
              <div className="text-gray-600">Trustee Email:</div>
              <div className="font-semibold text-gray-800">{trustee}</div>
            </div>
          )}

          {phone_number && (
            <div className="flex justify-between border-b pb-4">
              <div className="text-gray-600">Phone Number:</div>
              <div className="font-semibold text-gray-800">{phone_number}</div>
            </div>
          )}

          {school_id && (
            <div className="flex justify-between pb-4">
              <div className="text-gray-600">School ID:</div>
              <div className="font-semibold text-gray-800">{school_id}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
