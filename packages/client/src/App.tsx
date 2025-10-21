import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState();

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return <p className='font-bold p-4 text-3xl'>{message}</p>;
}

export default App;
