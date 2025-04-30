import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const collectRequestId = searchParams.get("EdvironCollectRequestId");
  const paymentStatus = searchParams.get("status");

  useEffect(() => {
    const updateStatus = async () => {
      

      
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const school_id = userData?.school_id;
      console.log(collectRequestId, paymentStatus,school_id);
      if (!school_id) {
        console.error("School ID not found in localStorage user data");
        setStatus("INVALID");
        setLoading(false);
        return;
      }

      try {
        await axios.post("https://edvironbackend-iyr6.onrender.com/payment/update_collect_req", {
          EdvironCollectRequestId: collectRequestId,
          status: paymentStatus,
          school_id,
        });

        console.log("Query Params:", {
          collectRequestId,
          paymentStatus,
          school_id,
        });

        setStatus(paymentStatus);
      } catch (err) {
        console.error("Failed to update payment status", err);
        setStatus("ERROR");
      } finally {
        setLoading(false);
      }
    };

    if (collectRequestId && paymentStatus) {
      updateStatus();
    } else {
      console.log("Query Params:", {
        collectRequestId,
        paymentStatus,
      });

      setStatus("INVALID");
      setLoading(false);
    }
  }, [collectRequestId, paymentStatus]);

  if (loading) return <div className="p-6 text-center">Processing payment...</div>;

  return (
    <div className="p-6 text-center">
      {status === "SUCCESS" ? (
        <div className="text-green-600 text-xl font-semibold">Payment Successful!</div>
      ) : status === "FAILED" ? (
        <div className="text-red-600 text-xl font-semibold">Payment Failed.</div>
      ) : (
        <div className="text-gray-600 text-xl font-semibold">Invalid or Error in Payment Processing.</div>
      )}
    </div>
  );
};

export default PaymentCallback;
