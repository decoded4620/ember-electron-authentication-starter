import Ember from 'ember';
import config from 'ember-electron-authentication-starter/config/environment';

const { service } = Ember.inject;

import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin,{
	 session:        service('session'),
	 performAuthentication:function(){	 
		  this
		  .get('session')
		  .authenticate(config.Auth0.authenticator)
		  .then(() =>{})
		  .catch((reason) => {
			  this.set('errorMessage', reason.error);
		  });
	  
	  },
	  beforeModel: function() {
    	this.performAuthentication();
	    return this._super(...arguments);
	  }
});
