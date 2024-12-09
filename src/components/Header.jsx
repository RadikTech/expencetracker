import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white py-6">
            <div className="container mx-auto flex justify-between items-center px-4 sm:px-8">
                <div className="flex items-center">
                    <Link to="/">
                        <h1 className="text-3xl font-bold">Expense Tracker</h1>
                    </Link>
                </div>

                <nav className="space-x-6">
                    <Link to="/" className="text-lg hover:text-black">Home</Link>
                    <Link to="/expenses" className="text-lg hover:text-black">Expenses</Link>
                    <Link to="/reports" className="text-lg hover:text-black">Reports</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
