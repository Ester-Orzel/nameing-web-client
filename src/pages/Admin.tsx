
import { useState } from "react";
import { useUser } from "../context/UserContext";
import AddProduct from "../componenta/AddProduct";
import AllOrders from "../componenta/AllOrders";

const Admin = () => {
  const { user } = useUser();

  const [page, setPage] = useState("products");

  if (user?.role !== "ADMIN") {
    return (
      <div className="card empty-state">
        <p>You don't have permission to access the admin area</p>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-head">
        <div>
          <span className="eyebrow">Admin</span>
          <h1>Dashboard</h1>
        </div>

        <div className="tabs" role="tablist">
          <button
            role="tab"
            aria-selected={page === "products"}
            className={page === "products" ? "active" : ""}
            onClick={() => setPage("products")}
          >
            Add product
          </button>

          <button
            role="tab"
            aria-selected={page === "orders"}
            className={page === "orders" ? "active" : ""}
            onClick={() => setPage("orders")}
          >
            Orders
          </button>
        </div>
      </div>

      <div className="card">
        {page === "products" && <AddProduct />}

        {page === "orders" && <AllOrders />}
      </div>
    </div>
  );
};

export default Admin;
