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
          `/addexpense/${user_id}`,
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
    <>
      <h2>
        {editData ? "Update Expense" : "Add Expense"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button>
          {editData ? "Update" : "Add"}
        </button>
      </form>
    </>
  );
}

export default ExpenseForm;
