import { useEffect, useState } from "react";
import api from "../services/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [editData, setEditData] = useState(null);

  const getExpenses = async () => {
    try {
      const res = await api.get("/getexpense");
      setExpenses(res.data.expenses);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <>
      <h1>Expense Tracker Dashboard</h1>

      <ExpenseForm
        getExpenses={getExpenses}
        editData={editData}
        setEditData={setEditData}
      />

      <ExpenseList
        expenses={expenses}
        setEditData={setEditData}
      />
    </>
  );
}

export default Dashboard;