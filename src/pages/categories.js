import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', type: 'expense' });
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) return;

    try {
      const res = await axios.post('/api/categories', newCategory);
      setCategories([...categories, res.data]);
      setNewCategory({ name: '', type: 'expense' });
    } catch (err) {
      console.error('Failed to add category:', err);
    }
  };

  const handleEditCategory = (cat) => {
    setEditingCategory({ ...cat });
  };

  const handleSaveCategory = async () => {
    try {
      const res = await axios.put('/api/categories', editingCategory);
      setCategories(
        categories.map((c) => (c.id === editingCategory.id ? res.data : c))
      );
      setEditingCategory(null);
    } catch (err) {
      console.error('Failed to save category:', err);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete('/api/categories', { data: { id } });
      setCategories(categories.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Failed to delete category:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h1 className="text-2xl font-semibold mb-4">Category Management</h1>

      <ul className="space-y-2 mb-6">
        {categories.map((cat) => {
          const isEditing = editingCategory?.id === cat.id;
          return (
            <li key={cat.id} className="flex justify-between items-center border-b py-2">
              {isEditing ? (
                <>
                  <input
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, name: e.target.value })
                    }
                    className="border px-2 py-1 rounded mr-2"
                  />
                  <select
                    value={editingCategory.type}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, type: e.target.value })
                    }
                    className="border px-2 py-1 rounded mr-2"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                  <button
                    onClick={handleSaveCategory}
                    className="text-green-600 text-sm mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="text-gray-500 text-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{cat.name} ({cat.type})</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCategory(cat)}
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      Edit
                    </button>
                    {!cat.predefined && (
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="New category name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          className="border rounded px-3 py-2 w-40"
        />
        <select
          value={newCategory.type}
          onChange={(e) => setNewCategory({ ...newCategory, type: e.target.value })}
          className="border rounded px-3 py-2"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button
          onClick={handleAddCategory}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}
