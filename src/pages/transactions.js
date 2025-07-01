import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    type: 'expense',
    category: '',
    amount: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editTransaction, setEditTransaction] = useState({});

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const res = await axios.get('/api/transactions');
      setTransactions(res.data);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Add new transaction
  const handleAddTransaction = async () => {
    try {
      const res = await axios.post('/api/transactions', newTransaction);
      setTransactions([...transactions, res.data]);
      setNewTransaction({
        date: '',
        type: 'expense',
        category: '',
        amount: '',
        description: ''
      });
    } catch (err) {
      console.error('Failed to add transaction:', err);
    }
  };

  // Start editing
  const handleEdit = (t) => {
    setEditingId(t._id);
    setEditTransaction({ ...t });
  };

  // Save edit
  const handleSave = async () => {
    try {
      const res = await axios.put('/api/transactions', editTransaction);
      setTransactions(
        transactions.map((t) => (t._id === res.data._id ? res.data : t))
      );
      setEditingId(null);
      setEditTransaction({});
    } catch (err) {
      console.error('Failed to save transaction:', err);
    }
  };

  // Delete
  const handleDelete = async (_id) => {
    try {
      await axios.delete('/api/transactions', { data: { _id } });
      setTransactions(transactions.filter((t) => t._id !== _id));
    } catch (err) {
      console.error('Failed to delete transaction:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Transactions</h1>

      {/* Add Transaction Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Transaction</h2>
        <div className="flex flex-wrap gap-4">
          <input
            type="date"
            className="border p-2 rounded w-40"
            value={newTransaction.date}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, date: e.target.value })
            }
          />
          <select
            className="border p-2 rounded w-32"
            value={newTransaction.type}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, type: e.target.value })
            }
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            type="text"
            placeholder="Category"
            className="border p-2 rounded w-40"
            value={newTransaction.category}
            onChange={(e) =>
              setNewTransaction({ ...newTransaction, category: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Amount"
            className="border p-2 rounded w-28"
            value={newTransaction.amount}
            onChange={(e) =>
              setNewTransaction({
                ...newTransaction,
                amount: parseFloat(e.target.value) || ''
              })
            }
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 rounded flex-1"
            value={newTransaction.description}
            onChange={(e) =>
              setNewTransaction({
                ...newTransaction,
                description: e.target.value
              })
            }
          />
          <button
            onClick={handleAddTransaction}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">All Transactions</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions available.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border-b">Date</th>
                <th className="p-2 border-b">Type</th>
                <th className="p-2 border-b">Category</th>
                <th className="p-2 border-b">Amount</th>
                <th className="p-2 border-b">Description</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t._id} className="hover:bg-gray-50">
                  {editingId === t._id ? (
                    <>
                      <td className="p-2 border-b">
                        <input
                          type="date"
                          value={editTransaction.date}
                          onChange={(e) =>
                            setEditTransaction({
                              ...editTransaction,
                              date: e.target.value
                            })
                          }
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="p-2 border-b">
                        <select
                          value={editTransaction.type}
                          onChange={(e) =>
                            setEditTransaction({
                              ...editTransaction,
                              type: e.target.value
                            })
                          }
                          className="border p-1 rounded w-full"
                        >
                          <option value="expense">Expense</option>
                          <option value="income">Income</option>
                        </select>
                      </td>
                      <td className="p-2 border-b">
                        <input
                          value={editTransaction.category}
                          onChange={(e) =>
                            setEditTransaction({
                              ...editTransaction,
                              category: e.target.value
                            })
                          }
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="p-2 border-b">
                        <input
                          type="number"
                          value={editTransaction.amount}
                          onChange={(e) =>
                            setEditTransaction({
                              ...editTransaction,
                              amount: parseFloat(e.target.value) || ''
                            })
                          }
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="p-2 border-b">
                        <input
                          value={editTransaction.description}
                          onChange={(e) =>
                            setEditTransaction({
                              ...editTransaction,
                              description: e.target.value
                            })
                          }
                          className="border p-1 rounded w-full"
                        />
                      </td>
                      <td className="p-2 border-b">
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:underline mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditTransaction({});
                          }}
                          className="text-gray-500 hover:underline"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2 border-b">{t.date}</td>
                      <td className="p-2 border-b capitalize">{t.type}</td>
                      <td className="p-2 border-b">{t.category}</td>
                      <td className="p-2 border-b">₹{t.amount}</td>
                      <td className="p-2 border-b">{t.description}</td>
                      <td className="p-2 border-b">
                        <button
                          onClick={() => handleEdit(t)}
                          className="text-indigo-600 hover:underline mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(t._id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
