import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    currentCoin: 'BRL',
  };

  render() {
    const { currentCoin } = this.state;
    const { email, total } = this.props;
    return (
      <div>
        <span data-testid="email-field">{ `Email: ${email}`}</span>
        <span>
          <span>{'  Despesa Total:  '}</span>
          <span data-testid="total-field">{ total.toFixed(2) }</span>
        </span>
        {'  '}
        <span data-testid="header-currency-field">{ currentCoin }</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
