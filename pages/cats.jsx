import { useState, useEffect } from "react";
import Link from 'next/link'

/* Icons */

import { BsGenderFemale } from "react-icons/bs"
import { BsGenderMale } from "react-icons/bs"

export default function Cats() {
  const [cats, setCats] = useState([])
  const [search, setSearch] = useState("")

  function attAllCats() {
    const options = { method: 'GET' };

    fetch('/api/cats', options)
      .then(response => response.json())
      .then(response => setCats(response.cats.filter(cat => cat.name.toLowerCase().includes(search.toLowerCase()))))
      .catch(err => console.error(err));
  }
  useEffect(() => {
    attAllCats()
  }, [search]);

  return (
    <div className="CatsReact">
      <input type={"text"} onChange={(e) => setSearch(e.target.value)} />
      <h2>Cats</h2>
      <div className="cats">
        {cats.map((cat, i) =>
          <div className="cat" key={`Cat: ${i + 1}`}>
            <img alt={`${cat.name} photo`} src={`/cats-photos/${cat.photo}`}></img>
            <div className="catInfos">
              <span>{cat.name}</span>
              <span>{cat.gender === "female" ? <BsGenderFemale style={{ color: "#ff69b4" }} /> : <BsGenderMale style={{ color: "#00bfff" }} />}</span>
              <span>{cat.age}</span>
            </div>
          </div>)}
      </div>
    </div>
  );
}
