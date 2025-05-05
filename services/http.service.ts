import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
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
        return Promise.reject(
          new Error(`${status}: ${data?.errors[0]?.message}`)
        );
      }
      // For network errors (no response from server)
      return Promise.reject(new Error(`Network error: ${error.message}`));
    }
  );
};

configure();

const httpService = axiosInstance;
export default httpService;
