import axios from "axios";

const count = (poll_id, id) => axios.put(`/polls/${poll_id}/options/${id}`);

const optionsApi = {
  count,
};

export default optionsApi;
