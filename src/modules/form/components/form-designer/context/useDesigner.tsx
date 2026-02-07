'use client';

import { DesignerContext } from '@/modules/form/components/form-designer/context/DesignerContext';
import { useContext } from 'react';

function useDesigner() {
  const context = useContext(DesignerContext);
  if (!context) {
    throw new Error('useDesigner must be used within a DesignerProvider');
  }
  return context;
}
export default useDesigner;
