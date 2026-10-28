
import { useState } from "react";
import { useUser } from "../context/UserContext";
import AddProduct from "../componenta/AddProduct";
import AllOrders from "../componenta/AllOrders";

const Admin = () => {
  const { user } = useUser();

  const [page, setPage] = useState("products");

  if (user?.role !== "ADMIN") {
    return (
      <div className="card px-4 py-12 text-center [&_p]:mb-5 [&_p]:text-lg [&_p]:text-muted">
        <p>You don't have permission to access the admin area</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 [&_h1]:m-0">
        <div>
          <span className="eyebrow">Admin</span>
          <h1>Dashboard</h1>
        </div>

        <div className="inline-flex gap-1 rounded-full border border-line bg-white p-1 shadow-sm max-sm:w-full" role="tablist">
          <button
            role="tab"
            aria-selected={page === "products"}
            className="btn min-h-10 px-5 py-2 hover:translate-y-0 max-sm:flex-1 aria-[selected=false]:bg-none aria-[selected=false]:text-muted aria-[selected=false]:shadow-none aria-[selected=false]:hover:bg-copper-tint aria-[selected=false]:hover:text-copper-dark"
            onClick={() => setPage("products")}
          >
            Add product
          </button>

          <button
            role="tab"
            aria-selected={page === "orders"}
            className="btn min-h-10 px-5 py-2 hover:translate-y-0 max-sm:flex-1 aria-[selected=false]:bg-none aria-[selected=false]:text-muted aria-[selected=false]:shadow-none aria-[selected=false]:hover:bg-copper-tint aria-[selected=false]:hover:text-copper-dark"
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
