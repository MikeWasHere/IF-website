var myApp = angular.module('sampleApp', ['ngRoute', 'firebase', 'MainCtrl', 'NerdCtrl', 'NerdService', 'GeekCtrl', 'AuthService', 'LoginCtrl', 'ui.bootstrap'])
	.constant('FIREBASE_URL', 'https://offerup-clone.firebaseio.com/');

	//Error Handling
	myApp.run(['$rootScope', '$location',
		function($rootScope, $location) {
			$rootScope.$on('$routeChangeError', 
				function(event, next, previous, error) {
					if (error=='AUTH_REQUIRED') {
						$rootScope.message = 'Sorry, You must be logged in to access this page';
						$location.path('/login');
					} // AUTH REQUIRED
				}); //event info
		}]); //run

	//Front end route controllers
	myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/choice', {
			templateUrl: 'views/choice.html',
			controller: 'GeekController'
		})

		.when('/store', {
			templateUrl: 'views/store.html',
			controller: 'GeekController'
		})

		.when('/about', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'	
		})

		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})

		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'LoginController'
		})

		.when('/blog', {
			templateUrl: 'views/social.html',
			controller: 'NerdController'	
		})

		.when('/blog-post', {
			templateUrl: 'views/blog-post.html',
			controller: 'NerdController'	
		})

		.when('/contact', {
			templateUrl: 'views/contact.html',
			controller: 'NerdController'	
		})

		.when('/chat', {
			templateUrl: 'views/chat.html',
			controller: 'LoginController'	
		})

		.when('/master', {
			templateUrl: 'views/master.html',
			controller: 'LoginController',
			resolve: {
				"currentAuth": ["Authentification", function(Authentification) {
					console.log(Authentification);
					return Authentification.requireAuth();
				}] //Current Auth
			} //Resolve
		})
		
		.otherwise({
			redirectTo: '/login'
		});

	// $locationProvider.html5Mode(true);

	

}]);