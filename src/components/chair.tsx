'use client';
import { IconArmchair, IconPlus, IconTrash } from '@tabler/icons-react';

import { ChairType, ParentModalType } from '@/types/components';
import { AlertContexType } from '@/types/ui';

import { Badge } from './ui/badge';
import Box from './ui/box';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

interface ChairsProps {
  chairs: ChairType[];
  setOpenModal?: React.Dispatch<React.SetStateAction<ParentModalType>>;
  hidenRoutes?: string[];
  isHiden?: any;
  onDeleteChair?: (_id: string) => void;
  alert?: AlertContexType;
}

const Chairs: React.FC<ChairsProps> = ({
  chairs,
  setOpenModal,
  hidenRoutes,
  isHiden,
  onDeleteChair,
  alert,
}) => {
  const path = hidenRoutes?.includes(isHiden);
  const emptyChairs = chairs.filter((c) => c.status === 'empty').length;
  const occupiedChairs = chairs.filter((c) => c.status !== 'empty').length;

  return (
    <Card className="w-full">
      <CardHeader>
        <Box className="flex justify-between items-center">
          <Box className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <IconArmchair size={24} className="text-[#5B9844]" />
              Manajemen Kursi
            </CardTitle>
            <Box className="flex gap-2">
              <Badge variant="secondary">
                Tersedia: {emptyChairs}
              </Badge>
              <Badge variant="destructive">
                Terisi: {occupiedChairs}
              </Badge>
            </Box>
          </Box>
          {path && (
            <Button variant="native" onClick={() => setOpenModal!('Chair')}>
              <IconPlus size={18} />
              Tambah Kursi
            </Button>
          )}
        </Box>
      </CardHeader>

      <Separator />

      <CardContent className="pt-6">
        <Box className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {chairs.map((chair) => (
            <button
              key={chair._id}
              type="button"
              className="group relative"
              onClick={
                path
                  ? () =>
                      alert?.confirm({
                        title: 'Hapus Kursi?',
                        deskripsi: `Apakah Anda yakin ingin menghapus kursi nomor ${chair.noChair}?`,
                        icon: 'warning',
                        onConfirm: () => onDeleteChair!(chair._id),
                        onClose: () => {},
                      })
                  : undefined
              }
              disabled={!path}
            >
              <Box
                className={`
                  relative aspect-square rounded-lg flex flex-col items-center justify-center
                  transition-all duration-200 border-2
                  ${
                    chair.status === 'empty'
                      ? 'bg-[#5B9844]/10 border-[#5B9844] hover:bg-[#5B9844]/20'
                      : 'bg-destructive/10 border-destructive hover:bg-destructive/20'
                  }
                  ${path ? 'cursor-pointer' : ''}
                `}
              >
                <IconArmchair
                  size={24}
                  className={chair.status === 'empty' ? 'text-[#5B9844]' : 'text-destructive'}
                />
                <span className="font-bold text-lg mt-1">{chair.noChair}</span>
                <Badge
                  variant={chair.status === 'empty' ? 'secondary' : 'destructive'}
                  className="mt-1 text-xs"
                >
                  {chair.status === 'empty' ? 'Kosong' : 'Terisi'}
                </Badge>

                {path && (
                  <Box className="absolute inset-0 bg-destructive/90 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <IconTrash size={28} className="text-white" />
                  </Box>
                )}
              </Box>
            </button>
          ))}
        </Box>

        {chairs.length === 0 && (
          <Box className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <IconArmchair size={48} className="mb-3 opacity-50" />
            <p className="text-sm">Belum ada kursi</p>
            {path && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setOpenModal!('Chair')}
              >
                <IconPlus size={18} />
                Tambah Kursi Pertama
              </Button>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default Chairs;
