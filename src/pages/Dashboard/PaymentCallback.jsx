// pages/Dashboard/PaymentCallback.jsx
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
      console.log(collectRequestId, paymentStatus);
      try {
        await axios.post("http://localhost:3000/payment/update_collect_req", {
          EdvironCollectRequestId: collectRequestId,
          status: paymentStatus,
        });
        console.log("Query Params:", {
          collectRequestId,
          paymentStatus,
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
