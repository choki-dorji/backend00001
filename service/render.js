const axios = require("axios");

exports.createBlock = (req, res) => {
  axios
    .get("http://localhost:5000/block")
    .then(function (response) {
      res.render("block", { users: response.data });
    })
    .catch((err) => res.render(err));
};
