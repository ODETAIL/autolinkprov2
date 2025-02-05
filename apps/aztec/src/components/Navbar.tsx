import {
  faCommentDots,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white w-5" />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none text-white"
        />
      </div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <FontAwesomeIcon icon={faCommentDots} className="text-white w-5" />
        </div>
        {/* <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image src="/announcement.png" alt="" width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            1
          </div>
        </div> */}
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium text-white">
            John Doe
          </span>
          <span className="text-[10px] text-gray-200 text-right">Admin</span>
        </div>
        <Image
          src="/logo.png"
          alt=""
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
