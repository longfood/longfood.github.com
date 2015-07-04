var app = angular.module("longfoodApp", ["ui.router", "longfoodControllers"]);

//app.config(['$routeProvider',
//    function ($routeProvider) {
//        $routeProvider.
//            when('/about', {
//                templateUrl: 'views/about.html',
//                controller: 'AboutCtrl'
//            }).
//            when('/contact', {
//                templateUrl: 'views/contact.html',
//                controller: 'ContactCtrl'
//            }).
//            otherwise({
//                redirectTo: '/about'
//            });
//    }
//]);
app.run(
  ['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
  ]
)
.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
        .state('home', {
            url: "/:lang",
            templateUrl: function ($stateParams) {
                var lang = $stateParams.lang || "en";
                return "views/" + lang + "/home.html";
            },
        })
        .state('about', {
            url: "/about/:lang",
            templateUrl: function ($stateParams) {
                var lang = $stateParams.lang || "en";
                return "views/" + lang + "/about.html";
            },
            controller: 'AboutCtrl'
        })
        .state('contact', {
            url: "/contact/:lang",
            templateUrl: function ($stateParams) {
                var lang = $stateParams.lang || "en";
                return "views/" + lang + "/contact.html";
            },
            controller: 'ContactCtrl'
        })
    }
])
.service('langService', ['$rootScope', function ($rootScope) {
    var service = {
        lang: "en",
        change: function (newValue) {
            if (service.lang != newValue) {
                service.lang = newValue;
            }
            $rootScope.$broadcast('lang.changed');
        }
    }

    return service;
}]);
