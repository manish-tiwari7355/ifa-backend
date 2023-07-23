const User = require("../../../models/User.model");
const Notification = require("../../../models/Notification.model");

/**
 *  Saves new follow notification and emits a socket event
 * @param {String} actor - user that is generating the action
 * @param {String} receiver - user that is receiving the notification
 * @param {Object} io - socket object
 */
const followAcceptedNotification = async (actor, receiver, io) => {
  try {
    const sender = await User.findOne(
      { _id: actor },
      { name: 1, _id: 1, user_handle: 1, avatar_url: 1 }
    );

    const message = `<span><strong>${sender.user_handle}</strong> accepted your follow request</span>`;
    const notification = new Notification({
      actor,
      verb: "follow-accept",
      message,
      subject: sender?.user_handle,
      receiver,
    });
    await notification.save();
    io.to(receiver.toString()).emit("new-notification", {
      actor,
      verb: "follow-accept",
      message,
      subject: sender?.user_handle,
      avatar: sender.avatar_url,
      receiver,
    });
  } catch (err) {
    console.log("err in follow accept notification service: ", err);
    return err;
  }
};

module.exports = followAcceptedNotification;
