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

        

        //$scope.LocalMenu = function ( menuName ) {
        //    if($scope.lang == 'en')
        //    {
        //        return { home: "home", about: "About",contact:"Contact" };
        //    }

        //    if ($scope.lang == 'fi') {
        //        return { home: "home-fi", about: "About-fi", contact: "Contact-fi" };
        //    }

        //    if ($scope.lang == 'ch') {
        //        return { home: "首页", about: "关于", contact: "联系我们" };
        //    }
        //}
    }
]);