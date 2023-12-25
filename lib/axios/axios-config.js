import axios from "axios";
import { baseURL } from "../const";

const instance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
});

export default instance;
