const Mail=require("../models/Mail");
const mongoose =require("mongoose")

module.exports.addMailToDB = async (req) => {
  const { receiver, subject, message } = req.body;

  try {
    const sender = req.user.email;

    // Sent mail entry (owned by sender)
    const sentMail = new Mail({
      user: sender,
      from: sender,
      to: receiver,
      subject,
      message,
      read: true,
      type: "sent"
    });

    // Inbox mail entry (owned by receiver)
    const inboxMail = new Mail({
      user: receiver,
      from: sender,
      to: receiver,
      subject,
      message,
      read: false,
      type: "inbox"
    });

    await sentMail.save();
    await inboxMail.save();

    return { status: 201, message: "Mail Sent" };

  } catch (e) {
    console.log(e);
    return { status: 409, error: e.message };
  }
};


module.exports.getMailsFromDB = async (req) => {
  try {
    const result = await Mail.find({
      user: req.user.email,
      type: "inbox"
    });

    const data = result.map(({ _id, from, subject, message, read }) => ({
      _id, from, subject, message, read
    }));

    return { status: 200, data };
  } catch (error) {
    return { status: 400, error };
  }
};


module.exports.getSentMailFromDB = async (req) => {
  try {
    const result = await Mail.find({
      user: req.user.email,
      type: "sent"
    });

    const data = result.map(({ _id, to, subject, message }) => ({
      _id, to, subject, message
    }));

    return { status: 200, data };
  } catch (error) {
    return { status: 400, error };
  }
};

module.exports.getMailFromDB = async (req) => {
  const { id } = req.params;

  try {
    const result = await Mail.findOne({
      _id: new mongoose.Types.ObjectId(id),
      user: req.user.email  // only allow access to own mails
    });

    if (!result) return { status: 404, message: "Mail not found" };

    // mark as read if it's an inbox mail
    if (result.type === "inbox" && !result.read) {
      result.read = true;
      await result.save();
    }

    const { _id, to, from, subject, message, read } = result;
    return { status: 200, data: { _id, to, from, subject, message, read } };

  } catch (error) {
    console.log(error);
    return { status: 400, error };
  }
};


module.exports.deleteMailFromDB = async (req) => {
  const { id } = req.params;

  try {
    const result = await Mail.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
      user: req.user.email     });

    if (result.deletedCount > 0) {
      return { status: 200, message: "Email Deleted" };
    } else {
      throw new Error("Mail not found or not yours");
    }

  } catch (error) {
    console.log(error);
    return { status: 400, error };
  }
};
