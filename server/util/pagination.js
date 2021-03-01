/**
 * A function that converts the user page and size needs to limit and offset for the database
 * @param {Request} req http request
 * @param {Response} res http response
 * @returns the limit offset and current page
 */

exports.pagination = ({ page, size }) => {
  const limit = size || 10;
  page = page || 1;
  const offset = (page - 1) * limit;

  return { offset, limit, page };
};
