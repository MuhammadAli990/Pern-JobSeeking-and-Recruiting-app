import React from "react";

function AppliedJobCard(props) {
  const {data} = props;

  return (
    <div className="flex flex-col gap-2 px-4 border-b py-4">
      <div className="flex items-center gap-2">
        <div>
          <img className="w-10 h-10 rounded-full" src="/profile.png" />
        </div>
        <div>
          <h3 className="font-bold text-lg">{data?.username}</h3>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-1">
          {data?.title}
        </h4>
      </div>

      <div className="flex items-center justify-between">
        <div className={`${data?.response=="accepted"?"bg-green-500":data?.response=="rejected"?"bg-red-500":"bg-gray-500"} bg-gray-700 text-white px-4 py-1 rounded-full text-sm font-semibold`}>
          {data.response}
        </div>
        {/* <div className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
          approved
        </div> */}
        <p className="font-semibold text-sm">Deadline: {data?.deadline}</p>
      </div>
    </div>
  );
}

export default AppliedJobCard;
