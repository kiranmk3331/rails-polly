import axios from "axios";

const create = id => axios.put(`/options/${id}`);

const optionsApi = {
  create,
};

export default optionsApi;
