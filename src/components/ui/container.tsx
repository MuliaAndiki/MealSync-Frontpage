import { DivProps } from '@/types/ui';

export default function Container({ as: Tag = 'main', children, className }: DivProps) {
  return <Tag className={className}>{children}</Tag>;
}
