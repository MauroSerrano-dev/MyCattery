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
  
  return (
    <div className="catProfileReact">
    </div>
  );
}
