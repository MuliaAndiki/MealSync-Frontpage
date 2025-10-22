import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/hooks/dispatch/dispatch';
import { useAppSelector } from '@/hooks/dispatch/dispatch';
import { useAlert } from '@/hooks/useAlert/costum-alert';

export function useAppNameSpase() {
  const currentRole = useAppSelector((state) => state.auth.currentUser?.user.role);
  const alert = useAlert();
  const currentRedirect = useAppSelector((state) => state.otp.source);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  return { alert, router, dispatch, queryClient, currentRole, currentRedirect };
}
