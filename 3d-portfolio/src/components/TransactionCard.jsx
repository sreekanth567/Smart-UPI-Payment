import formatDate from "../utils/formatDate";

export default function TransactionCard({ tx }) {
  return (
    <div className="card flex justify-between items-center mb-3">
      <div>
        <p className="font-semibold">
          {tx.receiver}
        </p>
        <p className="text-sm text-gray-500">
          {formatDate(tx.date)}
        </p>
      </div>

      <div className="text-right">
        <p className="font-bold">₹{tx.amount}</p>

        <span
          className={
            tx.status === "success"
              ? "success"
              : "failed"
          }
        >
          {tx.status}
        </span>
      </div>
    </div>
  );
}