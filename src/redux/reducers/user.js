const INITIAL_STATE = {
  email: '',
  password: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  if (action.type === 'LOGIN_SUCESSFUL') {
    return {
      ...state,
      email: action.payload.email,
      password: action.payload.password,
    };
  }
  return state;
};

export default userReducer;
