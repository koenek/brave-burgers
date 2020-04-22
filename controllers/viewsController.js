const path = require('path');

exports.getHomePage = (req, res) => {
  try {
    res
      .status(200)
      .sendFile(path.join(__dirname, '..', '/public/templates/index.html'));
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
