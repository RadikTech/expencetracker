import React, { useState, useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Filters = ({ otherClass = '' }) => {
    const { dispatch } = useContext(ExpenseContext);

    const [filters, setFilters] = useState({
        category: "",
        paymentMethod: "",
        startDate: null,
        endDate: null,
    });

    const handleFilterChange = (field, value) => {
        const updatedFilters = { ...filters, [field]: value };
        setFilters(updatedFilters);

        // Dispatch updated filters to the context
        dispatch({ type: "SET_FILTERS", payload: updatedFilters });
    };

    return (
        <div className={`${otherClass} bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white shadow-lg rounded-md p-6`}>
            <h2 className="text-2xl font-semibold mb-4 text-center">Filters</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <input
                        type="text"
                        value={filters.category}
                        onChange={(e) => handleFilterChange("category", e.target.value)}
                        placeholder="Search by category"
                        className="w-full text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-800"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Payment Method</label>
                    <select
                        value={filters.paymentMethod}
                        onChange={(e) => handleFilterChange("paymentMethod", e.target.value)}
                        className="w-full border-2 text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-800"
                    >
                        <option value="">All</option>
                        <option value="cash">Cash</option>
                        <option value="credit">Credit</option>
                    </select>
                </div>

                {/* Date Range Filter */}
                <div>
                    <label className="block text-sm font-medium mb-2">Date Range</label>
                    <div className="flex gap-4">
                        <DatePicker
                            selected={filters.startDate}
                            onChange={(date) => handleFilterChange("startDate", date)}
                            placeholderText="Start Date"
                            className="w-full border-2 text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-800"
                        />
                        <DatePicker
                            selected={filters.endDate}
                            onChange={(date) => handleFilterChange("endDate", date)}
                            placeholderText="End Date"
                            className="w-full border-2 text-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-800"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;
