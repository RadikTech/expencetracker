import React, { useContext, useState } from "react";
import ExpenseContext from "../context/ExpenseContext";
import EditIcon from "../Icons/EditIcon";
import CancelIcon from "../Icons/CancelIcon";
import SaveIcon from "../Icons/SaveIcon";

const ExpenseList = () => {
    const { state, dispatch } = useContext(ExpenseContext);

    // Local state for editing expenses
    const [editExpenseId, setEditExpenseId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        amount: "",
        description: "",
        date: "",
        category: "",
        paymentMethod: "",
    });

    // Start editing an expense
    const handleEdit = (expense) => {
        setEditExpenseId(expense.id);
        setEditFormData({ ...expense });
    };

    // Handle form data change
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Save edited expense
    const handleEditSave = () => {
        dispatch({ type: "EDIT_EXPENSE", payload: editFormData });
        setEditExpenseId(null); // Exit edit mode
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditExpenseId(null);
    };

    // Apply filters to the expense list
    const filteredExpenses = state?.expenses?.filter((expense) => {
        const { category, paymentMethod, dateRange } = state.filters;

        // Category filter
        if (category && !expense.category.toLowerCase().includes(category.toLowerCase())) {
            return false;
        }

        // Payment method filter
        if (paymentMethod && expense.paymentMethod !== paymentMethod) {
            return false;
        }

        // Date range filter
        const expenseDate = new Date(expense.date);
        try{
        if (
            dateRange[0] &&
            dateRange[1] &&
            (expenseDate < new Date(dateRange[0]) || expenseDate > new Date(dateRange[1]))
        ) {
            return false;
        }
    }catch(e){}
        return true;
    });

    return (
        <table className="w-full border-collapse">
            <thead>
                <tr>
                    <th className="border p-2">Amount</th>
                    <th className="border p-2">Description</th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Category</th>
                    <th className="border p-2">Payment Method</th>
                    <th className="border p-2">Actions</th>
                </tr>
            </thead>
            
            <tbody>
                {filteredExpenses?.map((expense) => (
                    <tr key={expense.id}>
                        {editExpenseId === expense.id ? (
                            <>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        name="amount"
                                        value={editFormData.amount}
                                        onChange={handleEditChange}
                                        className="border p-1 rounded w-full"
                                    />
                                </td>

                                <td className="border p-2">
                                    <input
                                        type="text"
                                        name="description"
                                        value={editFormData.description}
                                        onChange={handleEditChange}
                                        className="border p-1 rounded w-full"
                                    />
                                </td>

                                <td className="border p-2">
                                    <input
                                        type="date"
                                        name="date"
                                        value={editFormData.date}
                                        onChange={handleEditChange}
                                        className="border p-1 rounded w-full"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        name="category"
                                        value={editFormData.category}
                                        onChange={handleEditChange}
                                        className="border p-1 rounded w-full"
                                    />
                                </td>
                                <td className="border p-2">
                                    <select
                                        name="paymentMethod"
                                        value={editFormData.paymentMethod}
                                        onChange={handleEditChange}
                                        className="border p-1 rounded w-full"
                                    >
                                        <option value="cash">Cash</option>
                                        <option value="credit">Credit</option>
                                    </select>
                                </td>
                                <td className="flex border p-2">
                                    <button
                                        onClick={handleEditSave}
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        <SaveIcon />
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="bg-gray-500 text-white px-2 py-1 rounded"
                                    >
                                        <CancelIcon width={15} height={15}/>
                                    </button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td className="border p-2 text-center">{expense.amount}</td>
                                <td className="border p-2 text-center">{expense.description}</td>
                                <td className="border p-2 text-center">{expense.date}</td>
                                <td className="border p-2 text-center">{expense.category}</td>
                                <td className="border p-2 text-center">{expense.paymentMethod}</td>
                                <td className="border p-2 text-center">
                                    <button
                                        onClick={() => handleEdit(expense)}
                                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        <EditIcon />
                                    </button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ExpenseList;
