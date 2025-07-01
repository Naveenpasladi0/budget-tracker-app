let categories = [
    { id: '1', name: 'Food', type: 'expense', predefined: true },
    { id: '2', name: 'Transport', type: 'expense', predefined: true },
    { id: '3', name: 'Salary', type: 'income', predefined: true },
    { id: '4', name: 'Rent', type: 'expense', predefined: true },
  ];
  
  let nextId = 5;
  
  export default function handler(req, res) {
    if (req.method === 'GET') {
      return res.status(200).json(categories);
    }
  
    if (req.method === 'POST') {
      const { name, type } = req.body;
  
      if (!name || !type || (type !== 'income' && type !== 'expense')) {
        return res.status(400).json({ error: 'Invalid data' });
      }
  
      const newCategory = {
        id: String(nextId++),
        name,
        type,
        predefined: false,
      };
  
      categories.push(newCategory);
      return res.status(201).json(newCategory);
    }
  
    if (req.method === 'PUT') {
        const { id, name, type } = req.body;
        const cat = categories.find(c => c.id === id);
      
        if (!cat) return res.status(404).json({ error: 'Category not found' });
      
        if (name) cat.name = name;
        if (type === 'expense' || type === 'income') cat.type = type;
      
        return res.status(200).json(cat);
      }
  
    if (req.method === 'DELETE') {
      const { id } = req.body;
      categories = categories.filter(c => c.id !== id || c.predefined);
      return res.status(200).json({ success: true });
    }
  
    return res.status(405).end();
  }