import axios from 'axios';
import { BASE_URL } from '../../utils/url';
import { getUserFromStorage } from '../../utils/getUserFromStorage';

//! Get the token
const token = getUserFromStorage();

//! Add Transaction
export const addTransactionAPI = async ({
  type,
  category,
  date,
  description,
  amount,
}) => {
  const response = await axios.post(
    `${BASE_URL}/transactions/create`,
    {
      type,
      category,
      date,
      description,
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  //! Return a Promise
  return response.data;
};

//! Update Category
export const updateCategoryAPI = async ({ name, type, id }) => {
  const response = await axios.put(
    `${BASE_URL}/categories/update/${id}`,
    {
      name,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  //! Return a Promise
  return response.data;
};

//! Delete Category
export const deleteCategoryAPI = async id => {
  const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  //! Return a Promise
  return response.data;
};

//! Lists Category
export const listTransactionsAPI = async ({
  category,
  type,
  startDate,
  endDate,
}) => {
  const response = await axios.get(`${BASE_URL}/transactions/lists`, {
    params: { category, type, startDate, endDate },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  //! Return a Promise
  return response.data;
};
