
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const api = axios.create({
  baseURL: API_URL,
});

// ---------- Types ----------

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: "CUSTOMER" | "ADMIN";
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  personalizationType: "NAME_OR_INITIAL" | "INITIAL_ONLY";
  categoryId: number;
}

export interface Color {
  id: number;
  name: string;
  hexCode: string;
}

export interface Font {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface CartItem {
  product: Product;
  personalization: boolean;
  customText: string;
  selectedColor: string;
  selectedFont?: Font | null;
}

export interface CreateOrderRequest {
  deliveryMethod: "DELIVERY";
  contactName: string;
  contactPhone: string;
  deliveryAddress: string;
  notes: string;
  items: {
    productId: number;
    personalizationKind?: "NAME" | "INITIAL" | "NONE";
    personalizationText?: string | null;
    fontId?: number | null;
    colorId?: number | null;
  }[];
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  unitPrice: number;
  personalizationKind: "NAME" | "INITIAL" | "NONE";
  personalizationText: string | null;
  font: Font | null;
  color: Color | null;
}

export interface Order {
  id: number;
  customerId: number;
  status: string;
  deliveryMethod: "DELIVERY";
  contactName: string;
  contactPhone: string;
  deliveryAddress: string;
  notes: string | null;
  totalPrice: number;
  itemsCount: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}
export type CreateProductRequest = Omit<Product, "id">;

// ---------- Authentication ----------

export async function registerUser(
  fullName: string,
  email: string,
  phone: string,
  password: string
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/api/auth/register", {
    fullName,
    email,
    phone,
    password,
  });

  return response.data;
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/api/auth/login", {
    email,
    password,
  });

  return response.data;
}

// ---------- Products ----------

export interface GetProductsParams {
  search?: string;
  categoryId?: number;
  sort?: "newest" | "price_asc" | "price_desc" | "name";
}

export async function getProducts(
  params: GetProductsParams = {}
): Promise<Product[]> {
  const response = await api.get<{ items: Product[] }>("/api/products", {
    params: {
      limit: 50,
      ...params,
    },
  });

  return response.data.items;
}

export async function getColors(): Promise<Color[]> {
  const response = await api.get<Color[]>("/api/colors");
  return response.data;
}

export async function getFonts(): Promise<Font[]> {
  const response = await api.get<Font[]>("/api/fonts");
  return response.data;
}

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>("/api/categories");
  return response.data;
}

// ---------- Orders ----------

export function createOrder(
  order: CreateOrderRequest,
  token: string
) {
  return api.post("/api/orders", order, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getMyOrders(token: string) {
  return api.get<Order[]>("/api/orders/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const addProduct = async (
  product: CreateProductRequest,
  token: string
) => {
  const response = await api.post<Product>(
    "/api/products",
    product,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export async function getAllOrders(token: string) {
  const response = await api.get<Order[]>("/api/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export const updateOrderStatus = async (
  orderId: number,
  status: string,
  token: string
) => {
  const response = await api.patch<Order>(
    `/api/orders/${orderId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const updateProduct = async (
  productId: number,
  product: CreateProductRequest,
  token: string
) => {
  const response = await api.patch<Product>(
    `/api/products/${productId}`,
    product,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
