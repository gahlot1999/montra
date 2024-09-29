import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/home/Home';
import Landing from './pages/landing/Landing';
import Montra from './pages/montra/Montra';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/home' element={<Home />} />

          {/*//> MONTRA ROUTES */}
          <Route path='/montra' element={<Montra />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
