import store from '../store';

export const loginSucessful = (payload) => ({ type: 'LOGIN_SUCESSFUL', payload });

const currencies = (payload) => ({ type: 'SET_CURRENCIES', payload });

const expenses = (payload) => ({ type: 'SET_EXPENSES', payload });

const total = (payload) => ({ type: 'GET_TOTAL', payload });

const deleteExpensesAction = (payload) => ({ type: 'DELETE_EXPENSES', payload });

export const editingExpense = (payload) => ({ type: 'EDITING_EXPENSES', payload });

const editExpenseAction = (payload) => ({ type: 'EDIT_EXPENSE', payload });

const getTotal = () => (dispatch) => {
  const { wallet } = store.getState();
  if (wallet.expenses.length > 0) {
    const result = wallet.expenses
      .map((element) => element.exchangeRates[element.currency].ask * element.value)
      .reduce((acc, sum) => Number(acc) + Number(sum));
    dispatch(total(result.toFixed(2)));
  } else {
    dispatch(total(0));
  }
};

export const deleteExpenses = (payload) => (dispatch) => {
  dispatch(deleteExpensesAction(payload));
  dispatch(getTotal());
};

export const fetchAPI = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currenciesAPI = Object.keys(data).filter((element) => element !== 'USDT');
  dispatch(currencies(currenciesAPI));
};

export const setExpenses = (state) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const { wallet } = store.getState();
  const id = wallet.expenses.length > 0 ? wallet.expenses
    .reduce((acc, sum) => (sum.id > acc ? sum.id : acc), 0) + 1 : 0;
  const result = {
    id,
    value: state.value,
    description: state.description,
    currency: state.currency,
    method: state.method,
    tag: state.tag,
    exchangeRates: data,
  };
  dispatch(expenses(result));
  dispatch(getTotal());
};

export const editExpense = (state) => async (dispatch) => {
  const { wallet } = store.getState();
  const expense = wallet.expenses
    .map((element) => {
      if (element.id === wallet.idToEdit) {
        element.value = state.value;
        element.description = state.description;
        element.currency = state.currency;
        element.method = state.method;
        element.tag = state.tag;
        return element;
      }
      return element;
    });
  dispatch(editExpenseAction(expense));
  dispatch(getTotal());
};
