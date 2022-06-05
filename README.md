# ordersheets
Record cryptocurrency orderbooks on Google Sheets utilizing the big storage (unlimited for some) of your Google Drive.
## Usage
- [Run the Express server](https://expressjs.com/en/starter/hello-world.html) provided in the *server* folder.
- Create an empty [Google Sheets](https://www.google.com/sheets/about/).
- Copy all .gs files from the *client* folder to the [Apps Script editor](https://developers.google.com/apps-script/guides/sheets) in your Google Sheets.
- Add a new script called ServerAddr.gs containing a single line `BASEURL = '[your api server url]';`
- After reloading your Google Sheets, you should have the new menu item "Settings" next to help. Click that and set all parameters there.
- Edit the `const TriggerMins = 10;` line in *Iteration.gs* to your desired updating frequency (in minutes)
- Set up a [time-driven trigger](https://developers.google.com/apps-script/guides/triggers/installable#time-driven_triggers) to run function `update()` at the frequency you declared in the last step.
