import Ember from 'ember';
import config from 'ember-electron-authentication-starter/config/environment';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {

  sessionInvalidated() {
    this.transitionTo('index');
  },

  sessionAccount: service('session-account'),

  beforeModel() {
	// configure the session account service
	var acct = this.get('sessionAccount');
	
	// TODO - decouple this for other authenticators
	// auth0 configuration
	acct.set('configuration', config.Auth0);

    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser().catch(() => this.get('session').invalidate());
  },

  _loadCurrentUser() {
    return this.get('sessionAccount').loadCurrentUser();
  }
});
