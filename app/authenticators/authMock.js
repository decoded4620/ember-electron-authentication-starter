/* jscs:disable requireDotNotation */
/* global Auth0Lock */
import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

const { inject:{ service }, RSVP, isEmpty, run, computed } = Ember;
const assign = Ember.assign || Ember.merge;

/**
  Authenticator Mock

  This authenticator also automatically refreshes access tokens (see
  [RFC 6749, section 6](http://tools.ietf.org/html/rfc6749#section-6)) if the
  server supports it.

  @class Auth0Authenticator
  @extends BaseAuthenticator
  @public
*/

export default BaseAuthenticator.extend({
  /**
    Triggered when the authenticator refreshed the access token (see
    [RFC 6749, section 6](http://tools.ietf.org/html/rfc6749#section-6)).

    @event sessionDataUpdated
    @param {Object} data The updated session data
    @public
  */

  /**
    The client_id of your application.

    @property clientId
    @type String
    @default null
    @public
  */
  clientId: null,
  sessionAccount: service('session-account'),

  /**
    The auth0Domain of your account.

    @property auth0Domain
    @type String
    @default null
    @public
  */
  auth0Domain: null,
  
  /**
   * Options you'd like to pass into the Auth0Lock authentication mechanism
   * Which can alter how the user flow works. 
   * 
   * For example, you can set sso:false, and redirect:false, in  your lockOptions
   * object to have the entire flow happen in a popup window. This helps for
   * electron apps. Otherwise, you may want to host a callback to handle authentication
   * you can simply set lockOptions.redirect = 'http://localhost:4200' or 'http://yourprodsite.com' etc.
   * and the Authenticator will redirect upon authentication to your hosted callback page with
   * 
   * @property lockOptions
   * @type Object
   * @default null
   * @public
   * authentication data.
   */
  lockOptions:null,

  /**
    Authenticates the session
    @method authenticate
    @param {String} hash The callback url hash
    @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
    @public
  */
  authenticate(hash) {
    return new RSVP.Promise((resolve, reject) => {
    	
    
      localStorage.setItem('token', 'deadbeef');
      
      var acct = {
    		  
      };
      localStorage.setItem('profile', JSON.stringify(acct));
      
      this.set('account', acct);
      
      resolve();
//      
//      var lock = new Auth0Lock(this.clientId, this.auth0Domain, this.lockOptions);
//      
//      // handle the locks lifecycle
//      lock.on("authenticated", (authResult) => {
//        // Use the token in authResult to getProfile() and save it to localStorage
//        lock.getProfile(authResult.idToken, (error, profile) => {
//          if (error) {
//            reject(error);
//          }
//
//          localStorage.setItem('token', authResult.idToken);
//          localStorage.setItem('profile', JSON.stringify(profile, null, ' '));
//
//          lock.hide();
//
//          resolve(authResult);
//        });
//      });
//      
//      // show the lock
//      lock.show();
      
    }.bind(this));
  },

  /**
    Makes a request to the OAuth 2.0 server.

    @method makeRequest
    @param {String} url The request URL
    @param {Object} data The request data
    @return {jQuery.Deferred} A promise like jQuery.Deferred as returned by `$.ajax`
    @protected
  */
  makeRequest(url, data) {
	 
    const options = {
      url,
      data,
      type:        'POST',
      dataType:    'json',
      contentType: 'application/json'
    };

    return Ember.$.ajax(options);
  },
  
  restore(data) {
    return Ember.RSVP.resolve(data);
  }

});
