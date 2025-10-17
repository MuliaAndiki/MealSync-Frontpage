import { SpreedType } from '@/types/ui';
const Spreed: React.FC<SpreedType> = ({ className, orientation }) => {
  return (
    <div
      className={`
        bg-foreground
        ${orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px'} 
        ${className}
      `}
    ></div>
  );
};

export default Spreed;
