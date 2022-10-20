import { useState, useEffect } from "react";
import Link from 'next/link'
import { getAllFoodKg } from "./stock";
import { Alert } from "@mui/material";
import Image from "next/image"
import nekoAlert from "../public/icones/neko/Neko2-09.png"
import Chart from "./chart";
const ONE_PORTION = 150

export default function Home() {
  const [isLogged, setIsLogged] = useState()
  const [totalFood, setTotalFood] = useState(0)
  const [food, setFood] = useState([])
  const [cats, setCats] = useState([])

  function getAllFood() {
    const options = { method: 'GET' };

    fetch('/api/stock', options)
      .then(response => response.json())
      .then(response => {
        setFood(response.items.filter(e => e.itemType === "food"))
        setTotalFood(
          response.items
            .filter(e => e.itemType === "food")
            .reduce((acc, oneFood) => acc + Number(oneFood.quantidade), 0))
        return
      })

      .catch(err => console.error(err));
  }
  function getAllCats() {
    const options = { method: 'GET' };

    fetch('/api/cats', options)
      .then(response => response.json())
      .then(response => {
        setCats(response.cats)
        return
      })

      .catch(err => console.error(err));
  }

  useEffect(() => {
    setIsLogged(localStorage.length > 0)
    getAllFood()
    getAllCats()
  }, []);

  return (
    <div className="DashboardReact">
      
      <div className="grafics">
      <div className="foodGrafic">
        <h2>Porções restantes: {(totalFood / ONE_PORTION).toFixed(1)}</h2>
        <h2>Dias de ração restantes: {(totalFood / (cats.length * ONE_PORTION)).toFixed(1)} dias</h2>
        <h2>Comida total: {(totalFood / 1000).toFixed(1)} Kg</h2>
      </div>
      <div className="chartGrafic">
        </div>
      </div>
      
    </div>
  );
}
