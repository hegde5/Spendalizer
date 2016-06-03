// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var scotchApp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        })

        .when('/login', {
            templateUrl : 'pages/login.html',
            controller : 'loginController'
        });
});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope, $rootScope) {
    // create a message to display in our view
    $scope.message = 'You are at home!';
    var pct = '20%'
    $scope.total_expenses_bar = {'width': pct};
    // Call google chart
    google.charts.setOnLoadCallback($rootScope.drawChart);
    
});

scotchApp.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

scotchApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

scotchApp.controller('loginController', function ($scope) {
    $scope.message = 'login page';
});

scotchApp.controller('chart-controller', function ($scope, $rootScope) {
    $rootScope.drawChart = function () {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Food', 200],
          ['Beverages', 20],
          ['Commute',  75],
          ['Clothes', 250],
          ['Electronics', 70],
          ['Travel', 250]
        ]);

        var options = {
          title: 'My Daily Activities',
          pieHole: 0.4,
        };
        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
    }
});


