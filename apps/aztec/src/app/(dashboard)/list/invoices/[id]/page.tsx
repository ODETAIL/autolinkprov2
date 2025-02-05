import Image from "next/image";
import Link from "next/link";

const SingleInvoicePage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-aztecBlack-dark py-6 px-4 rounded-md flex-1 flex gap-4 text-white">
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">Cameron Moran</h1>
              <p className="text-sm text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium"></div>
            </div>
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full flex flex-col gap-4">
        <div className="bg-aztecBlack-dark p-4 rounded-md text-white">
          <h1 className="text-xl font-semibold">Invoice Preview</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleInvoicePage;
