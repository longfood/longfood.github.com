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

longfoodControllers.controller('LangController', function ($rootScope, $scope, $state, langService) {
    var menus = $scope.menus = [
        { href: "#", lang:"en", text: "English", selected: true },
        { href: "#", lang:"fi", text: "Finland", selected: false },
        { href: "#", lang:"ch", text: "简体中文", selected: false },
    ];
    $scope.select = function (menu) {
        angular.forEach(menus, function (menu) {
            menu.selected = false;
        });
        menu.selected = true;
        langService.change(menu.lang);
        $state.go($state.current.name, {lang:menu.lang});
    }
});

longfoodControllers.controller('MainCtrl', ['$scope', '$state','langService',
    function ($scope, $state, langService) {
        $scope.Text = "This is the about page."
        $scope.$on('lang.changed', function ( event ) {
            $scope.lang = langService.lang;
        });
        $scope.lang = langService.lang;
    }
]);