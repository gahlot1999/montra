import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing/Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<p>Login</p>} />
        <Route path='/signup' element={<p>SignUp</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
