const Response = (code, message, data) => {
  return {
    code: code,
    message: message,
    data: data,
  };
};

const Success = (data) => {
  return Response(1, null, data);
};

const Failure = (message) => {
  return Response(0, message, null);
};

module.exports = {
  Success,
  Failure,
};
