import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, setExpenses, editExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    isEditing: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  componentDidUpdate(prevProps) {
    const { editor } = this.props;
    if (editor !== prevProps.editor) {
      this.editingExpense();
    }
  }

  editingExpense = () => {
    const { expenses, idToEdit } = this.props;
    const expense = expenses.filter((element) => element.id === idToEdit);
    this.setState({
      value: expense[0].value,
      description: expense[0].description,
      currency: expense[0].currency,
      method: expense[0].method,
      tag: expense[0].tag,
      isEditing: true,
    });
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const defaultTag = 'Alimentação';
    const { currencies, dispatch } = this.props;
    const { value, description, currency, method, tag, isEditing } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="value"
              data-testid="value-input"
              name="value"
              onChange={ this.handleChange }
              id="value"
              value={ value }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              onChange={ this.handleChange }
              data-testid="description-input"
              value={ description }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              onChange={ this.handleChange }
              id="currency"
              value={ currency }
            >
              {currencies.map((element, index) => (
                <option key={ index } value={ element }>{element}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento:
            <select
              data-testid="method-input"
              name="method"
              id="method"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              data-testid="tag-input"
              name="tag"
              id="tag"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          { isEditing ? (
            <button
              type="button"
              onClick={ () => {
                dispatch(editExpense(this.state));
                this.setState({
                  value: '',
                  description: '',
                  currency: 'USD',
                  method: 'Dinheiro',
                  tag: defaultTag,
                  isEditing: false,
                });
              } }
            >
              Editar despesas

            </button>)
            : (
              <button
                type="button"
                onClick={ () => {
                  dispatch(setExpenses(this.state));
                  this.setState({
                    value: '',
                    description: '',
                    currency: 'USD',
                    method: 'Dinheiro',
                    tag: defaultTag,
                  });
                } }
              >
                Adicionar despesas
              </button>
            )}
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }),
  dispatch: PropTypes.func,
  editor: PropTypes.bool,
  idToEdit: PropTypes.number,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      description: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      exchangeRates: PropTypes.shape({
        ask: PropTypes.string,
        name: PropTypes.string,
      }),
    }),
  ).isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
