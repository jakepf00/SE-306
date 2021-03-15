// called when search button is clicked
function displaySKU() {
    console.log("Inside displaySKU()");
    var location = findItemInSystem("jake      ");
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

    fetch(apiUrl).then(response => {
        return response.json();
    }).then(data => {
        // Work with JSON data here
        concessionsTable = data;
        
        for(tableLocation = 0; tableLocation < data.length; tableLocation++) {
            if (data[tableLocation].aoeu == SKU) {
                return tableLocation;
            }
        }
    
        return -1; // Item not found

    }).catch(err => {
        console.log("An error ocurred in retrieving the concessions table from the database");
        return -1;
    });
}

function removeItemFromSystem(SKU) {
    // use given SKU to remove item from database
}