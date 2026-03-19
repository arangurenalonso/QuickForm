import React from 'react';
import { Button } from '@/common/libs/ui/button';
import { ImSpinner2 } from 'react-icons/im';

type ActionButtonProps = {
  funcSave: () => Promise<void>;
  funcCancel: () => void;
  isSubmitting: boolean;
};

const ActionButton = ({
  funcSave,
  funcCancel,
  isSubmitting,
}: ActionButtonProps) => {
  return (
    <div className="flex space-x-4">
      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={funcCancel}
      >
        Close
      </Button>

      <Button onClick={funcSave} disabled={isSubmitting} className="w-full">
        {!isSubmitting ? (
          <span>Save</span>
        ) : (
          <ImSpinner2 className="animate-spin" />
        )}
      </Button>
    </div>
  );
};

export default ActionButton;
