import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/event/Event';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.

// Publishes all events for any user, signed in or not.
Meteor.publish(Events.userPublicationName, () => Events.collection.find());

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
