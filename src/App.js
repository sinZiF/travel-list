import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems([...items, item])
  }
  function handleDelete(item) {
    if (!items) return;
    setItems((items) => items.filter(cur => cur.id !== item.id))
  }

  return (
    <>
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDelete={handleDelete}/>
    </>
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

function PackingList({items, onDelete}) {
  function Item() {
    if (!items) return;
    return(
      items.map(item =>
        <li key={item.id}>
          <input type="checkbox"></input>
          <span style={item.done ? {textDecoration: 'line-through'} : {}}>{item.quantity} {item.text}</span>
          <button onClick={() => {onDelete(item)}}>❌</button>
        </li>)
    )
  }

  return (
    <div className="list">
      <ul>
        <Item />
      </ul>
    </div>
  )
}
