import axios from "axios";

axios.defaults.baseURL =
  "https://drf-api-app-gaysha-repeat-150999686cdd.herokuapp.com/";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
