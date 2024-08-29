import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { listTransactionsAPI } from '../../services/transactions/transactionServices';
import { useQuery } from '@tanstack/react-query';
import { plugins } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  //! Fetching
  const {
    data: transactionsData,
    isError,
    isLoading,
    isFetched,
    error,
    refetch,
  } = useQuery({
    queryFn: listTransactionsAPI,
    queryKey: ['list-transactions'],
  });

  const totals = transactionsData?.transactions?.reduce(
    (acc, transaction) => {
      if (transaction?.type === 'income') {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction?.amount;
      }

      return acc;
    },
    { income: 0, expense: 0 }
  );

  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Transactions',
        data: [totals?.income, totals?.expense],
        backgroundColor: ['#36A2EB', '#FF6384'],
        borderColor: ['#36A2EB', '#FF6384'],
        borderWith: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 25,
          boxWidth: 12,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Income vs Expense',
        font: {
          size: 18,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    cutout: '70%',
  };

  return (
    <div className='my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200'>
      <h1 className='text-2xl font-bold text-center mb-6'>
        Transaction Overview
      </h1>
      <div style={{ height: '350px' }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default TransactionChart;
