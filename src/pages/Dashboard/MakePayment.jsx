import React, { useState, useEffect } from "react";
import axios from "axios";

const MakePayment = () => {
  const [months, setMonths] = useState(1);
  const [schoolId, setSchoolId] = useState(""); // Get this from localStorage or API
  const [schoolFee, setSchoolFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [collectRequestUrl, setCollectRequestUrl] = useState("");

  // Fetch the schoolId from localStorage (assuming it's stored there)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const schoolIdFromLocalStorage = user?.school_id || "";
    setSchoolId(schoolIdFromLocalStorage);
  }, []);

  // Fetch school fee from backend using the schoolId
  useEffect(() => {
    if (schoolId) {
      const fetchSchoolFee = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/school/fee/${schoolId}`);
          setSchoolFee(response.data.fee); // Assuming the fee is available in the response
        } catch (err) {
          console.error("Error fetching school fee:", err);
        }
      };

      fetchSchoolFee();
    }
  }, [schoolId]);

  // Update the total amount when months or school fee changes
  useEffect(() => {
    setTotalAmount(schoolFee * months);
  }, [months, schoolFee]);

  const handleMonthChange = (e) => {
    setMonths(parseInt(e.target.value)); // Ensure value is treated as a number
  };

  const handlePayClick = async () => {
    // Fetch the token from localStorage
    const token = localStorage.getItem("token"); // Make sure the token is stored in localStorage

    // Send payment request to the backend
    try {
      const response = await axios.post(
        "http://localhost:3000/payment/create-request", // Assuming backend endpoint for creating payment
        {
          school_id: schoolId,
          amount: totalAmount.toString(),
          months: months,
          callback_url: "http://localhost:3000/payment/callback" // Backend should handle JWT creation
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` // Fetching token from localStorage and using it in Authorization header
          }
        }
      );

      const { collect_request_url } = response.data;

      // Update the order status in your backend (you can do this in your backend once payment is requested)
    //   await axios.post("http://localhost:3000/orders", {
    //     collect_request_id: response.data.collect_request_id,
    //     status: "pending",
    //     collect_request_url: collect_request_url,
    //   });

      // Open the payment link in a new tab
      window.open(collect_request_url, "_blank");

    } catch (err) {
      console.error("Error creating payment request:", err);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Make Payment</h2>

      {/* Select number of months */}
      <div className="mb-4">
        <label htmlFor="months" className="block text-gray-600">Select number of months:</label>
        <select
          id="months"
          value={months}
          onChange={handleMonthChange}
          className="mt-2 w-full p-2 border rounded-md border-gray-300"
        >
          {[...Array(12)].map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1} Month{index === 0 ? '' : 's'}
            </option>
          ))}
        </select>
      </div>

      {/* Displaying the Fee and Total */}
      <div className="mb-4">
        <p className="text-gray-600">Fee per month: <span className="font-semibold">${schoolFee}</span></p>
        <p className="text-gray-600">Total Amount: <span className="font-semibold">${totalAmount}</span></p>
      </div>

      {/* Payment button */}
      <button
        onClick={handlePayClick}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Pay Now
      </button>
    </div>
  );
};

export default MakePayment;
