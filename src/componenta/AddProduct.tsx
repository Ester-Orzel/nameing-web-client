
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
        alert("Product updated successfully");
      } else {
        await addProduct(data, token);
        alert("Product added successfully");
        reset();
      }

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    } catch {
      alert("Error saving product");
    }
  };

  return (
    <div>
      <h2>{product ? "Edit product" : "Add a new product"}</h2>

      <form className="admin-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label>Product name</label>
          <input
            type="text"
            {...register("name", { required: true })}
          />
        </div>

        <div className="field">
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: true,
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="field full">
          <label>Description</label>
          <input
            type="text"
            {...register("description", { required: true })}
          />
        </div>

        <div className="field full">
          <label>Image URL</label>
          <input
            type="url"
            dir="ltr"
            {...register("imageUrl", { required: true })}
          />
        </div>

        <div className="field">
          <label>Personalization type</label>
          <select {...register("personalizationType")}>
            <option value="NAME_OR_INITIAL">Name or initial</option>
            <option value="INITIAL_ONLY">Initial only</option>
          </select>
        </div>

        <div className="field">
          <label>Category</label>
          <select
            {...register("categoryId", {
              required: true,
              valueAsNumber: true,
            })}
          >
            <option value="">Select a category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">
          {product ? "Save changes" : "Add product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
