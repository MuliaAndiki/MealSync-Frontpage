'use client';
import {
  IconCheck,
  IconCurrencyDollar,
  IconFileText,
  IconPhoto,
  IconTag,
  IconUpload,
  IconX,
} from '@tabler/icons-react';
import Image from 'next/image';

import Box from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import View from '@/components/ui/view';
import { FormCreateProducts } from '@/types/form';
import { ProductsProps } from '@/types/props';
import UploadsTrigger from '@/utils/uploadsTriger';

interface EditMenuProps {
  setFormEditProduct?: React.Dispatch<React.SetStateAction<FormCreateProducts>>;
  isPending?: boolean;
  preview?: string | null;
  onPictChange?: (e: any) => void;
  onSave?: () => void;
  router?: any;
}

const EditMenuHeroSection: React.FC<EditMenuProps & ProductsProps> = ({
  data,
  isPending,
  preview,
  setFormEditProduct,
  onPictChange,
  onSave,
  router,
}) => {
  return (
    <View>
      <Box className="flex justify-start items-center w-full min-h-screen flex-col gap-6 py-4 sm:py-6 px-4 sm:px-0">
        <Box className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Box>
            <h1 className="text-2xl sm:text-3xl font-bold">Edit Menu</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Perbarui informasi menu Anda
            </p>
          </Box>
          <Box className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => router.back()}
              disabled={isPending}
              className="flex-1 sm:flex-none"
            >
              <IconX size={18} />
              <span className="hidden sm:inline">Batal</span>
            </Button>
            <Button
              variant="native"
              onClick={() => onSave!()}
              disabled={isPending}
              className="flex-1 sm:flex-none"
            >
              <IconCheck size={18} />
              {isPending ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </Box>
        </Box>

        <Separator />

        <Box className="w-full grid md:grid-cols-2 gap-6">
          <Box className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconPhoto size={24} className="text-[#5B9844]" />
                  Foto Menu
                </CardTitle>
                <CardDescription>Upload foto menu dengan ukuran optimal 800x800px</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Box className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-dashed border-muted hover:border-[#5B9844] transition-colors">
                  {preview || data?.pictProduct ? (
                    <>
                      <Image
                        alt="Menu Preview"
                        src={preview || data?.pictProduct}
                        fill
                        className="object-cover"
                      />
                      <Box className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <UploadsTrigger
                          onChange={(e) => onPictChange!(e)}
                          accept="image/*"
                          multiple={false}
                        >
                          <Button variant="secondary">
                            <IconUpload size={18} />
                            Ganti Foto
                          </Button>
                        </UploadsTrigger>
                      </Box>
                    </>
                  ) : (
                    <Box className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <IconPhoto size={48} className="text-muted-foreground" />
                      <UploadsTrigger
                        onChange={(e) => onPictChange!(e)}
                        accept="image/*"
                        multiple={false}
                      >
                        <Button variant="outline">
                          <IconUpload size={18} />
                          Upload Foto
                        </Button>
                      </UploadsTrigger>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Menu</CardTitle>
                <CardDescription>Atur ketersediaan menu</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Box className="flex items-center justify-between p-3 rounded-lg border">
                  <Box className="flex items-center gap-3">
                    <Box className="w-10 h-10 rounded-full bg-[#5B9844]/10 flex items-center justify-center">
                      <IconCheck size={20} className="text-[#5B9844]" />
                    </Box>
                    <Box>
                      <p className="font-medium">Menu Aktif</p>
                      <p className="text-sm text-muted-foreground">Menu dapat dipesan</p>
                    </Box>
                  </Box>
                  <Switch defaultChecked={data?.isAvailable} />
                </Box>

                <Box className="flex items-center justify-between p-3 rounded-lg border">
                  <Box className="flex items-center gap-3">
                    <Box className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                      <IconX size={20} className="text-destructive" />
                    </Box>
                    <Box>
                      <p className="font-medium">Stok Habis</p>
                      <p className="text-sm text-muted-foreground">Menu tidak tersedia</p>
                    </Box>
                  </Box>
                  <Switch defaultChecked={!data?.isAvailable} />
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Menu</CardTitle>
                <CardDescription>Detail menu yang akan ditampilkan ke customer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Box className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <IconFileText size={16} className="text-[#5B9844]" />
                    Nama Menu
                  </Label>
                  <Input
                    id="name"
                    placeholder="Contoh: Nasi Goreng Special"
                    defaultValue={data.name}
                    onChange={(e) =>
                      setFormEditProduct!((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </Box>

                <Box className="space-y-2">
                  <Label htmlFor="description" className="flex items-center gap-2">
                    <IconFileText size={16} className="text-[#5B9844]" />
                    Deskripsi
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Deskripsikan menu Anda dengan detail..."
                    defaultValue={data.description}
                    onChange={(e) =>
                      setFormEditProduct!((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={4}
                  />
                </Box>

                <Box className="grid md:grid-cols-2 gap-4">
                  <Box className="space-y-2">
                    <Label htmlFor="category" className="flex items-center gap-2">
                      <IconTag size={16} className="text-[#5B9844]" />
                      Kategori
                    </Label>
                    <Input
                      id="category"
                      placeholder="Contoh: Makanan Utama"
                      defaultValue={data.category}
                      onChange={(e) =>
                        setFormEditProduct!((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                    />
                  </Box>

                  <Box className="space-y-2">
                    <Label htmlFor="price" className="flex items-center gap-2">
                      <IconCurrencyDollar size={16} className="text-[#5B9844]" />
                      Harga (Rp)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="25000"
                      defaultValue={data.price}
                      onChange={(e) =>
                        setFormEditProduct!((prev) => ({
                          ...prev,
                          price: Number(e.target.value),
                        }))
                      }
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box className="w-full flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={() => router.back()} disabled={isPending} size="lg">
            <IconX size={18} />
            Batal
          </Button>
          <Button variant="native" onClick={() => onSave!()} disabled={isPending} size="lg">
            <IconCheck size={18} />
            {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
        </Box>
      </Box>
    </View>
  );
};

export default EditMenuHeroSection;
