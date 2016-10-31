/* jshint node: true */
var auth0 = require('../auth0-variables');

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-electron-authentication-starter',
    environment: environment,
    rootURL: null,
    locationType: process.env.EMBER_CLI_ELECTRON ? 'hash' : 'auto',//'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    Auth0 : {
		clientId : auth0.AUTH0_CLIENT_ID,
		domain : auth0.AUTH0_DOMAIN,
		authenticator : 'authenticator:auth0',
		lockOptions : {
			auth : {
				params : {
					scope : 'openid email'
				},
				redirect : false,
				sso : false
			},
			allowForgotPassword: true,
			allowSignUp: true,
			loginAfterSignup: true,
			rememberLastLogin: false,
			mustAcceptTerms: false,
			initialScreen: 'signUp', // login | signUp | forgotPassword
			allowedConnections: null,
			socialButtonStyle: 'small', // small | big
			popupOptions: { width: 300, height: 500, left: 200, top: 300 },
			theme : {
				logo : './default_icon.jpg',
				primaryColor : '#33aa33',
				labeledSubmitButton:false
			},
			languageDictionary : {
				emailInputPlaceholder : "your@email.com",
				title : "Log In / Sign Up"
			},
			avatar : {
				url : function(email, cb) {
					// Obtain the avatar url for the email input by the
					// user, Lock
					// will preload the image before displaying it.
					// Note that in case of an error you call cb with the
					// error in
					// the first arg instead of `null`.
					var url = obtainAvatarUrl(email);
					cb(null, url);
				},
				displayName : function(email, cb) {
					// Obtain the display name for the email input by the
					// user.
					// Note that in case of an error you call cb with the
					// error in
					// the first arg instead of `null`.
					var displayName = obtainDisplayName(email);
					cb(null, displayName);
				}
			}
		}
	  },
	  APP: {
		  // Here you can pass flags/options to your application instance
		  // when it is created
	  }
  };

  if (environment === 'development') {
//     ENV.APP.LOG_RESOLVER = true;
     ENV.APP.LOG_ACTIVE_GENERATION = true;
//     ENV.APP.LOG_TRANSITIONS = true;
//     ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
//     ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
	  ENV['simple-auth'] = {
	    store: 'simple-auth-session-store:ephemeral'
	  }
    // Testem prefers this...
	// Testem prefers this...

    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
  }

  return ENV;
};

