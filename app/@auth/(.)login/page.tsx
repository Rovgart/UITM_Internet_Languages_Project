import Modal from "@/app/components/Modal/Modal";
import React from "react";
import LogForm from "../../components/SignInForm/LogForm";
type Props = {};

const page = (props: Props) => {
  return (
    <Modal
      width="300px"
      height="500px"
      top={50}
      bottom={50}
      right={20}
      left={20}
    >
      <LogForm />
    </Modal>
  );
};

export default page;
