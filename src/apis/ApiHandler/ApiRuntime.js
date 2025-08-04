import axios from "axios";

import {} from "../../Stores";

import { DefaultSuccessHandler, DefaultErrorHandler } from "./DefaultHandler";

const Runtime = async ({ url, method, options = {} }) => {
  let {
    params = {}, // query params
    data = undefined, // body data
    Authorization = "",
    successHandler = undefined,
    finallyHandler = undefined,
    ContentType = "application/json",
    header = {},
  } = options;
  try {
    // Create an axios instance
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_SERVER,

      timeout: 120 * 1000,

      headers: {
        // Default accept header set to json
        // 'Content-Type': 'application/json',

        // Reset JWT authorization token if gave
        ...(Authorization && {
          Authorization: `${Authorization}`,
        }),
        ...(ContentType && {
          "Content-Type": ContentType,
        }),
        ...header,
      },
    });

    let res;
    if (["patch", "post", "put"].includes(method)) {
      res = await instance[method](url, data, { params });
    } else if (method === "delete") {
      res = await instance.delete(url, {
        params,
        data, // axios 支援 data in delete config
      });
    } else {
      res = await instance[method](url, { params, data });
    }

    if (typeof successHandler === "function") {
      await successHandler(res);
    }
    await DefaultSuccessHandler(res);

    // dispatch api action to saga
    return res;
  } catch (err) {
    // if error has normal response, use default handling
    // if custom handler is gave, use it
    let errorObject = err;
    if (err.response) {
      errorObject = err.response;
    }
    await DefaultErrorHandler(errorObject);

    // throw error in the end
    throw errorObject;
  } finally {
    if (typeof finallyHandler === "function") {
      await finallyHandler();
    }
  }
};

export default Runtime;
