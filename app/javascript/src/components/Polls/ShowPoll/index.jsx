import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import pollsApi from "apis/polls";
import Actions from "./Actions";
import Container from "components/Container";
import Option from "./Option";
import PageLoader from "components/PageLoader";
import optionsApi from "../../../apis/option";
import Logger from "js-logger";
import { round } from "../../../helpers/utils";

const ShowPoll = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [votedOptionId, setVotedOptionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isVoted, setIsVoted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current_count = 0;
    options.map(option => {
      current_count += parseInt(option.click_count);
    });
    setCount(current_count);
  }, [options]);

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(id);
      setTitle(response.data.poll.title);
      setOptions(response.data.options);
    } catch (error) {
      Logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await optionsApi.update(id, votedOptionId);
      setLoading(false);
      setIsVoted(true);
      fetchPollDetails();
    } catch (error) {
      Logger.error(error);
      setLoading(false);
    }
  };

  const getVotePercentage = currentCount => {
    if (count === 0) {
      return "0";
    }
    return round((parseInt(currentCount) / count) * 100, 2);
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="w-3/4 mx-auto shadow-2xl rounded-lg py-6 mt-10">
        <h1 className="pb-4 px-6 text-xl font-bold border-b text-bb-blue">
          {title}
        </h1>
        <ul className="mb-6 mt-3 px-6">
          {options?.map(option => (
            <Option
              key={option.id}
              option={option}
              votedOptionId={votedOptionId}
              setVotedOptionId={setVotedOptionId}
              getVotePercentage={getVotePercentage}
            />
          ))}
        </ul>

        <Actions
          isVoted={isVoted}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </div>
    </Container>
  );
};

export default ShowPoll;
