/*global $*/
import Ember from 'ember';

export default Ember.Component.extend({
 /**
  * Model Property to update the main nav remember-me checkbox.
  */
  rememberMe:		false,
  
  /**
   * Model Property to update the ui
   * checkbox and logout button
   */
  isAuthenticated:	false,
  
  /**
   * Component Actions
   */
  actions: {
	  /**
	   * Action: Toggle Remember Value
	   */
	  toggleRemember(){
		  this.sendAction('onRemember', $("#rememberMe").is(':checked'));
	  },
	  /**
	   * Action: Log the user in
	   */
	  login() {
		  this.sendAction('onLogin');
	  },
	  /**
	   * Action: Log the user out
	   */
	  logout() {
		  this.sendAction('onLogout');
	  }
  }
});
