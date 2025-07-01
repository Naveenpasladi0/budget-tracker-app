import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardOverview = () => {
  // Mock summary data
  const income = 50000;
  const expenses = 32000;
  const netSavings = income - expenses;

  // Mock budget data
  const budgets = [
    { category: 'Food', spent: 4000, budget: 10000 },
    { category: 'Transport', spent: 2500, budget: 5000 },
    { category: 'Entertainment', spent: 6000, budget: 7000 },
  ];

  // Chart Data
  const chartData = {
    labels: ['April', 'May', 'June'],
    datasets: [
      {
        label: 'Income',
        data: [45000, 52000, 50000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Expenses',
        data: [30000, 35000, 32000],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Income vs Expenses (Last 3 Months)' },
    },
  };

  return (
    <div className="p-6 space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded shadow border border-gray-200">
          <h3 className="text-sm text-gray-500">This Month's Income</h3>
          <p className="text-2xl font-semibold text-green-600">₹{income.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded shadow border border-gray-200">
          <h3 className="text-sm text-gray-500">This Month's Expenses</h3>
          <p className="text-2xl font-semibold text-red-600">₹{expenses.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded shadow border border-gray-200">
          <h3 className="text-sm text-gray-500">Net Savings</h3>
          <p className="text-2xl font-semibold text-blue-600">₹{netSavings.toLocaleString()}</p>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="bg-white p-6 rounded shadow border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget Progress</h3>
        <div className="space-y-4">
          {budgets.map((item) => {
            const percentage = Math.min((item.spent / item.budget) * 100, 100);
            return (
              <div key={item.category}>
                <div className="flex justify-between mb-1 text-sm">
                  <span>{item.category}</span>
                  <span>
                    ₹{item.spent.toLocaleString()} / ₹{item.budget.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-indigo-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded shadow border border-gray-200">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DashboardOverview;
