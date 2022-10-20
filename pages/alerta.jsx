import { useEffect, useState } from "react";
import Image from "next/image"
import nekoAlert from "../public/icones/neko/Neko2-09.png"
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
      }, []);

    return (
    <div className="alerta">
        {Number((totalFood / (cats.length * ONE_PORTION)).toFixed(1)) < 7 && <Alert className="alert" severity="warning">Lembrete: Ficará sem ração nos próximos dias</Alert>}
        <Image src={nekoAlert} alt="neko" width="100px" height="100px"/>
    </div>
    );
  }