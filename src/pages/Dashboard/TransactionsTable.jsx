import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [sortField, setSortField] = useState('payment_time');
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // const navigate = useNavigate();
  const userRole = "admin";

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:3000/payment/transactions', {
        params: {
          page,
          limit,
          sort: sortField,
          order: sortOrder,
        },
      });
      setTransactions(res.data);
    } catch (err) {
      setError('Error fetching transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole === 'admin') fetchTransactions();
  }, [page, sortField, sortOrder, userRole]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredTransactions = Array.from(
    new Map(
      transactions
        .filter((txn) =>
          Object.values(txn).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
        .map((txn) => [txn.collect_id, txn])
    ).values()
  );
  

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Transactions</h1>
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 px-4 py-2 border rounded w-full"
      />

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {!loading && !error && (
        <>
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                {['collect_id', 'custom_order_id', 'school_id', 'gateway', 'transaction_amount', 'status', 'payment_time'].map((field) => (
                  <th
                    key={field}
                    className="py-2 px-4 cursor-pointer"
                    onClick={() => handleSort(field)}
                  >
                    {field.replace('_', ' ')} {sortField === field && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn) => (
                <tr key={txn.collect_id} className="border-t">
                  <td className="py-2 px-4">{txn.collect_id}</td>
                  <td className="py-2 px-4">{txn.custom_order_id}</td>
                  <td className="py-2 px-4">{txn.school_id}</td>
                  <td className="py-2 px-4">{txn.gateway}</td>
                  <td className="py-2 px-4">{txn.transaction_amount}</td>
                  <td className="py-2 px-4">{txn.status}</td>
                  <td className="py-2 px-4">{new Date(txn.payment_time).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-between">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2">Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionsTable;
