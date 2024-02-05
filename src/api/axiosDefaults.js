// This setup is particularly useful in applications that interact with a REST API, as it ensures consistent and efficient communication with the backend.
// The axiosDefaults.js file sets up default configurations for Axios to simplify making HTTP requests throughout your application.
// Axios is often used to make HTTP requests from JavaScript to external servers and APIs. The configurations made in this file will apply to all Axios requests within your application, ensuring consistent behavior across your API calls.
import axios from "axios";

// By setting a baseURL, you reduce redundancy in your API calls.
// This sets the baseURL for all Axios requests. baseURL is prepended to the path specified in any request, making it easier to make requests to a common domain without repeating the domain in every call. For example, if you make a request to /api/users, Axios automatically prepends the baseURL, resulting in a full URL of https://drf-api-app-gaysha-repeat-150999686cdd.herokuapp.com/api/users. This is particularly useful when your application makes many requests to the same domain.
axios.defaults.baseURL =
  "https://drf-api-app-gaysha-repeat-150999686cdd.herokuapp.com/";

// Content-Type for POST requests streamlines file uploads.
// This line sets the default Content-Type header for all POST requests to multipart/form-data. This header is important when you're uploading files to a server, as it indicates that the request body contains form data that could include text fields and files. Setting this as a default is useful if your application frequently uploads files and you want to avoid setting the header for each individual POST request that uploads data.
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

// Enabling withCredentials ensures that cookies and authentication headers are included in cross-origin requests, facilitating authenticated sessions between your frontend and backend.
// This configuration tells Axios to send credentials (such as cookies or HTTP authentication) with every request. This is crucial for making requests to APIs where authentication and session management are handled with cookies or other HTTP authentication methods. Setting withCredentials to true is necessary when your frontend and backend are served from different domains (or subdomains) and you need to maintain a user session across these domains. It enables browsers to include cookies and authorization headers in your cross-origin requests to the backend.
axios.defaults.withCredentials = true;
