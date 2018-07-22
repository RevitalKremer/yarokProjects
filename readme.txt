development environment setup (first time):
$ npm install
$ bower install
$ gulp
$ gulp telerik-files
$ gulp dev

from this point serving dev environment requires:
$ gulp dev

-----------------------------------------------------
production environment setup (first time):
$ npm install -g local-web-server
$ gulp
$ ws -d [application root directory]

from this point serving prod environment requires:
$ gulp
$ ws -d [application root directory]

client deployment:
$ gulp deploy
build and run server setup project in Setup/PhyFixxSetup solution
* Client directories structure under app folder must not be changed.
At any change make shure new folder is deployed (see gulp deploy script)

-----------------------------------------------------
Browser compatability:
If the browser not have some function you use,
go to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference 
Find function in help, find Polyfill for it.
Then copy Polyfill to end of script in app/scripts/Utils/polyfills.js