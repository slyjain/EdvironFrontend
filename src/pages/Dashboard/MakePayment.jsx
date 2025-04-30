import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';

const MakePayment = () => {
    const [months, setMonths] = useState(1);
    const [schoolId, setSchoolId] = useState("");
    const [student, setStudent] = useState(null);
    const [schoolFee, setSchoolFee] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setSchoolId(user.school_id);
            setStudent({
                id: user._id,
                name: user.name,
                email: user.email,
            });
            fetchTransactions(user._id);
        }
    }, []);

    useEffect(() => {
        if (schoolId) {
            const fetchSchoolFee = async () => {
                try {
                    const response = await axios.get(`https://edvironbackend-iyr6.onrender.com/school/fee/${schoolId}`);
                    setSchoolFee(response.data.fee);
                } catch (err) {
                    console.error("Error fetching school fee:", err);
                }
            };
            fetchSchoolFee();
        }
    }, [schoolId]);

    useEffect(() => {
        setTotalAmount(schoolFee * months);
    }, [months, schoolFee]);

    const handleMonthChange = (e) => {
        setMonths(parseInt(e.target.value));
    };

    const handlePayClick = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                "https://edvironbackend-iyr6.onrender.com/payment/create-request",
                {
                    school_id: schoolId,
                    student_info: student,
                    amount: totalAmount.toString(),
                    months,
                    callback_url: "https://edviron-frontend-zeta.vercel.app/dashboard/payment/callback",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            const { collect_request_url, collect_request_id } = response.data;

            // Open payment in a new tab
            const paymentWindow = window.open(collect_request_url, "_blank");

            // Poll focus to detect when the payment tab is closed
            const checkInterval = setInterval(async () => {
                if (paymentWindow?.closed) {
                    clearInterval(checkInterval);

                    try {
                        // Step 1: Update transaction status
                        const txStatus = await axios.get(
                            `https://edvironbackend-iyr6.onrender.com/payment/transaction-status/${collect_request_id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );
                        console.log("Transaction status updated:", txStatus.data);

                        // Step 2: Call check-status endpoint
                        const statusCheck = await axios.post(
                            "https://edvironbackend-iyr6.onrender.com/payment/check-status",
                            {
                                collect_request_id,
                                school_id: schoolId,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );
                        console.log("Payment status checked:", statusCheck.data);

                    } catch (err) {
                        console.error("Error checking/updating payment status:", err);
                    }
                }
            }, 1000);

        } catch (err) {
            console.error("Error creating payment request:", err);
        }
    };

    const fetchTransactions = async (studentId) => {
        try {
            const response = await axios.get(`https://edvironbackend-iyr6.onrender.com/payment/transactions/${studentId}`);
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'success':
                return 'bg-green-100 text-green-700';
            case 'failed':
                return 'bg-red-100 text-red-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg max-w-xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Make a Payment</h2>

            <div className="space-y-4 mb-6">
                <div>
                    <label htmlFor="months" className="block text-gray-700 font-medium mb-1">Select number of months:</label>
                    <select
                        id="months"
                        value={months}
                        onChange={handleMonthChange}
                        className="w-full p-2 border rounded-md border-gray-300"
                    >
                        {[...Array(12)].map((_, index) => (
                            <option key={index} value={index + 1}>
                                {index + 1} Month{index === 0 ? '' : 's'}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="text-gray-700 space-y-1">
                    <p>Fee per month: <span className="font-semibold">₹{schoolFee}</span></p>
                    <p>Total Amount: <span className="font-semibold text-blue-600">₹{totalAmount}</span></p>
                </div>
            </div>

            <button
                onClick={handlePayClick}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Pay Now
            </button>

            {/* Previous Transactions */}
            <div className="mt-10">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Previous Payments</h3>
                {transactions.length === 0 ? (
                    <p className="text-gray-500 italic">No payments found.</p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {transactions.map((txn) => (
                            <li key={txn._id} className="py-4">
                                {console.log(txn)}
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-gray-800 font-medium">Amount: ₹{txn.amount}</p>
                                    <span className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(txn.status)}`}>
                                        {txn.status}
                                    </span>
                                </div>
                                {/* <p className="text-gray-600 text-sm">Months: {txn.months}</p> */}
                                <p className="text-gray-500 text-sm">
                                    {console.log(txn.payment_time)}
                                    Date: {txn.payment_time ? format(new Date(txn.payment_time), 'dd MMM yyyy, HH:mm') : 'Invalid Date'}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MakePayment;
