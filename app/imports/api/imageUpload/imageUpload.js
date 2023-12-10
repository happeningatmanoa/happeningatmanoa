import * as fs from "fs";
import { FilesCollection } from 'meteor/ostrio:files'

const EventImages = new FilesCollection({
    collectionName: 'EventImages',
    storagePath: 'public/uploads/eventImages',
    allowClientCode: false, // Disallow remove files from Client
})

Meteor.methods({
    'imageUpload': function (orgName, eventName, filesData) {
        console.log("imageUpload method called");
        orgName = orgName.toLowerCase();
        orgName = orgName.replace(/\s/g, '');
        eventName = eventName.toLowerCase();
        eventName = orgName.replace(/\s/g, '');

        const eventDir = `public/uploads/${orgName}-${eventName}`;

        Meteor.wrapAsync(fs.mkdir)(eventDir, { recursive: true });
        
        const fileIds = [];

        filesData.forEach((fileData) => {
            const fileId = EventImages.insert(fileData, false, false);
            const newPath = `${eventDir}/${fileId._id}-${fileData.name}`;
            Meteor.wrapAsync(fs.rename)(fileData.path, newPath);

            fileIds.push(fileId._id);
        });

        return fileIds.map((id) => EventImages.findOne(id).url({ download: true }));
    }
});

export default EventImages;