import React from "react";

const Badge = ({ text }) => {
  return (
    <div className="bg-blue-500 w-[92px] h-[35px] text-white flex justify-center items-center text-base font-semibold hover:bg-blue-900 duration-300 cursor-pointer">
      {text}
    </div>
  );
};

export default Badge;
