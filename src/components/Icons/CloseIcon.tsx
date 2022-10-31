import React from "react";

const CloseIcon = ({ color = "#000000", ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5858 11.9999L4.2218 5.63589L5.63602 4.22168L12 10.5856L18.3639 4.22168L19.7782 5.63589L13.4142 11.9999L19.7782 18.3638L18.3639 19.778L12 13.4141L5.63602 19.778L4.2218 18.3638L10.5858 11.9999Z"
        fill={color}
      />
    </svg>
  );
};

export default CloseIcon;
