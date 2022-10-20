import { useState, useEffect } from "react"
import Link from 'next/link'

/* Icons */
import VaccinesIcon from '@mui/icons-material/Vaccines';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

export default function Stock() {
  const [stockAtual, setStockAtual] = useState("Food")
  const [food, setFood] = useState([])
  const [pills, setPills] = useState([])
  const [vaccines, setVaccines] = useState([])

  function attAllItems() {
    const options = { method: 'GET' };

    fetch('/api/stock', options)
      .then(response => response.json())
      .then(response => {
        setFood(response.items.filter(e => e.itemType === "food"))
        setPills(response.items.filter(e => e.itemType === "pills"))
        setVaccines(response.items.filter(e => e.itemType === "vaccines"))
        return
      })

      .catch(err => console.error(err));
  }


  useEffect(() => {
    attAllItems()
  }, []);

  return (
    <div className="StockReact">
      <h2>Stock {stockAtual}</h2>
      <div className="StockBody">
        <div className="StockMenu">
          <button onClick={() => setStockAtual("Food")}><LocalDiningIcon /></button>
          <button onClick={() => setStockAtual("Pills")}><MedicationIcon /></button>
          <button onClick={() => setStockAtual("Vaccines")}><VaccinesIcon /></button>
        </div>
        <div className="StockList">
          {stockAtual === "Food" && <div className="food">
            <div className="StockHeader">
              <span>Name</span>
              <span>Expiration date</span>
              <span>Quantity</span>
            </div>
            {food.map((item, i) =>
              <div key={`Item: ${i + 1}`}>
                <div className="itemInfos">
                  <span className="stockItemName">{item.nome}</span>
                  <span className="stockValidade">{item.validade}</span>
                  <span className="stockQuantidade">{item.quantidade}g
                  <div className="stockButtons">
                    <button className="stockButton">+</button>
                    <button className="stockButton">-</button>
                  </div></span>
                  
                </div>
              </div>)}
          </div>}
          {stockAtual === "Pills" && <div className="pills">
            {pills.map((item, i) =>
              <div key={`Item: ${i + 1}`}>
                <div className="itemInfos">
                  <span>{item.quantidade}</span>
                  <span>{item.validade}</span>
                </div>
              </div>)}
          </div>}
          {stockAtual === "Vaccines" && <div className="vaccines">
            {vaccines.map((item, i) =>
              <div key={`Item: ${i + 1}`}>
                <div className="itemInfos">
                  <span>{item.quantidade}</span>
                  <span>{item.validade}</span>
                </div>
              </div>)}
          </div>}
        </div>
      </div>
    </div>
  );
}

