import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
    this.route('auth-error');
    this.route('protected');
    this.route('user-profile');
});

export default Router;
