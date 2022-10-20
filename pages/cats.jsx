import { useState, useEffect } from "react";
import Link from 'next/link'

/* Icons */

import { BsGenderFemale } from "react-icons/bs"
import { BsGenderMale } from "react-icons/bs"
import { BiSearchAlt } from "react-icons/bi"

export default function Cats() {
  const [cats, setCats] = useState([])
  const [search, setSearch] = useState("")
  const [editin, setEditin] = useState(false)
  const [nameImput, setNameImput] = useState("")
  const [genderImput, setQuantidadeImput] = useState("")
  const [ageImput, setValidadeImput] = useState("")

  function attAllCats() {
    const options = { method: 'GET' };

    fetch('/api/cats', options)
      .then(response => response.json())
      .then(response => setCats(response.cats.filter(cat => cat.name.toLowerCase().includes(search.toLowerCase()))))
      .catch(err => console.error(err));
  }

  function handleAddCat() {
    setEditin(false)
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nameImput, gender: genderImput, age: ageImput })
    };

    fetch('/api/cats', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

  }
  useEffect(() => {
    attAllCats()
  }, [search]);

  return (
    <div className="CatsReact">
      <div className="topMenuButtonsStock">
        <button onClick={() => setEditin(true)} className="addButton">Add New Cat +</button>
        <div className="contentInputSearchCats">
          <BiSearchAlt className="iconInputSearchCats" />
          <input className="inputSearchCats" type={"text"} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <h2>Cats</h2>
      <div className="cats">
        {cats.map((cat, i) =>
          <div className="cat" key={`Cat: ${i + 1}`}>
            <Link href={`/cat-profile?cat=${cat._id}`}>
              <a>
                <img alt={`${cat.name} photo`} src={`/cats-photos/${cat.photo}`} className="catImg"></img>
              </a>
            </Link>
            <div className="catInfos">
              <span>{cat.name}</span>
              <span>{cat.gender === "female" ? <BsGenderFemale style={{ color: "#ff69b4" }} /> : <BsGenderMale style={{ color: "#00bfff" }} />}</span>
              <span>{cat.age}</span>
            </div>
          </div>)}
      </div>
      {editin && <div className="addDiv">
        <div>
          <p>Name: </p>
          <input type={"text"} onChange={(e) => setNameImput(e.target.value)} />
        </div>
        <div>
          <p>Gender: </p>
          <input type={"text"} onChange={(e) => setValidadeImput(e.target.value)} />
        </div>
        <div>
          <p>Age: </p>
          <input type={"text"} onChange={(e) => setQuantidadeImput(e.target.value)} />
        </div>
        <div className="buttonsAddDiv">
          <button onClick={() => setEditin(false)} >Voltar</button>
          <button onClick={() => handleAddCat()} >Confirme</button>
        </div>
      </div>}
    </div>
  );
}
