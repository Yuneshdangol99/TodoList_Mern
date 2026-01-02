import { apiError } from "../utils/apiError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof apiError) {
    return res
      .status(err.statusCode)
      .json({ sucesss: false, message: err.message });
  }

  console.error(err.stack);
  return res
    .status(500)
    .json({ sucesss: false, message: "Something went wrong" });
};

export default errorHandler;