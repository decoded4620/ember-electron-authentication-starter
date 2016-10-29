import Auth0Authenticator from './Auth0Authenticator';
import config from 'ember-electron-authentication-starter/config/environment';

export default Auth0Authenticator.extend({
 // config Auth0 (see environment.js)
  clientId: config.Auth0.clientId,
  auth0Domain: config.Auth0.domain,
  lockOptions: config.Auth0.lockOptions
});
