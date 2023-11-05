export default function Footer({ items }) {
  const numItems = items.length;
  if (!numItems) {
    return (
      <p className="stats">Start edding some items to packing list 💫</p>
    );
  }
  const totalDone = items.reduce((acc, cur) => acc + (cur.done ? 1 : 0), 0);
  const alreadyProcent = Math.floor((100 / numItems) * totalDone);

  return (
    <footer className="stats">
      {alreadyProcent !== 100 ? `💼 You have ${numItems} items on your list, and you already packed ${totalDone} ${alreadyProcent || 0}% ` : 'You got everything! Ready to go 🧑‍✈️'}
    </footer>
  );
}
