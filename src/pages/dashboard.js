import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { saveAs } from 'file-saver';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DashboardPage() {
  const { user, loading } = useAuth();

  // Core data
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);

  // Inline editing states
  const [editingBudget, setEditingBudget] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState({});

  // New-item forms
  const [newBudget, setNewBudget] = useState({ category: '', amount: '' });
  const [newCategory, setNewCategory] = useState({ name: '', type: 'expense' });
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    type: 'expense',
    category: '',
    amount: '',
    description: ''
  });

  // Filters
  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStart, setFilterStart] = useState('');
  const [filterEnd, setFilterEnd] = useState('');

  // Pagination
  const ITEMS_PER_PAGE = 5;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(
    useMemo(() => {
      return transactions
        .filter((t) => (filterType ? t.type === filterType : true))
        .filter((t) => (filterCategory ? t.category === filterCategory : true))
        .filter((t) => (filterStart ? t.date >= filterStart : true))
        .filter((t) => (filterEnd ? t.date <= filterEnd : true));
    }, [transactions, filterType, filterCategory, filterStart, filterEnd]).length /
      ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (user) fetchAll();
  }, [user]);

  const fetchAll = () => {
    axios.get('/api/transactions').then((res) => setTransactions(res.data));
    axios.get('/api/budgets').then((res) => setBudgets(res.data));
    axios.get('/api/categories').then((res) => setCategories(res.data));
  };

  const getSpentForCategory = (cat) =>
    transactions
      .filter((t) => t.type === 'expense' && t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0);

  // Budget handlers
  const addBudget = async () => {
    const { data } = await axios.post('/api/budgets', newBudget);
    setBudgets((b) => [...b, data]);
    setNewBudget({ category: '', amount: '' });
  };
  const saveBudget = async () => {
    const { data } = await axios.put('/api/budgets', editingBudget);
    setBudgets((b) => b.map((x) => (x.id === data.id ? data : x)));
    setEditingBudget(null);
  };
  const deleteBudget = async (id) => {
    await axios.delete('/api/budgets', { data: { id } });
    setBudgets((b) => b.filter((x) => x.id !== id));
  };

  // Category handlers
  const addCategory = async () => {
    const { data } = await axios.post('/api/categories', newCategory);
    setCategories((c) => [...c, data]);
    setNewCategory({ name: '', type: 'expense' });
  };
  const saveCategory = async () => {
    const { data } = await axios.put('/api/categories', editingCategory);
    setCategories((c) => c.map((x) => (x.id === data.id ? data : x)));
    setEditingCategory(null);
  };
  const deleteCategory = async (id) => {
    await axios.delete('/api/categories', { data: { id } });
    setCategories((c) => c.filter((x) => x.id !== id));
  };

  // Transaction handlers
  const addTransaction = async () => {
    const { data } = await axios.post('/api/transactions', newTransaction);
    setTransactions((t) => [...t, data]);
    setNewTransaction({
      date: '',
      type: 'expense',
      category: '',
      amount: '',
      description: ''
    });
  };
  const saveTransaction = async () => {
    const { data } = await axios.put('/api/transactions', editedTransaction);
    setTransactions((t) => t.map((x) => (x._id === data._id ? data : x)));
    setEditingTransactionId(null);
  };
  const deleteTransaction = async (_id) => {
    await axios.delete('/api/transactions', { data: { _id } });
    setTransactions((t) => t.filter((x) => x._id !== _id));
  };

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => (filterType ? t.type === filterType : true))
      .filter((t) => (filterCategory ? t.category === filterCategory : true))
      .filter((t) => (filterStart ? t.date >= filterStart : true))
      .filter((t) => (filterEnd ? t.date <= filterEnd : true));
  }, [transactions, filterType, filterCategory, filterStart, filterEnd]);

  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const exportCSV = () => {
    const header = ['Date', 'Type', 'Category', 'Amount', 'Description'];
    const rows = filtered.map((t) => [t.date, t.type, t.category, t.amount, t.description]);
    const blob = new Blob(
      [[header.join(','), ...rows.map((r) => r.join(','))].join('\n')],
      { type: 'text/csv;charset=utf-8;' }
    );
    saveAs(blob, `transactions_${Date.now()}.csv`);
  };
``
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in to view your dashboard.</p>;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold flex items-center gap-2">
  👋 Welcome, {user?.fullName || user?.email}!
