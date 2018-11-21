/*
The delimiter is three semi-colons: ;;; 
the email body is split so the actual message is first and the scheduled time second
after the delimiter type a valid Javascript date. Ex.: 04 Dec 1995 00:12:00 GMT 
or simply use a Unix timestamp
*/

// This is for debugging/manual use - triggers the function immediately
function triggerImmediately() {
  ScriptApp.newTrigger('sendEmailsOrNot')
     .timeBased()
     .after(1) // miliseconds
     .create();
}


// This triggers my function every 1 hours.
// Google won't let you trigger it more frequently 
/*function createTimeDrivenTriggers() {
  ScriptApp.newTrigger('sendEmailsOrNot')
      .timeBased()
      .everyHours(1)
      .create();
}
*/

// loop through the drafts and extract the 
function sendEmailsOrNot() {

    const drafts = GmailApp.getDraftMessages();

    drafts.forEach(function(draft) {
        
      const draftUniqueId = "" + draft.getId();
      const message = GmailApp.getMessageById(draftUniqueId);
      
        const currentTime = new Date();      

        /// splits the actual message based on the delimiter
        const subject = message.getSubject().split(";;;");
      Logger.log("Scheduled time: %s", subject[1]);
      Logger.log("Current time: %s", currentTime);

        // for readability
        const scheduledTime = Date.parse(subject[1]);
        // Date.parse shouldn't really be used read the MDN documentation
        // for now follow the correct format: 04 Dec 1995 00:12:00 GMT (time is optional)
        // or a Unix timestamp
      
        // For debugging: temporarily hardcoding the schedule to send after 1 second
        // const scheduledTime = new Date(currentTime + 1000).getTime();
        
            if (scheduledTime) { // NaN
                if (scheduledTime >= currentTime) {                  
                    Logger.log("Scheduled");
                  
                  const options = {
                    cc: message.getCc(),
                    bcc: message.getBcc(),
                    htmlBody: message.getBody(),
                    replyTo: message.getReplyTo(),
                    attachments: message.getAttachments()
                  };
                  
                  /* Send a copy of the draft message and move it to Gmail trash */
                  GmailApp.sendEmail(message.getTo(), subject[0], message.getBody(), options);
                  message.moveToTrash();
                  Logger.log("Sent email by id: %s and moved the draft to trash", draftUniqueId);

                } else {
                    Logger.log("Date is in the past");
                }
            } else {
              Logger.log("Not Scheduled OR not a valid date: Date.parse throws NaN");
            }
    });
  
}

