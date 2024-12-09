import React, { createContext, useReducer, useEffect } from "react";

const ExpenseContext = createContext();

const initialState = {
    expenses: JSON.parse(localStorage.getItem("expenses")) || [],
    filters: { category: "", dateRange: [null, null], paymentMethod: "" },
};

const expenseReducer = (state, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
            return { ...state, expenses: [...state.expenses, action.payload] };
        case "EDIT_EXPENSE":
            const updatedExpenses = state.expenses.map((expense) =>
                expense.id === action.payload.id ? action.payload : expense
            );
            return { ...state, expenses: updatedExpenses };
        case "SET_FILTERS":
            return { ...state, filters: action.payload };
        default:
            return state;
    }
};

export const ExpenseProvider = ({ children }) => {
    const [state, dispatch] = useReducer(expenseReducer, initialState);

    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(state.expenses));
    }, [state.expenses]);

    return (
        <ExpenseContext.Provider value={{ state, dispatch }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export default ExpenseContext;
