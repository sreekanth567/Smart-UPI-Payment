import { useState } from "react";
import { useApp } from "../context/AppContext";
import TransactionCard from "../components/TransactionCard";

export default function History() {
  const { transactions } = useApp();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((tx) => {
    const matchStatus =
      filter === "all" || tx.status === filter;

    const matchSearch = tx.receiver
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6">
      <input
        placeholder="Search receiver..."
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-3"
      />

      <div className="space-x-2 mb-4">
        {["all", "success", "failed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1 bg-purple-500 text-white rounded"
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p>No Transactions</p>
      ) : (
        filtered.map((tx) => (
          <TransactionCard key={tx.id} tx={tx} />
        ))
      )}
    </div>
  );
}