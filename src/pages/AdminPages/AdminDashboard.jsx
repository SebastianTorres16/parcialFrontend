import { useEffect, useState } from "react";
import {
  getProductsApi,
  updateProductApi,
  createProductApi,
  deleteProductApi,
} from "../../services/product.api";
import { getSalesApi } from "../../services/sale.api";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [creating, setCreating] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const [prods, s] = await Promise.all([getProductsApi(), getSalesApi()]);
      setProducts(prods);
      setSales(s);
    } catch (e) {
      console.error(e);
      alert("Error cargando datos");
    }
  };

  const handleBlurUpdate = async (id, field, value) => {
    try {
      const updated = await updateProductApi(id, { [field]: value });
      setProducts(products.map((p) => (p._id === id ? updated : p)));
    } catch (e) {
      console.error(e);
      alert("Error actualizando producto");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const created = await createProductApi({
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
      });
      setProducts([created, ...products]);
      setNewProduct({ name: "", price: 0, stock: 0 });
      setCreating(false);
    } catch (err) {
      console.error(err);
      alert("Error al crear producto");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar producto?")) return;
    try {
      await deleteProductApi(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar producto");
    }
  };

  const totalSales = sales.reduce((s, sale) => s + (sale.total || 0), 0);

  const salesByUser = sales.reduce((acc, sale) => {
    const u =
      sale.user?.username ||
      (sale.user && (sale.user.username || sale.user)) ||
      "Desconocido";
    acc[u] = (acc[u] || 0) + (sale.total || 0);
    return acc;
  }, {});

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h2>Admin Dashboard</h2>

      <section>
        <h3>Total ventas: ${totalSales}</h3>
        <h4>Ventas por usuario</h4>
        <ul>
          {Object.entries(salesByUser).map(([user, amt]) => (
            <li key={user}>
              {user}: ${amt}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>Productos</h3>

        <div style={{ marginBottom: 12 }}>
          {!creating && (
            <button onClick={() => setCreating(true)}>Crear producto</button>
          )}
          {creating && (
            <form
              onSubmit={handleCreate}
              style={{ display: "grid", gap: 8, marginTop: 8 }}
            >
              <input
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                placeholder="Nombre"
                required
              />
              <input
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                type="number"
                min="0"
                placeholder="Precio"
                required
              />
              <input
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
                placeholder="Stock"
                type="number"
                min="0"
                required
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button type="submit">Guardar</button>
                <button
                  type="button"
                  onClick={() => {
                    setCreating(false);
                    setNewProduct({ name: "", price: 0, stock: 0 });
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {products.map((p) => (
            <li
              key={p._id}
              style={{
                border: "1px solid #ddd",
                padding: 8,
                marginBottom: 8,
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                <input
                  defaultValue={p.name}
                  onBlur={(e) =>
                    handleBlurUpdate(p._1d ?? p._id, "name", e.target.value)
                  }
                />
                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                  <label style={{ alignItems: "center" }}>Precio:</label>
                  <input
                    defaultValue={p.price}
                    type="number"
                    onBlur={(e) =>
                      handleBlurUpdate(p._id, "price", Number(e.target.value))
                    }
                  />
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                  <label>Stock:</label>
                  <input
                    defaultValue={p.stock}
                    type="number"
                    onBlur={(e) =>
                      handleBlurUpdate(p._id, "stock", Number(e.target.value))
                    }
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => handleDelete(p._id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
