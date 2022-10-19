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
      <h2>Cats</h2>
      <div className="cats">
        {cats.map((cat, i) =>
          <div className="cat" key={`Cat: ${i + 1}`}>
            <img alt={`${cat.name} photo`} src={`/cats-photos/${cat.photo}`}></img>
            <div className="catInfos">
              <span>{cat.name}</span>
              <span>{cat.gender}</span>
              <span>{cat.age}</span>
            </div>
          </div>)}
      </div>
    </div>
  );
}
