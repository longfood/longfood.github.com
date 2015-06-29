angular.module('app', [])

.controller('MenuController', function ($scope) {
    var menus = $scope.menus = [
        { href:"#",text:"Home",selected:true },
        { href:"#",text:"About LongFood" ,selected:false},
        { href: "#", text: "Service Offerings", selected: false },
        { href: "#", text: "Sales", selected: false },
        { href: "#", text: "Contact Us", selected: false },
    ];
    $scope.select = function (menu) {
        angular.forEach(menus, function (menu) {
            menu.selected = false;
        });
        menu.selected = true;
    }
});