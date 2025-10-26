import { useEffect, useState } from "react";
import { getProductsApi } from "../../services/product.api";
import ProductCard from "../../components/ProductCard";
import Cart from "../../components/Cart";
import { createSaleApi } from "../../services/sale.api";
import { useAuth } from "../../context/AuthContext";

export default function UserHome() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getProductsApi().then(setProducts).catch(console.error);
  }, []);

  const addToCart = (p) => {
    const exists = cart.find((c) => c._id === p._id);
    if (exists) {
      setCart(
        cart.map((c) =>
          c._id === p._id ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setCart([...cart, { ...p, quantity: 1 }]);
    }
  };

  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));

  const checkout = async (total) => {
    if (!user) return alert("Inicia sesión");
    if (cart.length === 0) return alert("Carrito vacío");

    const payload = {
      user: user._id || user.id || user, // según cómo tengas guardado
      products: cart.map((c) => ({
        product: c._id,
        quantity: c.quantity,
      })),
      total,
    };

    try {
      await createSaleApi(payload);
      alert("Pago simulado OK");
      setCart([]);
    } catch (e) {
      alert("Error al crear venta");
    }
  };

  return (
    <div className="mobile-container">
      <h2>Tienda</h2>
      <div className="product-list">
        {products.map((p) => (
          <ProductCard key={p._id} p={p} onAdd={addToCart} />
        ))}
      </div>
      <Cart cart={cart} onRemove={removeFromCart} onCheckout={checkout} />
    </div>
  );
}
