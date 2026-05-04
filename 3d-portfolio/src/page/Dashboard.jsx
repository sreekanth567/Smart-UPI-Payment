import { useApp } from "../context/AppContext";
import TransactionCard from "../components/TransactionCard";

export default function Dashboard() {
  const { user, balance, transactions } = useApp();

  return (
    <div>
      {/* Header */}
      <div className="phonepe-bg text-white p-6">
        <h2 className="text-xl">Hello, {user?.name}</h2>
        <p className="text-3xl font-bold mt-2">
          ₹ {balance}
        </p>
        <p>Available Balance</p>
      </div>

      {/* Quick Actions */}
      <div className="p-5">
        <h3 className="font-semibold mb-3">
          Recent Transactions
        </h3>

        {transactions.length === 0 && (
          <p className="text-gray-500">
            No Transactions Yet
          </p>
        )}

        {transactions.slice(0, 5).map((tx) => (
          <TransactionCard key={tx.id} tx={tx} />
        ))}
      </div>
    </div>
  );
}