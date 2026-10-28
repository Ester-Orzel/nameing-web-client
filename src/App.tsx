import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Products from "./pages/prodact";
import ProductDetails from "./pages/ProductDetails";
import { UserProvider } from "./context/UserContext";
import Cart from "./pages/cart";
import Admin from "./pages/Admin";
import Checkout from "./pages/checkout";
import MyAccount from "./pages/MyAccount";
import Home from "./pages/Home";
import Header from "./componenta/Header";
import Footer from "./componenta/Footer";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <main className="flex-1 pt-9 pb-14 max-sm:pt-5 max-sm:pb-10">
          <div className="mx-auto w-full max-w-[1180px] px-5 max-sm:px-4">
            <Routes>
              <Route path="/" element={<Home />} />
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
