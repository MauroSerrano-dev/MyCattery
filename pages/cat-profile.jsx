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
      <img src={`/cats-photos/${cat.photo}`} className="catFoto"/>
      <div className="catDesc">
      <h2 className="catName">{`Profile ${cat.gender === "female" ? "da" : "do"} ${cat.name}`}</h2>
      <h2 className="catFeatures">{`Age: ${cat.age}`}</h2>
      <h2 className="catFeatures">{`Neutered: ${cat.neutered === "true" ? "Yes" : "No"}`}</h2>
      <h2 className="catFeatures">{`Color: ${cat.color}`}</h2>
      <h2 className="catFeatures">{`Personality: ${cat.personality}`}</h2>
      </div>
    </div>
  );
}
