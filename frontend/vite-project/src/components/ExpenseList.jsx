function ExpenseList({ expenses, setEditData }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        All Expenses
      </h2>

      <div className="flex flex-col gap-4">
        {expenses?.map((item) => (
          <div
            key={item.expense_id}
            className="bg-gray-50 p-4 rounded-lg shadow"
          >
            <p>
              <span className="font-semibold">
                Name:
              </span>{" "}
              {item.name}
            </p>

            <p>
              <span className="font-semibold">
                Amount:
              </span>{" "}
              ₹{item.amount}
            </p>

            <p>
              <span className="font-semibold">
                Date:
              </span>{" "}
              {item.date.split("T")[0]}
            </p>

            <p>
              <span className="font-semibold">
                Description:
              </span>{" "}
              {item.description}
            </p>

            <button
              onClick={() => setEditData(item)}
              className="mt-3 bg-black text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;