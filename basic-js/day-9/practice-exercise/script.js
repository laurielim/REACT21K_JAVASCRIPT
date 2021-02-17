/**
 * ********** PART ONE **********
 * 1.Create an index.html, and include a script.js upon pageload
 * 2.Content of the script.js should be wrapped within a self-executed anonymous function to avoid polluting the page global scope
 * 3.Add to the index.html a table element with 3 columns and 2 rows, first row is the header row that contains the table headings (studentNo, name, age), second row contains your own studentNo, name, and age
 * 4.Create a function name executeScript. Function executeScript should add a new row to the table that contains a test user studentNo, name, and age (maybe 123, test user name, 999) when called. Remember to invoke executeScript function
 * 5.Move the script.js injection to the header part of your index.html, is your code still working?
 * 6.Update your code so that executeScript only gets invoked when the DOMContentLoaded event is detected. Is the testUser now getting added to the table? Why?
 * >>>>> The HTML document is loaded from top to bottom. If the script is loaded before the HTML document, the script will not be able to find the table element which is why executeScript needs to happen after the DOMContentLoaded.
 * ********** PART TWO **********
 * Copy the following function which will always return an array of 5 objects containing information of 5 test users to your code, add more if you wanthttps://gist.github.com/bch-fullstack/7bdc2288e1a1b5c6da0cf1674477eed3
 * 2.Create a new function addUser that expects a single object of userInfo as parameter
 * 3.Iterate through the array of 5 users, call addUser on each iteration
 * 4.Add a new function getOldest() that expects an array of userObject as parameter, when getOldest() is called, it iterates through the array of objects, and return the oldest person in the array according to the age, do NOT use .find() or filter() method or array methods
 * 5.Create a new column to the table name isStaff, update your code so that each row in the table will also display an information if the person is a staff or a student. A student always has a non-negative student number, otherwise it is a staff
 * 6.Create a button that will sort the list of users according to their age descendingly and re-render the table with sorted content upon click. Do NOT use .sort() method
 */

(function () {
  const executeScript = () => {
    // Find table element with id "table"
    let table = document.getElementById("table");
    // Create a new <tr> element
    let row = table.insertRow();
    // Create new <td> elements
    let colStudentNo = row.insertCell();
    let colName = row.insertCell();
    let colAge = row.insertCell();
    let colIsStaff = row.insertCell();
    // Add values inside the <td> elements
    colStudentNo.textContent = 44;
    colName.textContent = "Cedric";
    colAge.textContent = 17;
    colIsStaff.textContent = "No";

    /**
     * Add a new row to the table with userInfo
     * @param {Object} obj a single object of userInfo
     * @return {void}
     */
    const addUser = (obj) => {
      // Find table element with id "table"
      let table = document.getElementById("table");
      // Create a new <tr> element
      let row = table.insertRow();
      // Create new <td> elements
      let colStudentNo = row.insertCell();
      let colName = row.insertCell();
      let colAge = row.insertCell();
      let colIsStaff = row.insertCell();
      // Add values inside the <td> elements
      colStudentNo.textContent = obj.studentNo;
      colName.textContent = obj.name;
      colAge.textContent = obj.age;
      // If studentNo is non-negative it is a student, otherwise it is a staff
      colIsStaff.textContent = obj.studentNo > 0 ? "No" : "Yes";
    };

    // Get array of user objects
    let users = getUsers();

    // Iterate through the array of 5 users, call addUser on each iteration
    users.forEach((user) => addUser(user));

    /**
     * Iterate through an array of objects, and return the oldest person in the array according to the age
     * @param {Array} arr array of userObject
     * @return {Object} oldest person object
     */
    const getOldest = (arr) => {
      // Track index of oldest
      let indexOfOldest = 0;
      // Iterate through array and compare person age
      for (let i = 1; i < arr.length; i++) {
        arr[i].age > arr[indexOfOldest].age
          ? // If current person is older, save index
            (indexOfOldest = i)
          : "";
      }
      return arr[indexOfOldest];
    };

    /**
     * Sort users according to age descendingly using insertionSort and re-render the table with sorted content
     *  @return {void}
     */
    const sortTable = () => {
      // Make a copy of users array
      let sortedUsers = getUsers();
      // Add missing users
      let newUsers = [
        {
          studentNo: 666,
          name: "Draco",
          age: 15,
        },
        {
          studentNo: 44,
          name: "Cedric",
          age: 17,
        },
      ];
      sortedUsers = sortedUsers.concat(newUsers);
      // The outer loop starts at the second user in the array, and travels through the end of the array
      for (let i = 1; i < sortedUsers.length; i++) {
        //The inner loop begins at the start of the array, and travels only up to the user being iterated over in the outer loop
        for (let j = 0; j < i; j++) {
          if (sortedUsers[i].age > sortedUsers[j].age) {
            // Splice to delete and return the item at "i" position
            const [user] = sortedUsers.splice(i, 1);
            // Splice again to insert the item at the "j" position
            sortedUsers.splice(j, 0, user);
          }
        }
      }

      console.log(sortedUsers);

      // Clears table
      while (table.rows.length > 1) {
        table.deleteRow(table.rows.length - 1);
      }

      // Render sorted table
      sortedUsers.forEach((user) => addUser(user));
    };

    let buttonSort = document.getElementById("button-sort");

    buttonSort.addEventListener("click", sortTable);
  };

  window.addEventListener("DOMContentLoaded", (event) => {
    executeScript();
  });

  // Provided function from https://gist.github.com/bch-fullstack/7bdc2288e1a1b5c6da0cf1674477eed3

  const getUsers = () => [
    {
      studentNo: 123,
      name: "Harry",
      age: 15,
    },
    {
      studentNo: 234,
      name: "Ron",
      age: 16,
    },
    {
      studentNo: 135,
      name: "Hermione",
      age: 15,
    },
    {
      studentNo: -1,
      name: "Snape",
      age: 55,
    },
    {
      studentNo: -1,
      name: "Hagrid",
      age: 65,
    },
  ];
})();
