import { useState } from "react";

export default function PackingList({ items, onDelete, onChecked, onClearList }) {
  const [sortBy, setSortBy] = useState('input');
  let sortedItems;

  if (sortBy === 'input') sortedItems = items;
  if (sortBy === 'description') sortedItems = items.slice().sort(
    (a, b) => a.text.localeCompare(b.text)
  );
  if (sortBy === 'packed') sortedItems = items.slice().sort(
    (a, b) => Number(a.done) - Number(b.done)
  );

  function Item() {
    if (!items) return;
    return (
      sortedItems.map(item => <li key={item.id}>
        <input onChange={() => onChecked(item.id)} type="checkbox" value={item.done} checked={item.done}></input>
        <span style={item.done ? { textDecoration: 'line-through' } : {}}>{item.quantity} {item.text}</span>
        <button onClick={() => { onDelete(item.id); }}>❌</button>
      </li>)
    );
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
  );
}
