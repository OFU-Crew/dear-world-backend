const Success = (data) => {
  return {
    code: 1,
    data: data,
  };
};

const Failure = (message) => {
  return {
    code: 0,
    message: message,
  };
};

module.exports = {
  Success,
  Failure,
};
