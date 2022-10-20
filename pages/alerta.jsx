import { useEffect, useState } from "react";
import Image from "next/image"
import nekoAlert from "../public/icones/neko/Neko2-09.png"
import neko from "../public/icones/neko/Neko2-12.png"
import { Alert } from "@mui/material";

const ONE_PORTION = 150

export default function Alerta() {
  const [totalFood, setTotalFood] = useState(0)
  const [cats, setCats] = useState([])

  function getAllFood() {
    const options = { method: 'GET' };

    fetch('/api/stock', options)
      .then(response => response.json())
      .then(response => {
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
    getAllFood()
    getAllCats()
    const interval = setInterval(getAllFood, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="alerta">
      {Number((totalFood / (cats.length * ONE_PORTION)).toFixed(1)) <= 250 && <Alert className="alert" severity="warning">{Math.floor(totalFood / (cats.length * ONE_PORTION)) == 1 ? `Lembrete: Ficará sem ração no próximo dia.` : `Lembrete: Ficará sem ração em ${Math.floor(totalFood / (cats.length * ONE_PORTION))} dias.`}</Alert>}
      <Image src={Number((totalFood / (cats.length * ONE_PORTION)).toFixed(1)) <= 250 ? nekoAlert : neko} alt="neko" width="100px" height="100px" />
    </div>
  );
}