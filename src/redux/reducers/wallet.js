const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_CURRENCIES':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'SET_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'GET_TOTAL':
    return {
      ...state,
      total: Number(action.payload),
    };
  case 'DELETE_EXPENSES':
    return {
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.payload),
    };
  case 'EDITING_EXPENSES':
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      editor: false,
      idToEdit: 0,
      expenses: action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
