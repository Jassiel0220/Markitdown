import type { ReactNode } from 'react';
import './Container.css';

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="container">
      {children}
    </div>
  );
};
