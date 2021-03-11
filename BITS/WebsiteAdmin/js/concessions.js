var concessionsTable;

// called when search button is clicked
function displaySKU() {
    console.log("Inside displaySKU()");
    // findItemInSystem();
    // updateWebpage();
}

function scanSKU() {
    // get SKU from textbox or external scanner
    return "1";
}

function findItemInSystem(SKU) {
    // access the database, search for item, return database location
    // also save database response in a global variable
    // returns -1 if the item is not contained in the database

    var apiUrl = 'https://localhost:44335/api/Table1';
    fetch(apiUrl).then(response => {
        return response.json();
    }).then(data => {
        // Work with JSON data here
        concessionsTable = data;

        var tableLocation = 0;
        data.forEach(function(item) {
            if (item.aoeu == SKU) {
                return tableLocation;
            }
            tableLocation++;
        });
        return -1; // Item not found

    }).catch(err => {
        // Do something for an error here
        console.log("an error ocurred in retrieving the concessions table from the database");
    });
}

function removeItemFromSystem(SKU) {
    // use given SKU to remove item from database
}