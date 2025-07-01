let dummyBudgets = [
  { id: 1, category: 'Food', amount: 10000, spent: 3000 },
  { id: 2, category: 'Entertainment', amount: 5000, spent: 1500 },
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(dummyBudgets);
  }

  if (req.method === 'POST') {
    const newBudget = { id: Date.now(), ...req.body };
    dummyBudgets.push(newBudget);
    return res.status(201).json(newBudget);
  }

  if (req.method === 'PUT') {
    const { id, category, amount, spent } = req.body;
    const budget = dummyBudgets.find(b => b.id === id);
    if (!budget) return res.status(404).json({ error: 'Budget not found' });
    if (category !== undefined) budget.category = category;
    if (amount !== undefined) budget.amount = amount;
    if (spent !== undefined) budget.spent = spent;
    return res.status(200).json(budget);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    dummyBudgets = dummyBudgets.filter(b => b.id !== id);
    return res.status(200).json({ success: true });
  }

  return res.status(405).end();
}
