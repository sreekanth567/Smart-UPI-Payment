import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(10000);
  const [transactions, setTransactions] = useState([]);

  // LOAD DATA
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedBalance = localStorage.getItem("balance");
    const storedTx = localStorage.getItem("transactions");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedBalance) setBalance(JSON.parse(storedBalance));
    if (storedTx) setTransactions(JSON.parse(storedTx));
  }, []);

  // SAVE DATA
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("balance", JSON.stringify(balance));
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [user, balance, transactions]);

  // AUTH
  const login = (username) => {
    const fakeToken = "jwt_" + Date.now();
    localStorage.setItem("token", fakeToken);
    setUser({ name: username });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  // ADD TRANSACTION
  const addTransaction = (tx) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        balance,
        setBalance,
        transactions,
        addTransaction,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);