import { useState, useEffect } from "react";
import Link from 'next/link'
import { getAllFoodKg } from "./stock";
import { Alert } from "@mui/material";
import Image from "next/image"
import nekoAlert from "../public/icones/neko/Neko2-09.png"
import Chart from "./chart";
import { MyResponsiveBar } from "./graphic";
import { MyResponsiveBarPills } from "./graphicPills";
const ONE_PORTION = 150

export default function Home() {
  const [isLogged, setIsLogged] = useState()
  const [totalFood, setTotalFood] = useState(0)
  const [food, setFood] = useState([])
  const [pills, setPills] = useState([])
  const [cats, setCats] = useState([])

  function getAllFood() {
    const options = { method: 'GET' };

    fetch('/api/stock', options)
      .then(response => response.json())
      .then(response => {
        setPills(response.items.filter(e => e.itemType === "pills"))
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
          <MyResponsiveBar data={[{
            "Type": "Food(kg)",
            "Neutered Satiety": food.filter(oneFood => oneFood.nome.includes("Neutered Satiety")).reduce((acc, elem) => acc + Number(elem.quantidade), 0) / 1000,
            "hot dogColor": "hsl(119, 70%, 50%)",
            "Satiety Weight Management": food.filter(oneFood => oneFood.nome.includes("Satiety Weight Management")).reduce((acc, elem) => acc + Number(elem.quantidade), 0) / 1000,
            "burgerColor": "hsl(328, 70%, 50%)",
            "Growth": food.filter(oneFood => oneFood.nome.includes("Growth")).reduce((acc, elem) => acc + Number(elem.quantidade), 0) / 1000,
            "sandwichColor": "hsl(292, 70%, 50%)",
            "Weaning": food.filter(oneFood => oneFood.nome.includes("Weaning")).reduce((acc, elem) => acc + Number(elem.quantidade), 0) / 1000,
            "kebabColor": "hsl(73, 70%, 50%)",
            "Diabetic": food.filter(oneFood => oneFood.nome.includes("Diabetic")).reduce((acc, elem) => acc + Number(elem.quantidade), 0) / 1000,
            "friesColor": "hsl(332, 70%, 50%)",
            "Renal": food.filter(oneFood => oneFood.nome.includes("Renal")).reduce((acc, elem) => acc + Number(elem.quantidade), 0) / 1000,
            "donutColor": "hsl(277, 70%, 50%)"
          }]} />
          {pills.length > 0 && 
          <MyResponsiveBarPills data={[{
            "Type": "Pills",
            "Milpro": Number(pills.find(onepills => onepills.nome === "Milpro").quantidade),
            "hot dogColor": "hsl(119, 70%, 50%)",
            "Acticam": Number(pills.find(onepills => onepills.nome === "Acticam").quantidade),
            "burgerColor": "hsl(328, 70%, 50%)",
            "Cerenia": Number(pills.find(onepills => onepills.nome === "Cerenia").quantidade),
            "sandwichColor": "hsl(292, 70%, 50%)",
            "Propalin": Number(pills.find(onepills => onepills.nome === "Propalin").quantidade),
            "kebabColor": "hsl(73, 70%, 50%)",
            "Vectra 3D": Number(pills.find(onepills => onepills.nome === "Vectra 3D").quantidade),
            "friesColor": "hsl(332, 70%, 50%)",
            "Amodip 1.25": Number(pills.find(onepills => onepills.nome === "Amodip 1.25").quantidade),
            "donutColor": "hsl(277, 70%, 50%)"
          }]} />
          }
        </div>
      </div>
    </div>
  );
}
