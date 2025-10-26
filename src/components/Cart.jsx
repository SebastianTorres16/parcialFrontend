export default function Cart({ cart, onRemove, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  return (
    <div className="cart">
      <h3>Carrito</h3>
      {cart.map((c, i) => (
        <div key={i} className="cart-item">
          <span>
            {c.name} x{c.quantity}
          </span>
          <button onClick={() => onRemove(i)}>Eliminar</button>
        </div>
      ))}
      <div>Total: ${total}</div>
      <button onClick={() => onCheckout(total)}>Pagar</button>
    </div>
  );
}
