import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { Events } from '/imports/api/event/Event.js';
import { SyncedCron } from 'meteor/percolate:synced-cron';

Meteor.methods({
  'sendTestEmail': function (toEmail) {
    Email.send({
      to: toEmail,
      from: 'happeningatmanoa@gmail.com',
      subject: 'Test E-Mail',
      text: 'This is a test email!',
    });
  },
});

// Define a scheduled task using percolate:synced-cron
SyncedCron.add({
  name: 'SendEmails',
  schedule(parser) {
    return parser.recur().on('10:50:00').time();
    // This schedule will run every day at specified time
  },
  job() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const nextDay = currentDate.getDate() + 1;
    if (Events) {
      const events = Events.find({
        $expr: {
          $and: [
            { $eq: [{ $year: '$startDate' }, currentYear] }, // Check if year is the same
            { $eq: [{ $month: '$startDate' }, currentMonth] }, // Check if month is the same
            { $eq: [{ $dayOfMonth: '$startDate' }, nextDay] }, // Check if day is one after today
          ]
        }
      }).fetch();

      events.forEach((event) => {
        event.rsvpList.forEach((email) => {
          Meteor.call('sendTestEmail', email, (error, result) => {
            if (error) {
              console.error('Error sending email:', error);
            } else {
              console.log('Email sent successfully:', result);
            }
          });
        });
      });
      Meteor.call('sendTestEmail', 'ravenmq@hawaii.edu', (error, result) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent successfully:', result);
        }
      });
    }
    else
    {
      console.log('Events Collection empty or undefined');
    }
  },
});

// Startup the application by rendering the App layout component.
Meteor.startup(() => {
  SyncedCron.start();
});
