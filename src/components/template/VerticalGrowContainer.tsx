import React from 'react';

type PropsType = {
  children: React.ReactNode;
  topElement?: React.ReactNode;
  bottomElement?: React.ReactNode;
};

const VerticalGrowContainer = ({
  children,
  topElement,
  bottomElement,
}: PropsType) => {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] w-full h-full gap-0">
      {topElement && <div className="row-start-1 row-end-2">{topElement}</div>}

      <div className="row-start-2 row-end-3 overflow-hidden">{children}</div>

      {bottomElement && (
        <div className="row-start-3 row-end-4">{bottomElement}</div>
      )}
    </div>
  );
};

export default VerticalGrowContainer;
