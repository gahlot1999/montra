import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Budget from './features/budgets/Budget';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/home/Home';
import Landing from './pages/landing/Landing';
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
              <Route path='budget' element={<Budget />} />
            </Route>
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
