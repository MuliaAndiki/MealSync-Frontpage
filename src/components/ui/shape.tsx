import { DivProps } from '@/types/ui';
export default function Shape({ children, className, as: Tag = 'canvas' }: DivProps) {
  return <Tag className={`${className} absolute`}>{children}</Tag>;
}
