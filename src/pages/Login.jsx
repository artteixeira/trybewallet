import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginSucessful } from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
    };
  }

  handleChange = ({ target }) => this.setState({ [target.name]: target.value });

  render() {
    const { password, email } = this.state;
    const regexEmail = /^[a-z0-9]+@[a-z0-9]+\.+[a-z0-9]{3}$/;
    const MinLengthPassword = 6;
    const disabledBtn = regexEmail.test(email) && password.length >= MinLengthPassword;
    return (
      <div>
        Login
        <input
          type="email"
          name="email"
          id="email"
          value={ email }
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          id="password"
          value={ password }
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ !disabledBtn }
          onClick={ () => {
            const { history, dispatch } = this.props;
            dispatch(loginSucessful(this.state));
            history.push('/carteira');
          } }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
