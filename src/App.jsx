import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './components/notFound/NotFound';
import AddEditBudget from './features/budgets/AddEditBudget';
import Budget from './features/budgets/Budget';
import Budgets from './features/budgets/Budgets';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/home/Home';
import Landing from './pages/landing/Landing';
import Expense from './pages/montra/expense/Expense';
import Montra from './pages/montra/Montra';
import ErrorBoundary from './utils/ErrorBoundary';
import ParentOutlet from './utils/ParentOutlet';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<Home />} />

            {/*//> MONTRA ROUTES */}
            <Route path='/montra' element={<ParentOutlet />}>
              <Route index element={<Montra />} />
              <Route path=':mode' element={<AddEditBudget />} />
              <Route path='budgets' element={<Budgets />} />
              <Route path='budgets/budget' element={<Budget />} />
              <Route path='budgets/budget/:mode' element={<Expense />} />
            </Route>
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
