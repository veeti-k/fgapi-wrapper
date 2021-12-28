export const apiErrorHandler = (err: any) => {
  if (!err.response) return console.log(new Error(`Api error. No response`));

  if (err.response.status === 502) return console.log(new Error("Api error. Api is offline."));

  if (err.response.status === 403)
    return console.log(new Error(`Api error. ${err.response.data.error}.`));

  if (err.response.status === 401)
    return console.log(new Error(`Api error. ${err.response.data.error}.`));

  // prettier-ignore
  if (err.response.status === 500)
    return console.log(new Error(`Api internal server error. ${err.response.data.error ? err.response.data.error : ""}.`));

  return console.log(new Error(`Api error. Status code: ${err.response.status}`));
};
