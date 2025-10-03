import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/dispatch/dispatch';
import { useAlert } from '@/hooks/useAlert/costum-alert';
import { useQueryClient } from '@tanstack/react-query';

export function useAppNameSpase() {
  const alert = useAlert();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  return { alert, router, dispatch, queryClient };
}
