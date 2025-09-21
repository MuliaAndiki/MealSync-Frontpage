import React from 'react';
import { DivProps } from '@/types/ui';

const Form: React.FC<DivProps> = ({ children, className, onSubmit, ...props }) => {
  return (
    <form className={className} {...props} onSubmit={onSubmit!}>
      {children}
    </form>
  );
};

export default Form;
