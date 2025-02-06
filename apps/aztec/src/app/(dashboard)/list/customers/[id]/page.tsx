import {
  faEnvelope,
  faLocationDot,
  faPhone,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const SingleCustomerPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-aztecBlack-dark py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold text-white">
                Neen Gutierrez
              </h1>
              <p className="text-sm text-gray-400">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-sm font-medium text-white">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-aztecBlue w-5"
                  />
                  <span>52 Applewood Dr</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-aztecBlue w-5"
                  />
                  <span>user@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-aztecBlue w-5"
                  />
                  <span>+1 403 123 4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Customer&apos;s Invoices</h1>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-aztecBlack-dark p-4 rounded-md text-white">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-white">
            <Link
              className="p-3 rounded-md bg-aztecBlue"
              href={`/list/invoices?customerId=customer1`}
            >
              Customer&apos;s Invoices
            </Link>
            <Link className="p-3 rounded-md bg-aztecBlue" href="/">
              Customer&apos;s Appointments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCustomerPage;
