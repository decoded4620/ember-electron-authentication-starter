# ember-electron-authentication-starter

After hours of toil and tweaking existing projects and tutorials to get proper Ember-Simple-Auth working with Ember-Authenticators within the Electron (Atom) Shell, I present to you... A Solution that works out of the box. Simply clone this repository, run the application, and follow the setup instructions until you're able to authenticate. Once you've done this, make your initial commit, and then customize away!

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone https://github.com/decoded4620/ember-electron-authentication-starter.git` this repository
* `cd ember-electron-authentication-starter`
* `npm install`
* `bower install`

## Running / Development

### Running outside of Electron
* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running inside of Electron
* `ember electron`
* or
* `ember electron --server`

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

#### Running within Electron
* `ember electron:test`
* `ember electron:test --server`

#### Outside of Electron
* `ember test`
* `ember test --server`

### Building

* `ember electron` will build and run the project.

#### To Build

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying


## Related Repositories
* [ember-electron](https://github.com/felixrieseberg/ember-electron)
* [ember-simple-auth](https://github.com/simplabs/ember-simple-auth)

## Contributing
Feel free to send me a pull request if you see an improvement that can be made for new users who need to get authentication up quickly!
My goal is to keep this as simple as possible!

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

