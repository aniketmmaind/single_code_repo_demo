import { useEffect } from 'react'
import User from './Components/User'
import Organization from './Components/Organization';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import DemoForm from './Components/DemoForm';

function App() {

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to='/'>Dashboard</Link>
          {' | '}

          <Link to='organization'>Organization</Link>
          {' | '}

          <Link to='demo-form'>DemoForm</Link>
        </nav>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/organization' element={<Organization />} />
          <Route path='/demo-form' element={<DemoForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
