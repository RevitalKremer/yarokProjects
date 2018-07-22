import { default as controllersModule } from './scripts/Controllers/controllers';
import { default as directivesModule } from './scripts/Directives/directives';
import { default as servicesModule } from './scripts/Services/services';

var moduleName = 'main';
function config($routeProvider) {
  
  $routeProvider
      .when('/home', {
        templateUrl: 'templates/home.html',
        controller: 'homeController',
        controllerAs: 'homeCtr',
        resolve: {
          auth: function() {
          return true;
          }
        }
      })
      .when('/projects', {
        templateUrl: 'templates/projects.html',
        controller: 'projectsController',
        controllerAs: 'projectsCtr',
        resolve: {
          auth: function() {
          return true;
          }
        }
      })
      .when('/about', {
        templateUrl: 'templates/about.html',
        controller: 'aboutController',
        controllerAs: 'aboutCtr',
        resolve: {
          auth: function() {
          return true;
          }
        }
      })
      .when('/moneNeto', {
        templateUrl: 'templates/moneNeto.html',
        controller: 'moneNetoController',
        controllerAs: 'moneNetoCtr',
        resolve: {
          auth: function() {
          return true;
          }
        }
      })
      .when('/products', {
        templateUrl: 'templates/products.html',
        controller: 'productsController',
        controllerAs: 'productsCtr',
        resolve: {
          auth: function() {
          return true;
          }
        }
      })
      .when('/contact', {
        templateUrl: 'templates/contact.html',
        controller: 'contactController',
        controllerAs: 'contactCtr',
        resolve: {
          auth: function() {
          return true;
          }
        }
      })
      .when('/', {
        templateUrl: 'templates/home.html',        
        controller: 'homeController',
        controllerAs: 'homeCtr'         
      })
      .otherwise({redirectTo: '/'});


}

config.$inject = ['$routeProvider'];

var app = angular.module(moduleName,[
    'ngRoute',
    'ngMessages', 
    'ngCookies', 
    'angular.bind.notifier',
    servicesModule,  
    controllersModule, 
    directivesModule])
  .config(config);

//angular.bootstrap(document, [moduleName]);

//export default moduleName;