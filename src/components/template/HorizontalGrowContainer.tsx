import React from 'react';

type PropsType = {
  children: React.ReactNode;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
};

const HorizontalGrowContainer = ({
  children,
  leftElement,
  rightElement,
}: PropsType) => {
  return (
    <div className="grid grid-cols-[auto,1fr,auto] h-full w-full gap-1">
      {leftElement && (
        <div className="col-start-1 col-end-2">{leftElement}</div>
      )}

      <div className="col-start-2 col-end-3 overflow-hidden">{children}</div>

      {rightElement && (
        <div className="col-start-3 col-end-4">{rightElement}</div>
      )}
    </div>
  );
};

export default HorizontalGrowContainer;
