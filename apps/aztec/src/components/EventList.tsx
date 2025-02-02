const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  return (
    <div className="p-5 rounded-md border-2 border-gray-300 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-600"></h1>
        <span className="text-gray-300 text-xs"></span>
      </div>
      <p className="mt-2 text-gray-400 text-sm"></p>
    </div>
  );
};

export default EventList;
