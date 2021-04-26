import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import pollsApi from "apis/polls";
import { logger } from "common/logger";

import Container from "components/Container";
import PageLoader from "components/PageLoader";
import PollForm from "./Form/PollForm";
import Logger from "js-logger";

const EditPoll = ({ history }) => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [options, setOptions] = useState([
    { title: "" },
    { title: "" },
    { title: "" },
    { title: "" },
  ]);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await pollsApi.update(id, {
        poll: { title, options_attributes: options },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      Logger.error(error);
    }
  };

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

  useEffect(() => {
    fetchPollDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <PollForm
        type="update"
        title={title}
        options={options}
        setTitle={setTitle}
        setOptions={setOptions}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default EditPoll;
