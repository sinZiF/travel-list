import {useState } from "react";
import Logo from "./component/Logo";
import Form from "./component/Form";
import PackingList from "./component/PackingList";
import Footer from "./component/Footer";

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
    const confirmed = window.confirm('Are you sure you want to delete all items?')
    if (confirmed) setItems([]);
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


