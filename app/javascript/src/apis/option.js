import axios from "axios";

const update = (poll_id, id) => axios.put(`/polls/${poll_id}/options/${id}`);

const optionsApi = {
  update,
};

export default optionsApi;
