import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 1000;
  const [sortField, setSortField] = useState('payment_time');
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilters, setStatusFilters] = useState([]);
  const [schoolFilters, setSchoolFilters] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const userRole = 'admin';

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('https://edvironbackend-iyr6.onrender.com/payment/transactions', {
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
        .filter((txn) =>
          schoolFilters.length > 0 ? schoolFilters.includes(String(txn.school_id)) : true
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
  const allSchoolIds = [...new Set(transactions.map((txn) => String(txn.school_id)))].sort();

  return (
    <div className="bg-gray-50 p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">📊 Transactions Overview</h1>

      {/* Search and Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              className="pl-10 pr-4 h-10 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
          <div className="border rounded-md p-2 max-h-40 overflow-y-auto">
            {allStatuses.map((status) => (
              <label key={status} className="flex items-center space-x-2 text-sm py-1">
                <input
                  type="checkbox"
                  className="form-checkbox text-indigo-600"
                  checked={statusFilters.includes(status)}
                  onChange={() => handleMultiSelect(status, statusFilters, setStatusFilters)}
                />
                <span className="capitalize">{status}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by School ID</label>
          <div className="border rounded-md p-2 max-h-40 overflow-y-auto">
            {allSchoolIds.map((id) => (
              <label key={id} className="flex items-center space-x-2 text-sm py-1">
                <input
                  type="checkbox"
                  className="form-checkbox text-indigo-600"
                  checked={schoolFilters.includes(id)}
                  onChange={() => handleMultiSelect(id, schoolFilters, setSchoolFilters)}
                />
                <span>School ID: {id}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Date Range</label>
          <div className="flex gap-2 items-center">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange((d) => ({ ...d, start: e.target.value }))}
              className="h-10 w-full border border-gray-300 rounded-md text-sm px-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange((d) => ({ ...d, end: e.target.value }))}
              className="h-10 w-full border border-gray-300 rounded-md text-sm px-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-4">
          <svg className="animate-spin h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <span className="ml-2 text-gray-600">Loading transactions...</span>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong> <span>{error}</span>
        </div>
      )}

{!loading && !error && (
        <div className="overflow-x-auto shadow-sm rounded-md">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100">
              <tr>
                {[
                  'collect_id', 'custom_order_id', 'school_id', 'gateway',
                  'order_amount', 'transaction_amount', 'status', 'payment_time',
                ].map((field) => (
                  <th
                    key={field}
                    onClick={() => handleSort(field)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:text-indigo-600 transition-colors duration-200"
                  >
                    {field.replace(/_/g, ' ')}
                    {sortField === field && (
                      <span className="ml-1 text-xs">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((txn) => (
                  <tr
                    key={txn.collect_id}
                    className="hover:bg-gray-50 transform hover:scale-102 transition-all duration-200"
                  >
                    <td className="px-6 py-3 text-sm text-gray-900">{txn.collect_id}</td>
                    <td className="px-6 py-3 text-sm text-gray-900">{txn.custom_order_id}</td>
                    <td className="px-6 py-3 text-sm text-gray-900">{txn.school_id}</td>
                    <td className="px-6 py-3 text-sm text-gray-900">{txn.gateway}</td>
                    <td className="px-6 py-3 text-sm text-gray-900">₹{txn.order_amount}</td>
                    <td className="px-6 py-3 text-sm text-gray-900">₹{txn.transaction_amount}</td>
                    <td className={`px-6 py-3 text-sm font-medium rounded ${getStatusClass(txn.status)}`}>
                      {txn.status}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500">{formatDate(txn.payment_time)}</td>
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

export default TransactionsTable;
