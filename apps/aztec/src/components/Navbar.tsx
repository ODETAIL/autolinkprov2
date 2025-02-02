import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import {
  faBullhorn,
  faCommentDots,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 rounded-full ring-[1.5px] ring-gray-300 px-2">
        <FontAwesomeIcon icon={faSearch} className="text-white w-4" />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <FontAwesomeIcon icon={faCommentDots} className="text-white w-5" />
        </div>
        <div className="rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <FontAwesomeIcon icon={faBullhorn} className="text-white w-5" />
          {/* <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            1
          </div> */}
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium text-white">
            {user?.fullName as string}
          </span>
          <span className="text-[10px] text-gray-300 text-right">
            {user?.publicMetadata?.role as string}
          </span>
        </div>
        {/* <Image src="/avatar.png" alt="" width={36} height={36} className="rounded-full"/> */}
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
