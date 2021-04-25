import React from "react";
import PropTypes from "prop-types";

const Option = ({
  option,
  votedOptionId,
  setVotedOptionId,
  getVotePercentage,
}) => {
  return (
    <li className="my-6 block w-full relative pt-1">
      <div>
        <span
          className={`border rounded p-3 w-3/4 inline-block cursor-pointer
        hover:bg-bb-blue hover:text-white ${
    option.id === votedOptionId ? "bg-blue-600 text-white shadow-md" : ""
    }`}
          onClick={() => setVotedOptionId(option.id)}
        >
          {option?.title}
        </span>

        <span className="w-1/4 pl-4 ">
          {getVotePercentage(option.click_count)}%
        </span>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
        <div
          style={{
            width: getVotePercentage(option.click_count) + "%",
          }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
        ></div>
      </div>
    </li>
  );
};

Option.propTypes = {
  option: PropTypes.object,
  isVoted: PropTypes.bool,
  setVotedOptionId: PropTypes.func,
  getVotePercentage: PropTypes.func,
};

export default Option;
