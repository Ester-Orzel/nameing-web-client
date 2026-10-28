import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Products from "./pages/prodact";
import ProductDetails from "./pages/ProductDetails";
import { UserProvider } from "./context/UserContext";
import Cart from "./pages/cart";
import Admin from "./pages/Admin";
import Checkout from "./pages/checkout";
import MyAccount from "./pages/MyAccount";
import Header from "./componenta/Header";
import Footer from "./componenta/Footer";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <main className="site-main">
          <div className="container">
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
