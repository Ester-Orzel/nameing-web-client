
import { useState } from "react";
import { useUser } from "../context/UserContext";
import AddProduct from "../componenta/AddProduct";
import AllOrders from "../componenta/AllOrders";

// כפתורי המעבר בין "הוספת מוצר" ו"צפייה בהזמנות"
const tab = "mb-5 ml-2 border-[1.5px] border-copper-light bg-white bg-none text-copper-dark shadow-none hover:bg-copper-tint max-sm:mb-3";

const Admin = () => {
  const { user } = useUser();

  const [page, setPage] = useState("products");

  if (user?.role !== "ADMIN") {
    return <p>אין לך הרשאה להיכנס לעמוד הניהול</p>;
  }

  return (
    <div>
      <h1 className="mb-4">מערכת ניהול</h1>

      <button onClick={() => setPage("products")} className={tab}>
        הוספת מוצר
      </button>

      <button onClick={() => setPage("orders")} className={tab}>
        צפייה בהזמנות
      </button>

      {page === "products" && <AddProduct />}

      {page === "orders" && <AllOrders />}
    </div>
  );
};

export default Admin;
