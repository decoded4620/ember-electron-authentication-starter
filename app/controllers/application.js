import Ember from 'ember';

const { inject:{ service }, RSVP, isEmpty, run, computed } = Ember;

export default Ember.Controller.extend({
  sessionAccount: service('session-account'),

  /**
   * @property 
   * The setter / getter handler for rememberMe, (which really wraps the sessionAccountService)
   * The idea is to have one point of interaction between authentication and the app, which any
   * page can benefit from
   */
  rememberMe:Ember.computed( {
    get(key) {
      return this.get('sessionAccount').getRememberMe();
    },
    set(key, value) {
      this.get('sessionAccount').setRememberMe(value);
      return value;
    }
  }),
  
  /**
   * @property
   * read-only is the user authenticated
   */
  isAuthenticated:Ember.computed( {
    get(key) {
        return this.get('sessionAccount').getAuthenticated();
    }
  }),
  
  /**
   * @property
   * The users account object
   */
  account:Ember.computed({
	  get(key){
		return this.get('sessionAccount').get('account');
	  }
  }),
  
  /**
   * Available Component Actions
   */
  actions: {
	/**
	 * @action
	 * remember the current user, making their next login a one-click
	 */
	remember(value){
		this.set('rememberMe', value);
	},
	/**
	 * @action
	 * log the user in
	 */
    goLogin() {
      this
      .get('sessionAccount')
      .loginCurrentUser()
      .then(()=>{
    	  this.set('isAuthenticated', true);
    	  this.transitionToRoute('user-profile');
      });
    },
    
    /**
     * @action
     * go home
     */
    goHome() {
      this
      .get('sessionAccount')
      .logoutCurrentUser()
      .then(() => { 
    	  this.set('isAuthenticated', false);
    	  this.transitionToRoute('index');
      });
    }
  }
});
