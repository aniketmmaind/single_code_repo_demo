import { useEffect } from 'react'
import User from './Components/User'
import Organization from './Components/Organization';

function App() {
  useEffect(() => {
    console.log("Inside testUseEffect");

  }, []);

  return (
    <>
      <User name='Aniket'></User>
      <Organization />
    </>
  )
}

export default App
