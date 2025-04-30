import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const FeeUpdates = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [sortField, setSortField] = useState('payment_time');
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilters, setStatusFilters] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const userRole = 'school';

  const fetchTransactions = async () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const schoolId = user ? user._id : null;
    setError(null);
    try {
      const res = await axios.get(`http://localhost:3000/payment/school/${schoolId}`, {
        params: { page, limit, sort: sortField, order: sortOrder },
      });
      setTransactions(res.data);
    } catch (err) {
      setError('Oops! Something went wrong while fetching transactions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole === 'school') fetchTransactions();
  }, [page, sortField, sortOrder, userRole]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleMultiSelect = (value, selected, setSelected) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const filteredTransactions = Array.from(
    new Map(
      transactions
        .filter((txn) =>
          Object.values(txn).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
        .filter((txn) =>
          statusFilters.length > 0 ? statusFilters.includes(txn.status.toLowerCase()) : true
        )
        .filter((txn) => {
          if (!dateRange.start || !dateRange.end) return true;
          const txnTime = new Date(txn.payment_time).getTime();
          return (
            txnTime >= new Date(dateRange.start).getTime() &&
            txnTime <= new Date(dateRange.end).getTime() + 24 * 60 * 60 * 1000 - 1
          );
        })
        .map((txn) => [txn.collect_id, txn])
    ).values()
  );

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      case 'not initiated':
        return 'bg-blue-100 text-blue-700';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy, HH:mm');
    } catch {
      return 'Invalid Date';
    }
  };

  const allStatuses = [...new Set(transactions.map((txn) => txn.status.toLowerCase()))].sort();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 text-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">📊 Fee Updates</h1>
          <p className="text-sm text-gray-500 mt-1">View and filter all your recent fee transactions.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium mb-1">🔍 Search</label>
          <input
            type="text"
            id="search"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium mb-1">📌 Filter by Status</label>
          <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto bg-gray-50 space-y-1">
            {allStatuses.map((status) => (
              <label key={status} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  className="text-indigo-600 border-gray-300 rounded"
                  checked={statusFilters.includes(status)}
                  onChange={() => handleMultiSelect(status, statusFilters, setStatusFilters)}
                />
                <span className="capitalize">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium mb-1">📅 Filter by Date</label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange((d) => ({ ...d, start: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-gray-400">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange((d) => ({ ...d, end: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Loading/Error */}
      {loading && (
        <div className="flex justify-center items-center py-4 text-base font-medium">
          <svg className="animate-spin h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.3 0 0 5.3 0 12h4z" />
          </svg>
          Loading transactions...
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong className="font-semibold">Error:</strong> {error}
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-100 text-gray-700 text-xs font-semibold uppercase">
              <tr>
                {[
                  'collect_id', 'custom_order_id', 'school_id', 'gateway',
                  'order_amount', 'transaction_amount', 'status', 'payment_time',
                ].map((field) => (
                  <th
                    key={field}
                    onClick={() => handleSort(field)}
                    className="px-6 py-3 text-left tracking-wide cursor-pointer hover:text-indigo-600"
                  >
                    {field.replace(/_/g, ' ')}
                    {sortField === field && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500 font-medium">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((txn) => (
                  <tr
                    key={txn.collect_id}
                    className="hover:bg-gray-50 transition-all duration-150"
                  >
                    <td className="px-6 py-3">{txn.collect_id}</td>
                    <td className="px-6 py-3">{txn.custom_order_id}</td>
                    <td className="px-6 py-3">{txn.school_id}</td>
                    <td className="px-6 py-3">{txn.gateway}</td>
                    <td className="px-6 py-3">₹{txn.order_amount}</td>
                    <td className="px-6 py-3">₹{txn.transaction_amount}</td>
                    <td className={`px-6 py-3 font-medium rounded ${getStatusClass(txn.status)}`}>
                      {txn.status}
                    </td>
                    <td className="px-6 py-3 text-gray-500">{formatDate(txn.payment_time)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeeUpdates;
