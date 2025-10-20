import z from 'zod';
export interface FormLoginType {
  email: string;
  password: string;
}

export interface FormRegisterType {
  email: string;
  password: string;
  fullName: string;
}

export interface FormEditProfile {
  name?: string;
  email?: string;
  address?: string;
  description?: string;
  logoUrl?: string;
  banner?: string;
  pitch?: string;
}

export interface FormEditUserProfile {
  fullName?: string;
  email?: string;
  fotoProfile?: string;
  phone?: string;
  address?: string;
}

export interface FormCreateRestaurant {
  name: string;
  email: string;
  password: string;
  profile: {
    address?: string;
    description?: string;
    logoUrl?: string;
    banner?: string;
    pitch?: string;
  };
}

export interface FormCreateChair {
  noChair: number | undefined;
}

export interface FormCreateOrder {
  uniqueUrl: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  chairNo: number;
}

export interface FormAddCart {
  quantity: number | null;
}

export interface FormUpdateCart {
  quantity: number;
}

export const FormCreateProductsSchema = z.object({
  name: z.string().min(1, 'Nama produk wajib diisi'),
  price: z.number().min(1, 'Harga harus lebih dari 0'),
  pictProduct: z.string().nullable(),
  category: z.string().min(1, 'Kategori wajib diisi'),
  description: z.string().optional(),
});

export type FormCreateProducts = z.infer<typeof FormCreateProductsSchema>;