</h1>

      {/* Budgets */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Monthly Budgets</h2>
        {budgets.length > 0 && (
          <Bar
            data={{
              labels: budgets.map((b) => b.category),
              datasets: [
                {
                  label: 'Budgeted',
                  data: budgets.map((b) => b.amount),
                  backgroundColor: 'rgba(99,102,241,0.6)'
                },
                {
                  label: 'Spent',
                  data: budgets.map((b) => getSpentForCategory(b.category)),
                  backgroundColor: 'rgba(239,68,68,0.6)'
                }
              ]
            }}
            options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
            className="mb-6"
          />
        )}
        <ul className="space-y-2">
          {budgets.map((b) => {
            const spent = getSpentForCategory(b.category);
            const percent = ((spent / b.amount) * 100).toFixed(1);
            const isEd = editingBudget?.id === b.id;
            return (
              <li key={b.id} className="flex justify-between items-center border-b py-2">
                {isEd ? (
                  <>
                    <input
                      className="border px-2 py-1 mr-2"
                      value={editingBudget.category}
                      onChange={(e) =>
                        setEditingBudget({ ...editingBudget, category: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      className="border px-2 py-1 w-24 mr-2"
                      value={editingBudget.amount}
                      onChange={(e) =>
                        setEditingBudget({
                          ...editingBudget,
                          amount: parseFloat(e.target.value)
                        })
                      }
                    />
                    <button onClick={saveBudget} className="text-green-600 mr-2">
                      Save
                    </button>
                    <button onClick={() => setEditingBudget(null)} className="text-gray-500">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span>
                      {b.category} — ₹{spent} / ₹{b.amount} ({percent}%)
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingBudget(b)} className="text-indigo-600">
                        Edit
                      </button>
                      <button onClick={() => deleteBudget(b.id)} className="text-red-600">
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex gap-2">
          <input
            className="border px-2 py-1"
            placeholder="Category"
            value={newBudget.category}
            onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
          />
          <input
            type="number"
            className="border px-2 py-1 w-24"
            placeholder="Amount"
            value={newBudget.amount}
            onChange={(e) => setNewBudget({ ...newBudget, amount: parseFloat(e.target.value) })}
          />
          <button onClick={addBudget} className="bg-indigo-600 text-white px-3 py-1 rounded">
            Add
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Category Management</h2>
        <ul className="space-y-2 mb-4">
          {categories.map((c) => {
            const isEd = editingCategory?.id === c.id;
            return (
              <li key={c.id} className="flex justify-between items-center border-b py-2">
                {isEd ? (
                  <>
                    <input
                      className="border px-2 py-1 mr-2"
                      value={editingCategory.name}
                      onChange={(e) =>
                        setEditingCategory({ ...editingCategory, name: e.target.value })
                      }
                    />
                    ...
                    <button onClick={saveCategory} className="text-green-600 mr-2">
                      Save
                    </button>
                    <button onClick={() => setEditingCategory(null)} className="text-gray-500">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span>
                      {c.name} ({c.type})
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingCategory(c)} className="text-indigo-600">
                        Edit
                      </button>
                      <button onClick={() => deleteCategory(c.id)} className="text-red-600">
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
        <div className="flex gap-2">
          <input
            className="border px-2 py-1"
            placeholder="Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          />
          ...
          <button onClick={addCategory} className="bg-indigo-600 text-white px-3 py-1 rounded">
            Add
          </button>
        </div>
      </section>

      {/* ===== Transactions ===== */}
      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Transactions</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-end">
          <select
            className="border px-2 py-1"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            className="border px-2 py-1"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="border px-2 py-1"
            value={filterStart}
            onChange={(e) => setFilterStart(e.target.value)}
          />
          <input
            type="date"
            className="border px-2 py-1"
            value={filterEnd}
            onChange={(e) => setFilterEnd(e.target.value)}
          />
          <button onClick={() => setPage(1)} className="bg-gray-200 px-3 py-1 rounded">Apply</button>
          <button onClick={exportCSV} className="bg-green-600 text-white px-3 py-1 rounded ml-auto">
            Export CSV
          </button>
        </div>

        {/* Add Transaction */}
        <div className="flex flex-wrap gap-2">
          <input
            type="date"
            className="border px-2 py-1"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
          />
          <select
            className="border px-2 py-1"
            value={newTransaction.type}
            onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            className="border px-2 py-1"
            placeholder="Category"
            value={newTransaction.category}
            onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
          />
          <input
            type="number"
            className="border px-2 py-1 w-24"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })}
          />
          <input
            className="border px-2 py-1"
            placeholder="Description"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
          />
          <button onClick={addTransaction} className="bg-indigo-600 text-white px-3 py-1 rounded">
            Add
          </button>
        </div>

        {/* Transaction Table */}
        <table className="w-full table-auto border-collapse text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((t) => (
              <tr key={t._id} className="border-t">
                {editingTransactionId === t._id ? (
                  <>
                    <td className="p-2">
                      <input
                        type="date"
                        className="border px-2 py-1"
                        value={editedTransaction.date}
                        onChange={(e) =>
                          setEditedTransaction({ ...editedTransaction, date: e.target.value })
                        }
                      />
                    </td>
                    <td className="p-2">
                      <select
                        className="border px-2 py-1"
                        value={editedTransaction.type}
                        onChange={(e) =>
                          setEditedTransaction({ ...editedTransaction, type: e.target.value })
                        }
                      >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <input
                        className="border px-2 py-1"
                        value={editedTransaction.category}
                        onChange={(e) =>
                          setEditedTransaction({ ...editedTransaction, category: e.target.value })
                        }
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        className="border px-2 py-1 w-24"
                        value={editedTransaction.amount}
                        onChange={(e) =>
                          setEditedTransaction({
                            ...editedTransaction,
                            amount: parseFloat(e.target.value)
                          })
                        }
                      />
                    </td>
                    <td className="p-2">
                      <input
                        className="border px-2 py-1"
                        value={editedTransaction.description}
                        onChange={(e) =>
                          setEditedTransaction({ ...editedTransaction, description: e.target.value })
                        }
                      />
                    </td>
                    <td className="p-2 flex gap-2">
                      <button onClick={saveTransaction} className="text-green-600">
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTransactionId(null)}
                        className="text-gray-500"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-2">{t.date}</td>
                    <td className="p-2 capitalize">{t.type}</td>
                    <td className="p-2">{t.category}</td>
                    <td className="p-2">₹{t.amount}</td>
                    <td className="p-2">{t.description}</td>
                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingTransactionId(t._id);
                          setEditedTransaction(t);
                        }}
                        className="text-indigo-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTransaction(t._id)}
                        className="text-red-600"
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

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-2 py-1">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
