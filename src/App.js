import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Header from './components/Header';
import Reports from './components/Reports';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/expenses" exact={true} element={<ExpenseList />} />
          <Route path="/reports" exact={true} element={<Reports />} />

          <Route path="*" exact={true} element={<Home />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
