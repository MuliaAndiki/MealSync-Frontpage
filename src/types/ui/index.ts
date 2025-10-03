import { JSX } from 'react';
type ToastType = 'success' | 'error' | 'warning' | 'info' | 'question';
import z from 'zod';
export interface ModalProps {
  title: string;
  icon: ToastType;
  deskripsi: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

export interface ToastProps {
  title: string;
  icon?: ToastType;
  message: string;
  onVoid?: () => void;
}

export interface AlertContexType {
  toast: (p: ToastProps) => void;
  modal: (p: ModalProps) => void;
  confirm: (p: ModalProps) => Promise<boolean>;
}

export interface DivProps {
  children?: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  onSubmit?: (e: any) => void;
}

export interface PopUpProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}
