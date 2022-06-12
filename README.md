# ordersheets
Utilizing the big storage (unlimited for some) of your Google Drive, ordersheets is an Apps Script to record cryptocurrency orderbooks on Google Sheets.
## Usage
- [Run the Express server](https://expressjs.com/en/starter/hello-world.html) provided in the [server](https://github.com/kumkee/orderbook-api) folder.
- Create an empty [Google Sheets](https://www.google.com/sheets/about/).
- Copy all `.gs` files from the [client](https://github.com/kumkee/ordersheets/tree/main/client) folder to the [Apps Script editor](https://developers.google.com/apps-script/guides/sheets) in your Google Sheets.
- Add a new script called `ServerAddr.gs` containing a single line `BASEURL = '[your api server url]';`
- After reloading your Google Sheets, you should have the new menu item "Settings" next to help. Click that and set all parameters there.
- You will need to give permissions to the scripts the first time you run "Settings".
- Edit the `const TriggerMins = 10;` line in [`Iteration.gs`](https://github.com/kumkee/ordersheets/blob/main/client/Iteration.gs) to your desired updating frequency (in minutes)
- Set up a [time-driven trigger](https://developers.google.com/apps-script/guides/triggers/installable#time-driven_triggers) to run function [`update()`](https://github.com/kumkee/ordersheets/blob/main/client/Iteration.gs#L13) at the frequency you declared in the previous step.
## Library
To deploy the client as a library and reuse the code base for several orderbook records, please visit the [library](https://github.com/kumkee/ordersheets/tree/library) and [libraryUsage](https://github.com/kumkee/ordersheets/tree/libraryUsage) branches.
