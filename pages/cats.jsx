import { useState, useEffect } from "react";
import Link from 'next/link'

export default function Cats() {
  function getAllCats() {
    const options = { method: 'GET' };

    fetch('/api/cats', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }

  return (
    <div className="CatsReact">
      <button onClick={() => getAllCats()}></button>
    </div>
  );
}
