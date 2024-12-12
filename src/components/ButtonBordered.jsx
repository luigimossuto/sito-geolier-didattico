import { Button } from "@nextui-org/react";
import React from "react";

const ButtonBordered = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className={`
        bg-colorefooter-default 
        border-2 
        border-titolo-default 
        opacity-90
        transition-all
        duration-700
        ease-in-out
        hover:bg-titolo-default
        hover:opacity-100
        ${className || ''}
      `}
      radius="full"
      {...props}
    >
      {children}
    </Button>
  );
});

ButtonBordered.displayName = 'ButtonBordered';

export default ButtonBordered;
