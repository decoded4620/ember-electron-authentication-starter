import Ember from 'ember';

const { inject: { service }, RSVP } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),
  getAccount(){
	  return this.get('account');
  },
  logoutCurrentUser(){
	  console.log("logoutCurrentUser()");
	  return new RSVP.Promise((resolve, reject) => {
	      var sessionData = this.get('session.data');

	      if(sessionData){
	    	  const sessionAuth = sessionData.authenticated;
	    	  const token = localStorage.getItem('token');
	    	  
	    	  if(!Ember.isEmpty(token)){
	    		  localStorage.setItem('token', undefined);
	    		  localStorage.setItem('profile', undefined);
	    		  
	    		  this.set('account', undefined);
	    	  }
	      }
          
	      this.get('session').invalidate();
	      resolve();
    });
  },
  
  loadCurrentUser() {
	  console.log("loadCurrentUser()");
	  return new RSVP.Promise((resolve, reject) => {
	      var sessionData = this.get('session.data');

	      if(sessionData){
	    	  const sessionAuth = sessionData.authenticated;
	    	  const token = localStorage.getItem('token');
	    	  
	    	  if(!Ember.isEmpty(token)){	    		  
		    	  if(sessionAuth.idToken === token || sessionAuth.idToken === undefined){  
		    		  const accountData = localStorage.getItem('profile');
		    		  
		    		  console.log("accountData: " + accountData);
		    		  
		    		  const account = (accountData !== 'undefined' && accountData !== undefined) ? JSON.parse(accountData) : null;
		    		  if(account){
		    			  this.set('account', account);
		    		  }
		    		  else{
		    			  resolve(null);
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
