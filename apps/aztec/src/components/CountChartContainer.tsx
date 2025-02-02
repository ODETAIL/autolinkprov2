import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CountChartContainer = async () => {
  return (
    <div className="bg-aztecBlack-dark rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center text-white">
        <h1 className="text-lg font-semibold">Students</h1>
        <FontAwesomeIcon icon={faEllipsis} className="w-5" />
      </div>
    </div>
  );
};

export default CountChartContainer;
