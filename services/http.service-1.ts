import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  withCredentials: true,
});

const configure = () => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        // When the response has a non-2xx status code
        const { status, data } = error.response;
        return Promise.reject(new Error(`${status}: ${data.error}`));
      }
      // For network errors (no response from server)
      return Promise.reject(new Error(`Network error: ${error.status}`));
    }
  );
};

configure();

const httpServiceClient = axiosInstance;
export default httpServiceClient;
