import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl bg-aztecBlack-dark p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-aztecBlue">
          2024/25
        </span>
        <FontAwesomeIcon icon={faEllipsis} className="text-white w-5" />
      </div>
      <h1 className="text-2xl font-semibold my-4 text-white">1,234</h1>
      <h2 className="capitalize text-sm font-medium text-gray-200">{type}s</h2>
    </div>
  );
};

export default UserCard;
