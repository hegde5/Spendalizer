//This is the JS file(backend) for Spendalizer app
//Authors: Vinay Hegde, Vishal Rao
///////////////////////////////////////////////////////////////
//Global variables and Objects are declared here 
//Creating an object called Budget
var currentDate = new Date().toLocaleString();
//var currentDate = new Date().toJSON().slice(0,10);					//This can also be used

var budget = {
	'daily'  : 0,
	'weekly' : 0,
	'monthly': 0

};



var budget_expenses = {
	'daily'  : 0,
	'weekly' : 0,
	'monthly': 0

};


var categories = {
	'Food' : 0,
	'Beverages' : 0,
	'Clothes' : 0,
	'Electronics' : 0,
	'Travel' : 0

};



var categories_expenses = {
	'Food' : 0,
	'Beverages' : 0,
	'Clothes' : 0,
	'Electronics' : 0,
	'Travel' : 0

};

var categories_expenses = new Array();
categories_expenses[""]

var expenses =		{	
	'name': "",
	'category':"",
	'amount': 0,
	'timestamp' : ""
}					



//////////////////////////////////////////////////////////////////

//Function to update after getting an expense
function set_expense (expenses) {
	var cat = expenses.category;
	var amount = expenses.amount;
	// Set budget_expenses
	budget_expenses.daily += amount;
	budget_expenses.weekly += amount;
	budget_expenses.monthly += amount;

	// Set categories_expenses
	categories_expenses[cat] += amount; 

	//Alerts (check each budget and send alert on exceeding any budget)
	if(budget_expenses.daily >= budget.daily){
		// Send alert
	}
	if(budget_expenses.weekly >= budget.weekly){
		// Send alert
	}
	if(budget_expenses.monthly >= budget.monthly){
		// Send alert
	}

	// TODO Keep last 10 transactions in a list
}

//Function to print the Budget object
function printBudget()
{
	console.log("The daily budget is " + budget.daily);
	console.log("The weekly budget is " + budget.weekly);
	console.log("The monthly budget is " + budget.monthly);
}

//Function to print the categories object
function printCategories()
{
	console.log("Budget for food is " + categories.Food);
	console.log("Budget for Beverages is " + categories.Beverages);
	console.log("Budget for Clothes is " + categories.Clothes);
	console.log("Budget for Electronics is " + categories.Electronics);
	console.log("Budget for Travel is " + categories.Travel);
}

//Input : Function gets the totalBudget and the budgetType(daily, weekly,monthly)from the user.
//Description : User can set the budget for the day, week or monthly
//				The totalbudget would be split into daily, weekly and monthly budgets.
function setBudget(totalBudget,budgetType)
{
	if (budgetType == "daily") 
	{
			budget.daily = totalBudget;
			budget.weekly = totalBudget * 7;
			budget.monthly = totalBudget * 30;
	}
	else if (budgetType == "weekly") 
	{
			budget.daily = totalBudget / 7;
			budget.weekly = totalBudget;
			budget.monthly = totalBudget * 4;				//Can be multiplied by 4.4
	}
	else
	{
			budget.daily = totalBudget / 30;
			budget.weekly = totalBudget / 4;
			budget.monthly = totalBudget;
	}
}

//Simple Test Cases for setBudget(), below
/*
setBudget(10, "daily");
printBudget();
setBudget(100,"weekly");
printBudget();
setBudget(600, "monthly");			
printBudget();
*/


//Function that sets the budget entered by the user for a category to the corresponding category in the
//categories object
function categoryBudget(catBudget,categoryType)
{
	if (categoryType == "Food")
	{
		categories.Food = catBudget;
	}
	else if(categoryType == "Beverages")
	{
		categories.Beverages = catBudget;
	}
	else if(categoryType == "Clothes")
	{
		categories.Clothes = catBudget; 
	}
	else if(categoryType == "Electronics")
	{
		categories.Electronics = catBudget;
	}
	else
	{
		categories.Travel = catBudget;
	}

}

//Simple Test cases for categoryBudget(), below
/*
categoryBudget(100, "Food");
categoryBudget(10, "Beverages");
categoryBudget(50, "Clothes");
categoryBudget(80, "Electronics");
categoryBudget(200, "Travel")
printCategories();
*/


//Input: This function gets numOfDays, budgetCut and totalAmount from the user
//Condition for Input : At any point in time, the user either enters numOfDays, totalAmount or
//						budgetCut, totalAmount
//						We need to make sure that the remaining parameter to the function is 0.
//Example calls : 		bigExpenses(10,0,100);
//						bigExpenses(0,10,100);
//Description : Based on the input provided by the user, the function calculates the dialyCut the user is willing
//				to take and updates the budget object accordingly. 
function bigExpenses(numOfDays, budgetCut, totalAmount)
{

	if (numOfDays > 0)
	{
		budgetCut = totalAmount/numOfDays;
		var status = confirm("Your daily cut in the budget to recover for your big expenditure is" + budgetCut + "\n" +
		                      "Do you want to take this dialy wage cut?" );
		if (status == true) 
		{
			//Updating the dialy, weekly and monthly budget's accordingly			
			budget.daily = budget.daily - budgetCut;
			budget.weekly = budget.weekly - (budgetCut * 7);
			budget.monthly = budget.monthly - (budgetCut * 30);

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
			budget.daily = budget.daily - dailyBudgetCut;
			budget.weekly = budget.weekly - (dailyBudgetCut * 7);
			budget.monthly = budget.monthly - (dailyBudgetCut * 30);

		}
		else
		{
				alert("Hmmmm.. Looks like you haven't planned your big expenditure! Give it a thought.");

		}

	}
	return;


}


//Simple test cases bigExpenses()
//setBudget(100, "daily");
//printBudget();
//bigExpenses(10, 0, 1000);
//printBudget();

//setBudget(100, "daily");
//printBudget();
//bigExpenses(10, 0, 10000);
//printBudget();

//setBudget(100, "daily");
//printBudget();
//bigExpenses(0, 100, 1000);
//printBudget();

