import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de Pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio Utilizado</th>
          <th>Valor Convertido</th>
          <th>Moeda de Conversão</th>
          <th>Editar/Excluir</th>
        </thead>
        <tbody>
          { expenses.length > 0 && expenses.map((element, index) => (
            <tr key={ index }>
              <th>{element.description}</th>
              <th>{element.tag}</th>
              <th>{Number(element.value).toFixed(2)}</th>
              <th>{element.currency}</th>
              <th>{Number(element.exchangeRates[element.currency].ask).toFixed(2)}</th>
              <th>
                {
                  (Number(element.value)
            * Number(element.exchangeRates[element.currency].ask)).toFixed(2)
                }

              </th>
              <th>Real</th>
              <th>
                <button>Editar</button>
                <button>Excluir</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      description: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      exchangeRates: PropTypes.shape({
        ask: PropTypes.string,
      }),
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
