import { useState } from 'react';

export default function ExpenseTracker() {
  const [items, setItems] = useState([
    { id: 1, title: 'Кава', amount: 80 },
    { id: 2, title: 'Інтернет', amount: 300 }
  ]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [onlyExpensive, setOnlyExpensive] = useState(false);

  const addExpense = () => {
    if (!title || !amount) return;
    setItems([...items, { id: Date.now(), title, amount: Number(amount) }]);
    setTitle('');
    setAmount('');
  };

  const removeExpense = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearAll = () => setItems([]);

  // Похідні значення
  const total = items.reduce((sum, item) => sum + item.amount, 0);
  const visibleItems = onlyExpensive
    ? items.filter(item => item.amount > 200)
    : items;

  return (
    <div>
      <h2>Трекер витрат (React)</h2>

      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Назва" />
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Сума" />
      <button onClick={addExpense}>Додати</button>

      <label>
        <input
          type="checkbox"
          checked={onlyExpensive}
          onChange={e => setOnlyExpensive(e.target.checked)}
        />
        Показати тільки витрати &gt; 200 грн
      </label>

      {items.length === 0 ? (
        <p>Список витрат порожній</p>
      ) : (
        <>
          <ul>
            {visibleItems.map(item => (
              <li key={item.id}>
                {item.title} — {item.amount} грн
                <button onClick={() => removeExpense(item.id)}>×</button>
              </li>
            ))}
          </ul>
          <button onClick={clearAll}>Очистити все</button>
        </>
      )}

      <h3>Всього: {total} грн</h3>
      {total > 1000 && (
        <p style={{ color: 'red' }}>⚠️ Увага! Ви перевищили денний ліміт бюджету!</p>
      )}
    </div>
  );
}