import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

// services
import User from './user.service';
servicesModule.service('User', User);

import JWT from './jwt.service';
servicesModule.service('JWT', JWT);

import Profile from './profile.service';
servicesModule.service('Profile', Profile);

import Articles from './articles.service';
servicesModule.service('Articles', Articles);

import Comments from './comments.service';
servicesModule.service('Comments', Comments);

import Tags from './tags.service';
servicesModule.service('Tags', Tags);

export default servicesModule;
