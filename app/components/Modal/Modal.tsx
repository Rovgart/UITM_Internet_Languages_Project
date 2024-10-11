import React, { ReactNode } from "react";

const Backdrop = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black opacity-50"></div>
  );
};
const Modal = ({
  width,
  height,
  children,
  top,
  left,
  right,
  bottom,
}: {
  width: string;
  height: string;
  children?: ReactNode;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}) => {
  return (
    <div className="relative">
      <Backdrop />

      <div
        className={`fixed animate-[slideFromBottom_0.3s_ease_in_out] w-[${width}] z-[1000] h-[${height}] relative top-[${top}] right-[${right}] left-[${left}] bottom-[${bottom}] bg-white border-slate-500 `}
      >
        <div className="bg-midnight_green-500 text-midnight_green-900 w-screen fixed bottom-0  ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
