import { useState } from 'react';
import { LayoutProps } from '../../interface';

const InstLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <h1>Instructor Layout</h1>
      <main className="mt-8">{children}</main>
    </>
  );
};

export default InstLayout;
