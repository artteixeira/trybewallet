import store from '../store';

export const loginSucessful = (payload) => ({ type: 'LOGIN_SUCESSFUL', payload });

const currencies = (payload) => ({ type: 'SET_CURRENCIES', payload });

const expenses = (payload) => ({ type: 'SET_EXPENSES', payload });

const total = (payload) => ({ type: 'GET_TOTAL', payload });

const getTotal = () => (dispatch) => {
  const { wallet } = store.getState();
  const result = wallet.expenses
    .map((element) => element.exchangeRates[element.currency].ask * element.value)
    .reduce((acc, sum) => Number(acc) + Number(sum));
  dispatch(total(result.toFixed(2)));
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
  const result = {
    id: wallet.expenses.length,
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
