import axios from "axios";
import { POLLS_URL } from "./utils";

const list = () => axios.get("/polls");

const pollsApi = {
  list,
};

export default pollsApi;
