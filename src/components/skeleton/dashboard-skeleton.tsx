import Box from '@/components/ui/box';
import { Skeleton } from '@/components/ui/skeleton';

export const DashboardSkeleton = () => {
  return (
    <Box className="flex min-h-screen w-full">
      <Box className="grid grid-cols-[2fr_0.7fr] gap-2 w-full">
        <Box className="space-y-4 p-4">
          <Skeleton className="w-full h-[400px] rounded-lg" />

          <Box className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-1/3 h-[200px] rounded-lg" />
            ))}
          </Box>

          <Box className="flex gap-4">
            <Skeleton className="w-40 h-12 rounded-lg" />
            <Skeleton className="w-40 h-12 rounded-lg" />
          </Box>

          <Box className="grid grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-[280px] rounded-lg" />
            ))}
          </Box>
        </Box>

        <Box className="space-y-4 p-4">
          <Skeleton className="w-full h-[200px] rounded-lg" />
          <Skeleton className="w-full h-[400px] rounded-lg" />
        </Box>
      </Box>
    </Box>
  );
};

export const ProfileSkeleton = () => {
  return (
    <Box className="w-full min-h-screen p-6 space-y-6">
      <Box className="p-6 border rounded-lg space-y-4">
        <Box className="flex items-center gap-4">
          <Skeleton className="w-24 h-24 rounded-full" />
          <Box className="flex-1 space-y-2">
            <Skeleton className="w-48 h-8" />
            <Skeleton className="w-64 h-4" />
          </Box>
        </Box>

        <Box className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Box key={i} className="space-y-2">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-full h-10 rounded" />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export const OrderSkeleton = () => {
  return (
    <Box className="w-full min-h-screen p-6 space-y-4">
      <Box className="flex items-center justify-between mb-6">
        <Skeleton className="w-48 h-8" />
        <Skeleton className="w-32 h-10 rounded" />
      </Box>

      {Array.from({ length: 5 }).map((_, i) => (
        <Box key={i} className="p-6 border rounded-lg space-y-4">
          <Box className="flex justify-between">
            <Box className="space-y-2">
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-48 h-4" />
            </Box>
            <Skeleton className="w-24 h-8 rounded-full" />
          </Box>

          <Box className="space-y-2">
            {Array.from({ length: 3 }).map((_, j) => (
              <Skeleton key={j} className="w-full h-12 rounded" />
            ))}
          </Box>

          <Box className="flex justify-between border-t pt-4">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-32 h-8" />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export const HistorySkeleton = () => {
  return (
    <Box className="w-full min-h-screen p-6 space-y-4">
      <Skeleton className="w-64 h-10 mb-6" />

      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <Box key={i} className="p-4 border rounded-lg space-y-3">
            <Box className="flex justify-between">
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-20 h-6 rounded-full" />
            </Box>
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/4 h-4" />
            <Box className="flex justify-between items-center pt-3 border-t">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-28 h-8" />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const ManageSkeleton = () => {
  return (
    <Box className="w-full min-h-screen p-6">
      <Box className="flex gap-4 mb-6">
        <Skeleton className="w-32 h-12 rounded-lg" />
        <Skeleton className="w-32 h-12 rounded-lg" />
      </Box>

      <Box className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Box key={i} className="p-4 border rounded-lg space-y-3">
            <Skeleton className="w-full h-[200px] rounded-lg" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-3/4 h-4" />
            <Box className="flex gap-2">
              <Skeleton className="flex-1 h-10 rounded" />
              <Skeleton className="w-10 h-10 rounded" />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
