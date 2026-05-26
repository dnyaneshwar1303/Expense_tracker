function ExpenseList({ expenses, setEditData }) {
  return (
    <>
      <h2>All Expenses</h2>

      {expenses?.map((item) => (
        <div key={item.expense_id}>
          <p>Name: {item.name}</p>
          <p>Amount: {item.amount}</p>
          <p>Date: {item.date}</p>
          <p>Description: {item.description}</p>

          <button
            onClick={() => setEditData(item)}
          >
            Edit
          </button>

          <hr />
        </div>
      ))}
    </>
  );
}

export default ExpenseList;