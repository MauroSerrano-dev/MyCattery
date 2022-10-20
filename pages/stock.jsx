import { useState, useEffect } from "react"
import Link from 'next/link'

/* Icons */
import VaccinesIcon from '@mui/icons-material/Vaccines';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { BiSearchAlt } from "react-icons/bi"
import {HiTrash} from "react-icons/hi"

export default function Stock() {
  const [stockAtual, setStockAtual] = useState("Food")
  const [food, setFood] = useState([])
  const [pills, setPills] = useState([])
  const [vaccines, setVaccines] = useState([])
  const [stock, setStock] = useState([])
  const [search, setSearch] = useState("")
  const [editin, setEditin] = useState(false)
  const [nameImput, setNameImput] = useState("")
  const [quantidadeImput, setQuantidadeImput] = useState("")
  const [validadeImput, setValidadeImput] = useState("")


  function attAllItems() {
    const options = { method: 'GET' };

    fetch('/api/stock', options)
      .then(response => response.json())
      .then(response => {
        setStock(response.items)
        setFood(response.items.filter(e => e.itemType === "food").filter(item => item.nome.toLowerCase().includes(search.toLowerCase())))
        setPills(response.items.filter(e => e.itemType === "pills").filter(item => item.nome.toLowerCase().includes(search.toLowerCase())))
        setVaccines(response.items.filter(e => e.itemType === "vaccines").filter(item => item.nome.toLowerCase().includes(search.toLowerCase())))
        return
      })

      .catch(err => console.error(err));
  }
  useEffect(() => {
    attAllItems()
  }, [search]);

  async function updateStockFront(newItem) {
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemAtt: { newItem } }),
    };

    const response = await fetch("/api/stock", options);
    const json = await response.json();
  }

  function handleQuantChange(action, index, type) {
    const newQuantidade = type === "food"
      ? (action === "plus" ? String(Number(food[index].quantidade) + 150) : String(Number(food[index].quantidade) - 150))
      : (type === "pills"
        ? (action === "plus" ? String(Number(pills[index].quantidade) + 1) : String(Number(pills[index].quantidade) - 1))
        : (action === "plus" ? String(Number(vaccines[index].quantidade) + 1) : String(Number(vaccines[index].quantidade) - 1))
      )
    const obj = type === "food" ? food[index] : (type === "pills" ? pills[index] : vaccines[index])
    console.log(obj)
    updateStockFront({ ...obj, quantidade: newQuantidade })
  }

  function handleAddItem() {
    setEditin(false)
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemType: stockAtual.toLowerCase(), nome: nameImput, quantidade: quantidadeImput, validade: validadeImput })
    };

    fetch('/api/stock', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

  }
  function handleDeleteItem(id) {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id })
    };

    fetch('/api/stock', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
  useEffect(() => {
    attAllItems()
  }, [food, pills, vaccines]);

  useEffect(() => {
    attAllItems()
    setEditin(false)
  }, []);

  return (
    <div className="StockReact">
      <div className="topMenuButtonsStock">
        <button onClick={() => setEditin(true)} className="addButton">{`Add New ${stockAtual === "Food" ? stockAtual : stockAtual.slice(0, stockAtual.length - 1)} +`}</button>
        <div className="contentInputSearchCats">
          <BiSearchAlt className="iconInputSearchCats" />
          <input className="inputSearchCats" type={"text"} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <h2>{stockAtual} Stock</h2>
      <div className="StockBody">
        <div className="StockMenu">
          <button onClick={() => setStockAtual("Food")}><LocalDiningIcon fontSize="large" className="iconStock" /></button>
          <button onClick={() => setStockAtual("Pills")}><MedicationIcon fontSize="large" className="iconStock" /></button>
          <button onClick={() => setStockAtual("Vaccines")}><VaccinesIcon fontSize="large" className="iconStock" /></button>
        </div>
        <div className="StockList">
          {stockAtual === "Food" && <div className="food">
            <div className="StockHeader">
              <span>Name</span>
              <span>Expiration date</span>
              <span>Quantity</span>
            </div>
            {food.map((item, i) =>
              <div style={i % 2 === 0 ? { backgroundColor: "#975C22", color: "#F8F6F0" } : { backgroundColor: "#F8F6F0", color: "#975C22" }} key={`Item: ${i + 1}`}>
                <div className="itemInfos">
                  <span className="stockItemName">{item.nome}</span>
                  <span className="stockValidade">{item.validade}</span>
                  <span className="stockQuantidade">{item.quantidade}g</span>
                  <div className="stockButtons">
                    <button onClick={() => handleQuantChange("plus", i, "food")} className="stockButton">+</button>
                    <button onClick={() => handleQuantChange("less", i, "food")} className="stockButton">-</button>
                  </div>
                  <button onClick={() => handleDeleteItem(item._id)} className="stockButton deleteItem"><HiTrash /></button>
                </div>
              </div>)}
          </div>}
          {stockAtual === "Pills" && <div className="pills">
            <div className="StockHeader">
              <span>Name</span>
              <span>Validade</span>
              <span>Quantidadee</span>
            </div>
            {pills.map((item, i) =>
              <div style={i % 2 === 0 ? { backgroundColor: "#975C22", color: "#F8F6F0" } : { backgroundColor: "#F8F6F0", color: "#975C22" }} key={`Item: ${i + 1}`}>
                <div className="itemInfos">
                  <span className="stockItemName">{item.nome}</span>
                  <span className="stockValidade">{item.validade}</span>
                  <span className="stockQuantidade">{item.quantidade}</span>
                  <div className="stockButtons">
                    <button onClick={() => handleQuantChange("plus", i, "pills")} className="stockButton">+</button>
                    <button onClick={() => handleQuantChange("less", i, "pills")} className="stockButton">-</button>
                  </div>
                  <button onClick={() => handleDeleteItem(item._id)} className="stockButton deleteItem"></button>
                </div>
              </div>)}
          </div>}
          {stockAtual === "Vaccines" && <div className="vaccines">
            <div className="StockHeader">
              <span>Name</span>
              <span>Validade</span>
              <span>Quantidadee</span>
            </div>
            {vaccines.map((item, i) =>
              <div style={i % 2 === 0 ? { backgroundColor: "#975C22", color: "#F8F6F0" } : { backgroundColor: "#F8F6F0", color: "#975C22" }} key={`Item: ${i + 1}`}>
                <div className="itemInfos">
                  <span className="stockItemName">{item.nome}</span>
                  <span className="stockValidade">{item.validade}</span>
                  <span className="stockQuantidade">{item.quantidade}</span>
                  <div className="stockButtons">
                    <button onClick={() => handleQuantChange("plus", i, "vaccines")} className="stockButton">+</button>
                    <button onClick={() => handleQuantChange("less", i, "vaccines")} className="stockButton">-</button>
                  </div>
                  <button onClick={() => handleDeleteItem(item._id)} className="stockButton deleteItem"></button>
                </div>
              </div>)}
          </div>}
        </div>
      </div>
      {editin && <div className="addDiv">
        <div>
          <p>Name: </p>
          <input type={"text"} onChange={(e) => setNameImput(e.target.value)} />
        </div>
        <div>
          <p>Expiration date: </p>
          <input type={"text"} onChange={(e) => setValidadeImput(e.target.value)} />
        </div>
        <div>
          <p>Quantity: </p>
          <input type={"text"} onChange={(e) => setQuantidadeImput(e.target.value)} />
        </div>
        <div className="buttonsAddDiv">
          <button onClick={() => setEditin(false)} >Voltar</button>
          <button onClick={() => handleAddItem()} >Confirme</button>
        </div>
      </div>}
    </div>
  );
}

