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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        
        <h1 className="text-3xl font-bold text-center mb-6">
          Expense Tracker Dashboard
        </h1>

        <ExpenseForm
          getExpenses={getExpenses}
          editData={editData}
          setEditData={setEditData}
        />

        <div className="mt-8">
          <ExpenseList
            expenses={expenses}
            setEditData={setEditData}
          />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;