import React from "react";

function Loader() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 z-50">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-black w-16 h-16"></div>
    </div>
  );
}

export default Loader;
