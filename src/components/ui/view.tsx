import { DivProps } from '@/types/ui';

export default function View({ as: Tag = 'section', children, className }: DivProps) {
  return <Tag className={className}>{children}</Tag>;
}
