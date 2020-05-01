const Email = require('../models/emailModel');
const EmailReceiver = require('../utils/emailReceiver');

exports.createEmail = async (req, res) => {
  try {
    const newEmail = await Email.create(req.body);

    await new EmailReceiver(newEmail).sendReceivedEmail();

    res.status(201).json({
      status: 'success',
      data: {
        newEmail,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
    console.log(err.message);
  }
};
