import React from "react";
import { connect } from "react-redux";
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from "react-icons/md";

import * as CartActions from "../../store/modules/cart/actions";
import { Container, Total, ProductTable } from "./styles";
import { bindActionCreators } from "redux";
import { formatPrice } from "../../util/format";
function Cart({ cart, removeFromCart, total, updateAmount }) {
  function increment(product) {
    updateAmount(product.id, product.amount + 1);
  }
  function decrement(product) {
    updateAmount(product.id, product.amount - 1);
  }
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title}></img>
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.price}</span>
              </td>
              <td>
                <div>
                  <button type="buttons" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline
                      size={20}
                      color="#ba2f2d"
                    ></MdRemoveCircleOutline>
                  </button>
                  <input type="number" readOnly value={product.amount}></input>
                  <button type="buttons" onClick={() => increment(product)}>
                    <MdAddCircleOutline
                      size={20}
                      color="#ba2f2d"
                    ></MdAddCircleOutline>
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button type="button">
                  <MdDelete
                    size={20}
                    color="#ba2f2d"
                    onClick={() => removeFromCart(product.id)}
                  ></MdDelete>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button"> Finalizar pedido</button>
        <Total>
          <span>total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

const mapStateToProps = (state) => ({
  cart: state.cart.map((product) => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
