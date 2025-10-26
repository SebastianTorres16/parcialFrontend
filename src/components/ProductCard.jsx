export default function ProductCard({ p, onAdd }) {
  return (
    <div className="product-card">
      <div>{p.name}</div>
      <div>${p.price}</div>
      <div>Stock: {p.stock ?? "—"}</div>
      <button onClick={() => onAdd(p)}>Agregar</button>
    </div>
  );
}
