import React, { useState, useContext } from "react";
import ExpenseContext from "../context/ExpenseContext";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

const ExpenseForm = () => {
    const [open, setOpen] = useState(false);

    const { dispatch } = useContext(ExpenseContext);
    const [formData, setFormData] = useState({
        amount: "",
        description: "",
        date: "",
        category: "",
        paymentMethod: "cash",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.amount || !formData.date || !formData.category) {
            alert("Please fill all required fields");
            return;
        }
        dispatch({
            type: "ADD_EXPENSE",
            payload: { ...formData, id: Date.now() },
        });
        setFormData({ amount: "", description: "", date: "", category: "", paymentMethod: "cash" });
        setOpen(false); // Close the dialog after submission
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* Button to open the form */}
            <Button variant="contained" onClick={handleOpen}
                className="w-full bg-blue-400 hover:bg-blue-700">
                Add Expense
            </Button>

            {/* Dialog for the expense form */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} className="p-4 bg-white">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="number"
                                placeholder="Amount"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                className="border p-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                className="border p-2 rounded"
                            />
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="border p-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Category"
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                }
                                className="border p-2 rounded"
                            />
                            <select
                                value={formData.paymentMethod}
                                onChange={(e) =>
                                    setFormData({ ...formData, paymentMethod: e.target.value })
                                }
                                className="border p-2 rounded"
                            >
                                <option value="cash">Cash</option>
                                <option value="credit">Credit</option>
                            </select>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add Expense
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ExpenseForm;
