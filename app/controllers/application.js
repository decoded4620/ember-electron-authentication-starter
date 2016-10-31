import Ember from 'ember';

const { inject:{ service }, RSVP, isEmpty, run, computed } = Ember;

export default Ember.Controller.extend({
  sessionAccount: service('session-account'),
  actions: {
    transitionToLoginRoute() {
      this.transitionToRoute('login');
    },
    transitionToHomeRoute() {
      this.get('sessionAccount').logoutCurrentUser().then(() => {    	  
    	  this.transitionToRoute('index');
      });
    }
  }
});
