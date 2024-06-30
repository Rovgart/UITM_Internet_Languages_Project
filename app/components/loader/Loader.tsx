import React from "react";
import { ClipLoader } from "react-spinners";
import Modal from "../Modal/Modal";
type Props = {};

const Loader = (props: Props) => {
  return (
    <Modal width={"300"} height={"300"} top={0} left={0} right={0} bottom={0}>
      <ClipLoader className="w-full h-full object-cover"></ClipLoader>
    </Modal>
  );
};

export default Loader;
