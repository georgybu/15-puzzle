'use strict';

// libs
import angular from 'angular';
import ngRoute from 'angular-route';
import hmTouchEvents from 'angular-hammer';

// vendors
import 'angular-foundation/mm-foundation-tpls.js';
import 'ngstorage/ngStorage.min';

// config
import RouteConfig from './app.route';

// services
import scramble from './services/scramble';
import storage from './services/storage';
import shuffle from './services/shuffle';
import stat from './services/stat';
import modal from './services/modal';

// components
import header  from './components/header';
import game    from './components/game';
import leaders from './components/leaders';
import settings from './components/settings';
import help from './components/help';

import './app.scss';

angular.module('game', [ngRoute, hmTouchEvents, 'ngStorage', 'mm.foundation'])
  .config(RouteConfig)
  .service('scramble', scramble)
  .service('storage', storage)
  .service('shuffle', shuffle)
  .service('stat', stat)
  .service('modal', modal)
  .component('header', header)
  .component('game', game)
  .component('leaders', leaders)
  .component('settings', settings)
  .component('help', help);

angular.bootstrap(document, ['game']);
