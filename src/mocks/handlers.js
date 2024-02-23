import { rest } from "msw";

// we grab our API base URL for our mock responses
const baseURL = "https://drf-api-app-gaysha-repeat-150999686cdd.herokuapp.com/";

// array to store mocked request handlers
export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 2,
        username: "gennadiy-gaysha",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 2,
        profile_image:
          "https://res.cloudinary.com/dkglcxx4y/image/upload/v1/media/../gennadiy_gaysha_dc8uyh",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
