import { useEffect, useState } from "react";
import api from "../services/api";

function ExpenseForm({ getExpenses, editData, setEditData }) {

  const [form, setForm] = useState({
    name: "",
    amount: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name,
        amount: editData.amount,
        date: editData.date.split("T")[0],
        description: editData.description,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editData) {
        await api.put(
          `/updateexpense/${editData.expense_id}`,
          form
        );

        alert("Expense updated");
        setEditData(null);

      } else {

        await api.post(
          `/addexpense`,
          form
        );

        alert("Expense added");
      }

      setForm({
        name: "",
        amount: "",
        date: "",
        description: "",
      });

      getExpenses();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-50 p-5 rounded-lg shadow">
      
      <h2 className="text-2xl font-semibold mb-4">
        {editData ? "Update Expense" : "Add Expense"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button className="bg-black text-white p-2 rounded">
          {editData ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
