import Ember from 'ember';
import { isAjaxError, isNotFoundError, isForbiddenError } from 'ember-ajax/errors';
const { inject: { service }, RSVP } = Ember;

/**
 * Ember Serice for the Users Session Data
 * from Authorization Services
 */
const SessionAccountService = Ember.Service.extend({
	ajax: service('ajax'),
  /**
   * @property
   * @type Object
   * 
   * Custom Configuration object which contains an options property
   * for the chosen authenticator. This is set using objects from environment.js
   * however can be set from anywhere
   */
  configuration:null,
  /**
   * @property session
   * @type SessionService
   */
  session: service('session'),
  /**
   * @property store
   * @type StoreService
   */
  store: service(),
  
  /**
   * @property Account
   * @type Object
   */
  getAccount(){
	  return this.get('account');
  },
  
  /**
   * Retrieve the local storage remember flag.
   * @property getter
   * @type Boolean
   */
  getRememberMe(){
	  var currentValue = localStorage.getItem('rememberMe');
	  
	  // set an initial value if not available
	  if(currentValue === undefined){
		  localStorage.setItem("rememberMe", false);
	  }
	  else if(typeof(currentValue) === 'string'){
		  localStorage.setItem('rememberMe', (currentValue.toLowerCase() === 'true'));
	  }
	  
	  currentValue = localStorage.getItem('rememberMe');
	  return (currentValue === 'true' || currentValue === true);
  },
  
  /**
   * Store a flag in local storage to 'remember' the current user for next login (which would essentially be a one-click until their authenication token expires)
   * Otherwise, upon loging out, we'll clear any current token, regardless of expiration, requiring input of the users credentials on the authenticator's website.
   * 
   * @property setter
   * type Boolean
   */
  setRememberMe(value){
	  if(typeof(value) === 'string'){
		  value = value.toLowerCase() === 'true' ? true : false;
	  }
	  else if(typeof(value) === 'number'){
		  value = value !== 0 ? true : false;
	  }
	  
	  localStorage.setItem("rememberMe", value);
  },
  
  getAuthenticated(){
	  const token 		= localStorage.getItem('token');
	  return token !== 'undefined' && token !== undefined && !Ember.isEmpty(token);
  },
  
  /**
   * @method
   * Log the user out
   * 
   * @return a Promise
   */
  logoutCurrentUser(){
	  return new RSVP.Promise((resolve, reject) => {
	      const sessionData = this.get('session.data');

	      if(sessionData){
	    	  const token = localStorage.getItem('token');
	    	  
	    	  if(!Ember.isEmpty(token)){
	    		  localStorage.setItem('token', undefined);
	    		  localStorage.setItem('profile', undefined);
	    		  
	    		  this.set('account', undefined);
	    	  }
	      }
      
    	  this.get('session').invalidate().then(() => {
    		  if(this.getRememberMe() === false){
	    		  // perform a headless logout request (i.e. don't redirect the user)
	    		  // and once it resolves, we'll resolve.
    			  // data type is HTML so we don't try to convert to JSON and produce an error
	    		  this
	    		  .get('ajax')
	    		  .request(this.configuration.logoutUrl, {method: 'GET', dataType: 'html'})
	    		  .catch((error) => {
	    			  if (isNotFoundError(error)) {
    		            // handle 404 errors here
    		        	console.log("404: ", error);
    		        	resolve();
    		          }

    		          if (isForbiddenError(error)) {
    		            // handle 403 errors here
    		        	  console.log("403: ", error);
    		        	  resolve();
    		          }

    		          if(isAjaxError(error)) {
    		        	  console.log("AJAX ERR:", error);
    		            // handle all other AjaxErrors here
    		        	  resolve();
    		          }
    		          
    		          console.log("Unhandled Error: ", error);
    		          // other errors are handled elsewhere
    		          throw error;
    		      })
	    		  .then(() => {
	    			  resolve();
		          });
    		  }
    		  else{
    			  resolve();
    		  }
    	  }).catch((e)=>{
    		  resolve();
    	  });
    });
  },
  
  /**
   * @method allows the user to login. 
   * Invalidates the session prior (in case there is a login already)
   */
  loginCurrentUser(){
	  // lambda method to perform authentication
	  // and return the promise
	  var doAuth = () => {
		  return this
		  .get('session')
		  .authenticate(this.configuration.authenticator);
	  };
	  
	  return new RSVP.Promise((resolve, reject) => {
		// attempt to invalidate any current session
		// and then authenticate the current user.
		try{
			this.get('session').invalidate().then(()=>{
				doAuth().then(resolve);
			},(reason)=>{			
				doAuth().then(resolve);
			});  
		}
		catch(e){
			doAuth().then(resolve);
		}
	  });
  },
  /**
   * @method
   * Load the current user's data from the Session
   * and recreate the account object.
   * 
   * @return a Promise
   */
  loadCurrentUser() {
	  return new RSVP.Promise((resolve, reject) => {
	      var sessionData = this.get('session.data');

	      // clear any old value
	      this.set('account', null);
	      
	      if(sessionData){
	    	  const sessionAuth = sessionData.authenticated;
	    	  const token 		= localStorage.getItem('token');
	    	  
	    	  if(!Ember.isEmpty(token)){	  
		    	  if(sessionAuth.idToken === token || sessionAuth.idToken === undefined){  
		    		  const accountData = localStorage.getItem('profile');
		    		  const account 	= (accountData !== 'undefined' && accountData !== undefined) ? JSON.parse(accountData) : null;
		    		  
		    		  if(account){
		    			  this.set('account', account);
		    		  }
		    	  }
		    	  else{
		    		  reject("Token Error -> session token: " + sessionAuth.idToken + ", incoming token: " + token);
		    	  }
	    	  }
	      }
          
	      resolve(this.get('account)'));
    });
  }
});

export default SessionAccountService;