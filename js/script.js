// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var scotchApp = angular.module('scotchApp', ['ngRoute']);

scotchApp.directive('myDirective1', function() {
    return {
        controller: 'chart-controller'
    };
});

scotchApp.directive('myDirective2', function() {
    return {
        controller: 'savings-chart-controller'
    };
});

// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })

        // route for the landing page
        .when('/landing', {
            templateUrl : 'pages/landing.html',
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
        })

        .when('/savings', {
            templateUrl : 'pages/savings.html',
            controller : 'mainController'
        })

        .when('/set_budget', {
            templateUrl : 'pages/set_budget.html',
            controller : 'mainController'
        })

        .when('/add_expense', {
            templateUrl : 'pages/add_expense.html',
            controller : 'mainController'
        })

        .when('/big_expense', {
            templateUrl : 'pages/big_expense.html',
            controller : 'mainController'
        })

        .when('/ratings', {
            templateUrl : 'pages/ratings.html',
            controller : 'mainController'
        })

        .when('/expenses', {
            templateUrl : 'pages/expenses.html',
            controller : 'mainController'
        });


});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope, $rootScope) {
    // Jquery for modals
    

    $scope.$on('$routeChangeSuccess', function () {
      // run some code to do your animations
        $(document).ready(function(){
          // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
            $('.modal-trigger').leanModal();
        });
        // Tooltip animation
        $(document).ready(function(){
            $('.tooltipped').tooltip({delay: 50});
            $('.tooltipped').on('click',function(){
                $(this).trigger('mouseleave');
            });
        });
        // select animation
        $(document).ready(function() {
            $('select').material_select();
        });
        // Parallax background effect
        $(document).ready(function(){
            $('.parallax').parallax();
        });
        
        
    });

    // create a message to display in our view    
    $scope.message = 'You are at home!';
    var pct = '20%'
    $scope.total_expenses_bar = {'width': pct};

    //Global variables and Objects are declared here 
    //Creating an object called Budget
    $rootScope.currentDate = new Date().toLocaleString();
    //$rootScope.currentDate = new Date().toJSON().slice(0,10);                    //This can also be used

    $rootScope.budget = {
    'daily'  : 0,
    'weekly' : 0,
    'monthly': 0
    };
    //console.log("budget variable");
    //console.log($rootScope.budget);

    $rootScope.budget_expenses = {
    'daily'  : 0,
    'weekly' : 0,
    'monthly': 0
    };

    $rootScope.categories = {
    'Food' : 0,
    'Beverages' : 0,
    'Clothes' : 0,
    'Electronics' : 0,
    'Travel' : 0
    };

    $rootScope.categories_expenses = {
    'Food' : 0,
    'Beverages' : 0,
    'Clothes' : 0,
    'Electronics' : 0,
    'Travel' : 0
    };

    $rootScope.expenses =    {   
    'name': "",
    'category':"",
    'amount': 0,
    'timestamp' : ""
    };

    //////////////////////////////////////////////////////////////////

    //Function to update after getting an expense

    $scope.set_expense = function () {
        var cat = $scope.expense_category;
        //console.log("category");
        //console.log(cat);
        var amount = $scope.expense_amount;
        //console.log("amount");
        //console.log(amount);
        // Set budget_expenses
        $rootScope.budget_expenses.daily += amount;
        $rootScope.budget_expenses.weekly += amount;
        $rootScope.budget_expenses.monthly += amount;

        // Set categories_expenses
        $rootScope.categories_expenses[cat] += amount; 

        //Alerts (check each budget and send alert on exceeding any budget)
        if($rootScope.budget_expenses.daily >= $rootScope.budget.daily){
            // Send alert
        }
        if($rootScope.budget_expenses.weekly >= $rootScope.budget.weekly){
            // Send alert
        }
        if($rootScope.budget_expenses.monthly >= $rootScope.budget.monthly){
            // Send alert
        }
        console.log("budget expenses");
        console.log($rootScope.budget_expenses.daily);
        console.log($rootScope.budget_expenses.weekly);
        console.log($rootScope.budget_expenses.monthly);

            // TODO Keep last 10 transactions in a list
    }

    //////////////////////////////////////////////////////////////////

    //Input : Function gets the totalBudget and the budgetType(daily, weekly,monthly)from the user.
    //Description : User can set the budget for the day, week or monthly
    //              The totalbudget would be split into daily, weekly and monthly budgets.
    $scope.setBudget = function () {
        console.log("setting budget");
        console.log($scope.totalBudget)
        var budgetType = $scope.budgetType;
        var totalBudget = $scope.totalBudget;

        if (budgetType == "daily") 
        {
                $rootScope.budget.daily = totalBudget;
                $rootScope.budget.weekly = totalBudget * 7;
                $rootScope.budget.monthly = totalBudget * 30;
        }
        else if (budgetType == "weekly") 
        {
                $rootScope.budget.daily = totalBudget / 7;
                $rootScope.budget.weekly = totalBudget;
                $rootScope.budget.monthly = totalBudget * 4;               //Can be multiplied by 4.4
        }
        else
        {
                $rootScope.budget.daily = totalBudget / 30;
                $rootScope.budget.weekly = totalBudget / 4;
                $rootScope.budget.monthly = totalBudget;
        }
        console.log("budgets");
        console.log($scope.budget.daily);
        console.log($scope.budget.weekly);
        console.log($scope.budget.monthly);
    }

     //////////////////////////////////////////////////////////////////       

    //Function that sets the budget entered by the user for a category to the corresponding category in the
    //categories object
    $scope.categoryBudget = function () {

        var catBudget = $scope.catBudget;
        var categoryType = $scope.categoryType;

        if (categoryType == "Food")
        {
            $rootScope.categories.Food = catBudget;
        }
        else if(categoryType == "Beverages")
        {
            $rootScope.categories.Beverages = catBudget;
        }
        else if(categoryType == "Clothes")
        {
            $rootScope.categories.Clothes = catBudget; 
        }
        else if(categoryType == "Electronics")
        {
            $rootScope.categories.Electronics = catBudget;
        }
        else
        {
            $rootScope.categories.Travel = catBudget;
        }
    }

    //////////////////////////////////////////////////////////////////       

    //Input: This function gets numOfDays, budgetCut and totalAmount from the user
    //Condition for Input : At any point in time, the user either enters numOfDays, totalAmount or
    //                      budgetCut, totalAmount
    //                      We need to make sure that the remaining parameter to the function is 0.
    //Example calls :       bigExpenses(10,0,100);
    //                      bigExpenses(0,10,100);
    //Description : Based on the input provided by the user, the function calculates the dialyCut the user is willing
    //              to take and updates the budget object accordingly. 
    $scope.bigExpenses = function () {

        var numOfDays = $scope.numOfDays;
        var budgetCut = $scope.budgetCut;
        var totalAmount = $scope.totalAmount;

        if (numOfDays > 0)
        {
            budgetCut = totalAmount/numOfDays;
            var status = confirm("Your daily cut in the budget to recover for your big expenditure is" + budgetCut + "\n" +
                                  "Do you want to take this dialy wage cut?" );
            if (status == true) 
            {
                //Updating the dialy, weekly and monthly budget's accordingly           
                $rootScope.budget.daily = $rootScope.budget.daily - budgetCut;
                $rootScope.budget.weekly = $rootScope.budget.weekly - (budgetCut * 7);
                $rootScope.budget.monthly = $rootScope.budget.monthly - (budgetCut * 30);

            }
            else
            {

                alert("Big expenditure is not planned! You might end up spending more than you want to :)");

            }

            return;
        }

        if (budgetCut > 0) 
        {
            var dailyBudgetCut = budgetCut/7;
            numOfDays = totalAmount/dailyBudgetCut;

            var status = confirm("By taking a weekly budget cut of " + budgetCut +"$" + ", you will need " + numOfDays 
                                 + " days to recover your big expenditure amount! Let's save some money for the mega expense coming up? :)");

            if (status == true) 
            {
                $rootScope.budget.daily = $rootScope.budget.daily - dailyBudgetCut;
                $rootScope.budget.weekly = $rootScope.budget.weekly - (dailyBudgetCut * 7);
                $rootScope.budget.monthly = $rootScope.budget.monthly - (dailyBudgetCut * 30);

            }
            else
            {
                    alert("Hmmmm.. Looks like you haven't planned your big expenditure! Give it a thought.");

            }
        }
    }


    $scope.SendAlerts =  function(){

            console.log("Function SendAlerts Called");
            $.ajax({
            /*
            headers:{
                        "Accept":"application/json",
                        "Content-Type" : "application/x-www-form-urlencoded",              
            },*/
            //"Content-Type" : "application/x-www-form-urlencoded",
            type: 'post',
            url: "http://textbelt.com/text",
            //processData: false,
            //data: "number=6173730582 message=This is a test message",         
            data: {"number":"6173730582","message":"Error is here"},
            //data: ,

            success:function(response)
            {
                console.log("Success!!!!");
            },

            error : function(xhr, status, error)
            {
                console.log("Status of error message" + status + "Error is" + error);
            }   

        });


    }

    
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

scotchApp.controller('savings-chart-controller', function ($scope, $rootScope) {
    //console.log("error is here");
    google.charts.setOnLoadCallback($rootScope.savings_monthly);
    google.charts.setOnLoadCallback($rootScope.savings_weekly);
    $rootScope.savings_monthly = function () {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Food', 205],
          ['Beverages', 20],
          ['Commute',  75],
          ['Clothes', 250],
          ['Electronics', 70],
          ['Travel', 250],
        ]);

        var options = {
            'chartArea': {'width': '100%', 'height': '80%'},
            pieHole: 0.4,
        };
        var chart = new google.visualization.PieChart(document.getElementById('savingsMonthly'));
        chart.draw(data, options);
    }
    $rootScope.savings_weekly = function () {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Food', 200],
          ['Beverages', 20],
          ['Commute',  754],
          ['Clothes', 250],
          ['Electronics', 70],
          ['Travel', 250],
        ]);

        var options = {
            'chartArea': {'width': '100%', 'height': '80%'},
            pieHole: 0.4,
        };
        var chart = new google.visualization.PieChart(document.getElementById('savingsWeekly'));
        chart.draw(data, options);
    }
});

