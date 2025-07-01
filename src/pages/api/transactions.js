let transactions = [
  {
    _id: '1',
    date: '2025-06-01',
    type: 'expense',
    category: 'Food',
    amount: 250,
    description: 'Lunch'
  },
  {
    _id: '2',
    date: '2025-06-05',
    type: 'income',
    category: 'Salary',
    amount: 10000,
    description: 'June Salary'
  }
];

export default function handler(req, res) {
  try {
    if (req.method === 'GET') {
      return res.status(200).json(transactions);
    }

    if (req.method === 'POST') {
      const { date, type, category, amount, description } = req.body;
      if (!date || !type || !category || !amount) {
        return res.status(400).json({ error: 'Missing fields' });
      }

      const newTransaction = {
        _id: Date.now().toString(),
        date,
        type,
        category,
        amount: parseFloat(amount),
        description: description || ''
      };

      transactions.push(newTransaction);
      return res.status(201).json(newTransaction);
    }

    if (req.method === 'PUT') {
      const { _id, date, type, category, amount, description } = req.body;
      const index = transactions.findIndex((t) => t._id === _id);
      if (index === -1) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      transactions[index] = {
        ...transactions[index],
        date,
        type,
        category,
        amount: parseFloat(amount),
        description
      };

      return res.status(200).json(transactions[index]);
    }

    if (req.method === 'DELETE') {
      const { _id } = req.body;
      const exists = transactions.find((t) => t._id === _id);
      if (!exists) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      transactions = transactions.filter((t) => t._id !== _id);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error (transactions):', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
