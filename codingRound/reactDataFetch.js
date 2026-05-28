import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos'
        );
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      {data && data?.map((item) => <div>{item.title}</div>)}
    </div>
  );
}
