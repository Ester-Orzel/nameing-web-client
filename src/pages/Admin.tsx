
import { useState } from "react";
import { useUser } from "../context/UserContext";
import AddProduct from "../componenta/AddProduct";
import AllOrders from "../componenta/AllOrders";

const Admin = () => {
  const { user } = useUser();

  const [page, setPage] = useState("products");

  if (user?.role !== "ADMIN") {
    return <p>אין לך הרשאה להיכנס לעמוד הניהול</p>;
  }

  return (
    <div>
      <h1>מערכת ניהול</h1>

      <button onClick={() => setPage("products")}>
        הוספת מוצר
      </button>

      <button onClick={() => setPage("orders")}>
        צפייה בהזמנות
      </button>

      {page === "products" && <AddProduct />}

      {page === "orders" && <AllOrders />}
    </div>
  );
};

export default Admin;
