import React, { useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";

const Reports = () => {
    const { state } = useContext(ExpenseContext);

    // Calculate total expenses
    const totalExpenses = state.expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

    // Calculate total expenses by payment method
    const totalCash = state.expenses.filter((expense) => expense.paymentMethod === "cash")
        .reduce((total, expense) => total + parseFloat(expense.amount), 0);

    const totalCredit = state.expenses.filter((expense) => expense.paymentMethod === "credit")
        .reduce((total, expense) => total + parseFloat(expense.amount), 0);

    return (
        <div className="p-6 bg-white shadow-md rounded-md mt-6 mx-4 sm:mx-8">
            <h2 className="text-2xl font-semibold mb-4">Expense Reports</h2>
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-semibold">Total Expenses</h3>
                    <p className="text-lg">₹ {totalExpenses.toFixed(2)}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Cash Expenses</h3>
                    <p className="text-lg">₹ {totalCash.toFixed(2)}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Credit Expenses</h3>
                    <p className="text-lg">₹ {totalCredit.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default Reports;
