"use client";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SendButton = ({ invoiceId }: { invoiceId: number }) => {
  const handleButtonClick = async () => {
    try {
      await fetch("/api/emails", {
        method: "POST",
        body: JSON.stringify({
          invoiceId: invoiceId,
        }),
      });
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="w-7 h-7 flex items-center justify-center rounded-full bg-aztecGreen"
      >
        <FontAwesomeIcon icon={faPaperPlane} className="text-white w-5" />
      </button>
    </>
  );
};

export default SendButton;
