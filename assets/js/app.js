var app = angular.module("longfoodApp", ["ui.router",'ngCookies',"longfoodControllers"]);

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
.config(['$stateProvider', '$urlRouterProvider','$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
.service('langService', ['$rootScope', '$stateParams', '$cookies', function ($rootScope, $stateParams, $cookies) {

    $cookies.put("currentLang", $stateParams.lang || $cookies.get("currentLang") || "en");

    var service = {
        getCurrentLang: function myfunction() {
            return $cookies.get('currentLang');
        } ,
        langs:  [
            { href: "#", lang:"en", text: "English", selected: false },
            { href: "#", lang:"fi", text: "Finnish", selected: false },
            { href: "#", lang:"ch", text: "简体中文", selected: false },
        ],
        getLangs : function() {
            angular.forEach(service.langs, function (langItem) {
                langItem.selected = service.getCurrentLang() == langItem.lang;
            });

            return service.langs;
        },
        change: function (newValue) {
            $cookies.put("currentLang", newValue);
            $rootScope.$broadcast('lang.changed');
        }
    }

    return service;
}]);
