# Practice Exercies

## Instructions

### Part One

1.  Create an index.html, and include a script.js upon pageload
2.  Content of the script.js should be wrapped within a self-executed anonymous function to avoid polluting the page global scope
3.  Add to the index.html a table element with 3 columns and 2 rows, first row is the header row that contains the table headings (studentNo, name, age), second row contains your own studentNo, name, and age
4.  Create a function name executeScript. Function executeScript should add a new row to the table that contains a test user studentNo, name, and age (maybe 123, test user name, 999) when called. Remember to invoke executeScript function
5.  Move the script.js injection to the header part of your index.html, is your code still working?
6.  Update your code so that executeScript only gets invoked when the DOMContentLoaded event is detected. Is the testUser now getting added to the table? Why?

Note: The HTML document is loaded from top to bottom. If the script is loaded before the HTML document, the script will not be able to find the table element which is why executeScript needs to happen after the DOMContentLoaded.

### Part Two

1. Copy the following function which will always return an array of 5 objects containing information of 5 test users to your code, add more if you want https://gist.github.com/bch-fullstack/7bdc2288e1a1b5c6da0cf1674477eed3
2. Create a new function addUser that expects a single object of userInfo as parameter
3. Iterate through the array of 5 users, call addUser on each iteration
4. Add a new function getOldest() that expects an array of userObject as parameter, when getOldest() is called, it iterates through the array of objects, and return the oldest person in the array according to the age, do NOT use .find() or filter() method or array methods
5. Create a new column to the table name isStaff, update your code so that each row in the table will also display an information if the person is a staff or a student. A student always has a non-negative student number, otherwise it is a staff
6. Create a button that will sort the list of users according to their age descendingly and re-render the table with sorted content upon click. Do NOT use .sort() method
