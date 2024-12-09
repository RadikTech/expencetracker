import React, { useContext } from "react";
import {
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import ExpenseContext from "../context/ExpenseContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const Charts = () => {
    const { state } = useContext(ExpenseContext);

    // Helper: Group expenses by month
    const groupByMonth = () => {
        const result = {};
        state.expenses.forEach((expense) => {
            const month = new Date(expense.date).toLocaleString("default", {
                month: "short",
            });
            result[month] = (result[month] || 0) + parseFloat(expense.amount);
        });
        return Object.entries(result).map(([month, total]) => ({
            month,
            total,
        }));
    };

    // Helper: Group expenses by category
    const groupByCategory = () => {
        const result = {};
        state.expenses.forEach((expense) => {
            result[expense.category] =
                (result[expense.category] || 0) + parseFloat(expense.amount);
        });
        return Object.entries(result).map(([category, total]) => ({
            category,
            total,
        }));
    };

    const monthlyData = groupByMonth();
    const categoryData = groupByCategory();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            <div className="bg-white shadow-md rounded-md p-4">
                <h2 className="text-lg font-semibold mb-4">Monthly Expense Comparison</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white shadow-md rounded-md p-4">
                <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={categoryData}
                            dataKey="total"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#82ca9d"
                            label
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Charts;
