/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
module.exports = (io, socket) => {
  const createOrder = (payload) => {
    // ...
  };

  const readOrder = (orderId, callback) => {
    // ...
  };

  socket.on("order:create", createOrder);
  socket.on("order:read", readOrder);
};



module.exports = (io) => {
  const createOrder = function (payload) {
    const socket = this; // hence the 'function' above, as an arrow function will not work
    // ...
  };

  const readOrder = function (orderId, callback) {
    // ...
  };

  return {
    createOrder,
    readOrder
  };
};