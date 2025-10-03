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

export const FormCreateProductsSchema = z.object({
  name: z.string().min(1, 'Nama produk wajib diisi'),
  price: z.number().min(1, 'Harga harus lebih dari 0'),
  pictProduct: z.string().nullable(),
  category: z.string().min(1, 'Kategori wajib diisi'),
  description: z.string().optional(),
});

export type FormCreateProducts = z.infer<typeof FormCreateProductsSchema>;
