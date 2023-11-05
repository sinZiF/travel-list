import {useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems([...items, item])
  }
  function handleDelete(item) {
    setItems((items) => items.filter(cur => cur.id !== item))
  }
  function handleChecked(item) {
    setItems((items) => items.map(cur => cur.id === item ? {...cur, done: !cur.done} : cur));
  }
  function handleClearLisr() {
    setItems([])
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDelete={handleDelete} onChecked={handleChecked} onClearList={handleClearLisr} />
      <Footer items={items} />
    </div>
  );
}

function Logo() {
  return (<div>
      <h1>🧳 far away 🚗</h1>
  </div>)
}

function Form({onAddItems}) {
  const [quantity, setQuantity] = useState(1);
  const [text, setText] = useState('')

  // use input number
  function handleInputNumber(e) {
    setQuantity(Number(e.target.value))
  }

  function handleChangeInputFill(e) {
    setText(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    if(!text) return;

    const addItem = {
      quantity,
      text,
      done: false,
      id: new Date()
    }
    onAddItems(addItem);

    setQuantity(1);
    setText('')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😊 trip?</h3>
      <select value={quantity} onChange={handleInputNumber}>
        {Array.from({length: 10}).map((_, id) => <option key={id} value={id + 1}>{id + 1}</option>)}
      </select>
      <input onChange={handleChangeInputFill} value={text} type="text" placeholder="text"></input>
      <button>add</button>
    </form>
  )
}

function PackingList({items, onDelete, onChecked, onClearList}) {
  const [sortBy, setSortBy] = useState('input')
  let sortedItems;

  if (sortBy === 'input') sortedItems = items;
  if (sortBy === 'description') sortedItems = items.slice().sort(
    (a,b) => a.text.localeCompare(b.text)
  )
  if (sortBy === 'packed') sortedItems = items.slice().sort(
    (a,b) => Number(a.done) - Number(b.done)
  )

  function Item() {
    if (!items) return;
    return(
      sortedItems.map(item =>
        <li key={item.id}>
          <input onChange={() => onChecked(item.id)} type="checkbox" value={item.done} checked={item.done}></input>
          <span style={item.done ? {textDecoration: 'line-through'} : {}}>{item.quantity} {item.text}</span>
          <button onClick={() => {onDelete(item.id)}}>❌</button>
        </li>)
    )
  }

  return (
    <div className="list">
      <ul>
        <Item />
      </ul>
      <div>
      {/* filter section */}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value='input'>sort by input order</option>
        <option value='description'>sort by description</option>
        <option value='packed'>sort by packed status</option>
        </select>
        <button onClick={onClearList}>clear list</button>
      </div>
    </div>
  )
}

function Footer({items}) {
  const numItems = items.length;
  if(!numItems) {
    return(
      <p className="stats">Start edding some items to packing list 💫</p>
    )
  }
  const totalDone = items.reduce((acc, cur) => acc + (cur.done ? 1 : 0),  0);
  const alreadyProcent = Math.floor((100 / numItems) * totalDone);

  return(
    <footer className="stats">
        {alreadyProcent !== 100 ? `💼 You have ${numItems} items on your list, and you already packed ${totalDone} ${alreadyProcent || 0}% ` : 'You got everything! Ready to go 🧑‍✈️'}
    </footer>
  )
}
