import { useState, useEffect } from "react";
import Link from 'next/link'

export default function Cats() {
  const [cats, setCats] = useState([])

  function attAllCats() {
    const options = { method: 'GET' };

    fetch('/api/cats', options)
      .then(response => response.json())
      .then(response => setCats(response.cats))
      .catch(err => console.error(err));
  }
  useEffect(() => {
    attAllCats()
  }, []);

  return (
    <div className="CatsReact">
      <div className="cats">
        {cats?.map((cat, i) => <div key={`Cat: ${i + 1}`}>{cat.name}</div>)}
      </div>
    </div>
  );
}
