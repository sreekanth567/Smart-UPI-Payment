import { useState } from "react";
import { useApp } from "../context/AppContext";
import { simulatePayment } from "../services/fakeApi";
import { v4 as uuid } from "uuid";

export default function SendMoney() {
  const { balance, setBalance, addTransaction } =
    useApp();

  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  const [errors, setErrors] = useState({});
  const [statusMsg, setStatusMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  /* VALIDATION */
  const validate = () => {
    const newErrors = {};
    const amt = Number(amount);

    if (!receiver.trim())
      newErrors.receiver = "Receiver required";

    else if (receiver.length < 3)
      newErrors.receiver =
        "Minimum 3 characters required";

    else if (!/^[a-zA-Z ]+$/.test(receiver))
      newErrors.receiver =
        "Only letters allowed";

    if (!amount)
      newErrors.amount = "Amount required";

    else if (amt <= 0)
      newErrors.amount = "Invalid amount";

    else if (amt > balance)
      newErrors.amount =
        "Insufficient balance";

    return newErrors;
  };

  const handleSend = async () => {
    setStatusMsg(null);

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const success = await simulatePayment();

    const tx = {
      id: uuid(),
      receiver,
      amount: Number(amount),
      date: new Date(),
      status: success ? "success" : "failed",
    };

    if (success) {
      setBalance((prev) => prev - Number(amount));

      setStatusMsg({
        type: "success",
        text: "Payment Successful",
      });
    } else {
      setStatusMsg({
        type: "error",
        text: "Payment Failed",
      });
    }

    addTransaction(tx);

    setReceiver("");
    setAmount("");
    setErrors({});
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 card">
      <h2 className="text-xl font-bold mb-4">
        Send Money
      </h2>

      {/* RECEIVER */}
      <input
        className={`border p-3 w-full rounded mb-1 ${
          errors.receiver
            ? "border-red-500"
            : ""
        }`}
        placeholder="Receiver Name"
        value={receiver}
        onChange={(e) => {
          setReceiver(e.target.value);
          setErrors({});
        }}
      />

      {errors.receiver && (
        <p className="text-red-500 text-sm mb-2">
          {errors.receiver}
        </p>
      )}

      {/* AMOUNT */}
      <input
        type="number"
        className={`border p-3 w-full rounded mb-1 ${
          errors.amount ? "border-red-500" : ""
        }`}
        placeholder="Amount"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          setErrors({});
        }}
      />

      {errors.amount && (
        <p className="text-red-500 text-sm mb-2">
          {errors.amount}
        </p>
      )}

      {/* STATUS MESSAGE */}
      {statusMsg && (
        <p
          className={
            statusMsg.type === "success"
              ? "text-green-600 mb-3"
              : "text-red-600 mb-3"
          }
        >
          {statusMsg.text}
        </p>
      )}

      <button
        onClick={handleSend}
        className="btn-pay"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}