scotchApp.controller('chart-controller', function ($scope, $rootScope) {
    google.charts.setOnLoadCallback($rootScope.drawAreaChartMonthly);
    google.charts.setOnLoadCallback($rootScope.drawChart);
    google.charts.setOnLoadCallback($rootScope.drawPieChartWeeklyExpense);
    google.charts.setOnLoadCallback($rootScope.drawAreaChart);
    $rootScope.drawChart = function () {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Food', 200],
          ['Beverages', 20],
          ['Commute',  75],
          ['Clothes', 250],
          ['Electronics', 70],
          ['Travel', 250],
        ]);

        var options = {
            'chartArea': {'width': '100%', 'height': '80%'},
            pieHole: 0.4,
        };
        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
    }

    

    $rootScope.drawAreaChart = function(){
        var data = google.visualization.arrayToDataTable([
          ['Days',  'Expense'],
          ['Mon', 10],
          ['Tue', 30],
          ['Wed', 50],
          ['Thu', 40],
          ['Fri', 20],
          ['Sat', 10],
          ['Sun', 50]
        ]);

        var options = {
          vAxis: {title: 'Expenses'},
          'chartArea': {'width': '100%', 'height': '70%'},
          'legend': {'position': 'bottom'},
          isStacked: true
        };

        var chart = new google.visualization.SteppedAreaChart(document.getElementById('SteppedAreaChart'));
        chart.draw(data, options);
      }
      

      $rootScope.drawPieChartWeeklyExpense = function(){     
        var data = google.visualization.arrayToDataTable([
          ['Categories', 'Weekly Expenses'],
          ['Food', 800],
          ['Beverages', 100],
          ['Commute',  200],
          ['Clothes', 50],
          ['Electronics', 150],
          ['Travel', 75],
        ]);

        var options = {
            'chartArea': {'width': '100%', 'height': '80%'},
            pieHole: 0.4,
        };
        var chart = new google.visualization.PieChart(document.getElementById('donutchartForWeeklyExpense'));
        chart.draw(data, options);
    }   

    

    $rootScope.drawAreaChartMonthly = function(){
        var data = google.visualization.arrayToDataTable([
          ['Week',  'Expense'],
          ['First Week', 10],
          ['Second Week', 30],
          ['Third Week', 50],
          ['Fourth Week', 40],          
        ]);

        var options = {
          vAxis: {title: 'Expenses'},
          'chartArea': {'width': '100%', 'height': '70%'},
          'legend': {'position': 'bottom'},
          isStacked: true
        };

        var chart = new google.visualization.SteppedAreaChart(document.getElementById('SteppedAreaChartMonthly'));

        chart.draw(data, options);
      }
    // Call google chart
});


