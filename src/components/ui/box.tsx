import { DivProps } from '@/types/ui';
export default function Box({ as: Tag = 'div', children, className }: DivProps) {
  return <Tag className={className}>{children}</Tag>;
}
