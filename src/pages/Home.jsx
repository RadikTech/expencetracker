import React from 'react'
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Filters from '../components/Filters';
import Charts from '../components/Charts';

const Home = () => {
    return (
        <div className="container mx-auto p-4">
            <ExpenseForm />
            <Filters otherClass="my-4" />
            <ExpenseList />
            <Charts />
        </div>
    );
}

export default Home