
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories, addProduct, updateProduct } from "../api";
import type { CreateProductRequest, Product } from "../api";
import { useUser } from "../context/UserContext";

interface Props {
  product?: Product;
}

const AddProduct = ({ product }: Props) => {
  const { token } = useUser();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<CreateProductRequest>({
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
          personalizationType: product.personalizationType,
          categoryId: product.categoryId,
        }
      : {},
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const onSubmit = async (data: CreateProductRequest) => {
    if (!token) return;

    try {
      if (product) {
        await updateProduct(product.id, data, token);
        alert("המוצר עודכן בהצלחה");
      } else {
        await addProduct(data, token);
        alert("המוצר נוסף בהצלחה");
        reset();
      }

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    } catch {
      alert("שגיאה בשמירת המוצר");
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-white p-8 shadow-card max-sm:p-5">
      <h2 className="mb-5">{product ? "עריכת מוצר" : "הוספת מוצר חדש"}</h2>

      {/* תווית ושדה באותה שורה */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid items-center gap-x-5 gap-y-3.5 sm:grid-cols-[180px_1fr]">
        <label>שם המוצר</label>
        <input
          type="text"
          {...register("name", { required: true })}
        />

        <label>תיאור המוצר</label>
        <input
          type="text"
          {...register("description", { required: true })}
        />

        <label>מחיר</label>
        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: true,
            valueAsNumber: true,
          })}
        />

        <label>קישור לתמונה</label>
        <input
          type="url"
          {...register("imageUrl", { required: true })}
        />

        <label>סוג התאמה אישית</label>
        <select {...register("personalizationType")}>
          <option value="NAME_OR_INITIAL">שם או אות</option>
          <option value="INITIAL_ONLY">אות בלבד</option>
        </select>

        <label>קטגוריה</label>
        <select
          {...register("categoryId", {
            required: true,
            valueAsNumber: true,
          })}
        >
          <option value="">בחר קטגוריה</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button type="submit" className="mt-2 justify-self-start max-sm:w-full sm:col-start-2">
          {product ? "שמור שינויים" : "הוסף מוצר"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
