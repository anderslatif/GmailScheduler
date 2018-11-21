# Gmail Scheduler
Gmail does not support scheduling emails so here's a script! 

## Why this exists 

Ever want to write an email but have it arrive at a certain time? Now you can. 

Strangely enough this simple feature has not been implemented in Gmail yet. 

A service called Boomerang exists. While they seem to have a very nice GUI the pricing is up to $49.99 per month!

Besides, are you sure you want a third party to access all your emails?

Instead, I created an open source Google app script. If you are programmer you should easily be able to read the code and understand what it does. You can run it yourself on Google's servers for free.

## How to 

Write an email. Put it in the drafts. In the subject line write a Javascript parsable date following the delimiter ;;; like this:
 
```
Subject line;;;21 Nov 2018 09:48 GMT
```

Google only allows setting a trigger every hour. This trigger will go through all the drafts and if it finds a date that is older than your current time in your timezone then it will send the draft and delete it. 


## Google App Script how to

There are many ways to create and run the script. The easiest would be to open Google Drive and right click. Select: More > Google Apps Script. 

Make sure to understand this script before you paste it. Never run code you don't fully understand. Feel free to ask. 

In the Google Apps Script window select Edit > Current Projects Trigger. A new tab opens.

At the time of writing there is a plus icon at the bottom right. You can set up a trigger that runs the function sendEmailsOrNot directly every x amount of minutes or hours.

You can also choose to be notified immediately if the script fails. The script is not supposed to fail ever so feel free to send a bug report through Github. 

## To do

Is parsing from Unix timestamp a desired feature? We could use 3 colons as a delimiter for that. Please let me know. 

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Two things we need to consider:

* How can we make the code more readable?

* How can we make it easier to use?

## License
[MIT](https://choosealicense.com/licenses/mit/)
