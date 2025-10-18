import Box from '@/components/ui/box';
import { Skeleton } from '@/components/ui/skeleton';

export const OrderDetailSkeleton = () => {
  return (
    <Box className="w-full min-h-screen py-6 px-4 sm:px-0">
      <Box className="mb-6">
        <Skeleton className="w-32 h-10 mb-4" />
        <Box className="flex items-start justify-between">
          <Box className="space-y-2">
            <Skeleton className="w-64 h-8" />
            <Skeleton className="w-48 h-6" />
          </Box>
          <Skeleton className="w-24 h-8 rounded-full" />
        </Box>
      </Box>

      <Box className="grid lg:grid-cols-3 gap-6">
        <Box className="lg:col-span-2 space-y-6">
          <Box className="p-6 border rounded-lg space-y-4">
            <Skeleton className="w-48 h-6 mb-4" />
            <Box className="grid sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Box key={i} className="space-y-2">
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-full h-6" />
                </Box>
              ))}
            </Box>
          </Box>

          <Box className="p-6 border rounded-lg space-y-4">
            <Skeleton className="w-32 h-6 mb-4" />
            {Array.from({ length: 3 }).map((_, i) => (
              <Box key={i} className="p-3 border rounded space-y-2">
                <Box className="flex justify-between">
                  <Skeleton className="w-48 h-5" />
                  <Skeleton className="w-24 h-5" />
                </Box>
                <Skeleton className="w-32 h-4" />
              </Box>
            ))}
          </Box>
        </Box>

        <Box className="space-y-6">
          <Box className="p-6 border rounded-lg space-y-4">
            <Skeleton className="w-40 h-6 mb-4" />
            <Box className="space-y-3">
              <Box className="flex justify-between">
                <Skeleton className="w-20 h-5" />
                <Skeleton className="w-28 h-5" />
              </Box>
              <Skeleton className="w-full h-px" />
              <Box className="flex justify-between">
                <Skeleton className="w-16 h-6" />
                <Skeleton className="w-32 h-8" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const EditProfileSkeleton = () => {
  return (
    <Box className="w-full min-h-screen p-6">
      <Skeleton className="w-48 h-10 mb-6" />
      
      <Box className="max-w-4xl mx-auto space-y-6">
        <Box className="flex items-center gap-6 p-6 border rounded-lg">
          <Skeleton className="w-32 h-32 rounded-full" />
          <Box className="flex-1 space-y-3">
            <Skeleton className="w-48 h-6" />
            <Skeleton className="w-full h-10 rounded" />
          </Box>
        </Box>

        <Box className="p-6 border rounded-lg space-y-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Box key={i} className="space-y-2">
              <Skeleton className="w-32 h-5" />
              <Skeleton className="w-full h-12 rounded" />
            </Box>
          ))}

          <Box className="space-y-2">
            <Skeleton className="w-32 h-5" />
            <Skeleton className="w-full h-32 rounded" />
          </Box>

          <Box className="flex gap-4 pt-4">
            <Skeleton className="flex-1 h-12 rounded" />
            <Skeleton className="w-32 h-12 rounded" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const SettingsSkeleton = () => {
  return (
    <Box className="w-full min-h-screen p-6">
      <Skeleton className="w-48 h-10 mb-6" />
      
      <Box className="max-w-4xl mx-auto space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Box key={i} className="p-6 border rounded-lg space-y-4">
            <Skeleton className="w-40 h-6" />
            <Skeleton className="w-full h-4" />
            
            <Box className="space-y-3 pt-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <Box key={j} className="flex items-center justify-between py-3 border-b">
                  <Box className="space-y-1">
                    <Skeleton className="w-48 h-5" />
                    <Skeleton className="w-64 h-4" />
                  </Box>
                  <Skeleton className="w-12 h-6 rounded-full" />
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const EditMenuSkeleton = () => {
  return (
    <Box className="w-full min-h-screen p-6">
      <Skeleton className="w-48 h-10 mb-6" />
      
      <Box className="max-w-4xl mx-auto space-y-6">
        <Box className="p-6 border rounded-lg space-y-4">
          <Skeleton className="w-32 h-5" />
          <Skeleton className="w-full h-64 rounded-lg" />
        </Box>

        <Box className="p-6 border rounded-lg space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Box key={i} className="space-y-2">
              <Skeleton className="w-32 h-5" />
              <Skeleton className="w-full h-12 rounded" />
            </Box>
          ))}

          <Box className="flex gap-4 pt-4">
            <Skeleton className="flex-1 h-12 rounded" />
            <Skeleton className="w-32 h-12 rounded" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
