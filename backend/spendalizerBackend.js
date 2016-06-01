//This is the JS file(backend) for Spendalizer app
//Authors: Vinay Hegde, Vishal Rao
///////////////////////////////////////////////////////////////
//Global variables and Objects are declared here 
//Creating an object called Budget
var currentDate = new Date().toLocaleString();
//var currentDate = new Date().toJSON().slice(0,10);					//This can also be used

var budget =	{
					'daily'  : 0,
					'weekly' : 0,
					'monthly': 0

				};

var categories =	{
						'Food' : 0,
						'Beverages' : 0,
						'Clothes' : 0,
						'Electronics' : 0,
						'Travel' : 0

					};

var expenses =		{	
						'name': "",
						'category':"",
						'amount': 0,
						'timestamp' : ""
					}					



//////////////////////////////////////////////////////////////////
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

