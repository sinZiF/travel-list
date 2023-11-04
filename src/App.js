import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems([...items, item])
  }

  return (
    <>
      <Logo />
      <Form items={items} onAddItems={handleAddItems}/>
      <PackingList />
    </>
  );
}

function Logo() {
  return (<div>
      <h1>🧳 far away 🚗</h1>
  </div>)
}

function Form({items, onAddItems}) {
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

function PackingList() {
  return (
    <div>

    </div>
  )
}
