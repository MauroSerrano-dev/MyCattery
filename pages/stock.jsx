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
  const [stock, setStock] = useState([])

  function attAllItems() {
    const options = { method: 'GET' };

    fetch('/api/stock', options)
      .then(response => response.json())
      .then(response => {
        setStock(response.items)
        setFood(response.items.filter(e => e.itemType === "food"))
        setPills(response.items.filter(e => e.itemType === "pills"))
        setVaccines(response.items.filter(e => e.itemType === "vaccines"))
        return
      })

      .catch(err => console.error(err));
  }


  async function updateStockFront(newItem) {
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemAtt: { newItem } }),
    };

    const response = await fetch("/api/stock", options);
    const json = await response.json();
  }

  function handleQuantChange(action, index) {
    const newQuantidade = action === "plus" ? String(Number(food[index].quantidade) + 1) : String(Number(food[index].quantidade) - 1)
    const obj = food[index]
    updateStockFront({...obj, quantidade: newQuantidade})
  }

  useEffect(() => {
    attAllItems()
  }, [food]);

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
                      <button onClick={() => handleQuantChange("plus", i)} className="stockButton">+</button>
                      <button onClick={() => handleQuantChange("less", i)} className="stockButton">-</button>
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

