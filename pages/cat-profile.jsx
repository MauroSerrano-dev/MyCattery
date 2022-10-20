import { useState, useEffect } from "react";
import Link from 'next/link'

export default function catProfile() {
  const [cat, setCat] = useState()
  function getCat() {
    const options = {
      method: "GET",
      headers: { id: window.location.search.substring(1).split("=")[1] },
    };
    fetch("/api/cat", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.cat)
        setCat(response.cat)
        return
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getCat();
  }, []);

  if(!cat) {
    return <div>Loading screens</div>
  }

  return (
    <div className="catProfileReact">
      <h2>{`Profile ${cat.gender === "female" ? "da" : "do"} ${cat.name}`}</h2>
      <h2>{`Age: ${cat.age}`}</h2>
      <h2>{`Neutered: ${cat.neutered === "true" ? "Yes" : "No"}`}</h2>
      <h2>{`Color: ${cat.color}`}</h2>
      <h2>{`Personality: ${cat.personality}`}</h2>
      <img src={`/cats-photos/${cat.photo}`}/>
    </div>
  );
}
