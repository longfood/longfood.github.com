var longfoodControllers = angular.module('longfoodControllers', []);

longfoodControllers.controller('AboutCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.Text = "This is the about page."
    }
]);

longfoodControllers.controller('ContactCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.Text = "This is the about page."
    }
]);

longfoodControllers.controller('LangController', function ($scope, $state,$cookies,langService) {
    $scope.menus = langService.getLangs();
    $scope.$on('lang.changed', function (event) {
        $scope.menus = langService.getLangs();
    });
    $scope.select = function (menu) {
        langService.change(menu.lang);
        $state.go($state.current.name, {lang:menu.lang});
    }
});

longfoodControllers.controller('MainCtrl', ['$scope','$http', '$state','langService',
    function ($scope,$http, $state, langService) {
        $scope.Text = "This is the about page."
        $scope.lang = langService.getCurrentLang();
        $http.get("/assets/data/nav-" + $scope.lang + ".js")
            .then(function (resp) {
                $scope.LocalMenu = resp.data;
            });

        $scope.$on('lang.changed', function ( event ) {
            $scope.lang = langService.getCurrentLang();

            $http.get("/assets/data/nav-" + $scope.lang + ".js")
            .then(function (resp) {
                $scope.LocalMenu = resp.data;
            });
        });
        
        $scope.GetActive = function ( currentState ) {
            return currentState == $state.current.name ? "active" : "";
        };
    }
]);