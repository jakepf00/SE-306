// called when search button is clicked
function displaySKU() {
    var SKU = document.getElementById("search_sku").value; // TODO: change to call scanSKU
    findItemInSystem(SKU).then(updateWebpage, updateWebpageFail);
}

// TODO: call this function when delete button is clicked on a specific equipment
function removeItemFromInventory(location) {
    // maybe add 'are you sure' modal
    var areYouSure = false;
    if (location == -1 || areYouSure == false) {
        console.log("The item was not deleted from the system")
    }
    else {
        removeItemFromSystem(location);
    }
}

function scanSKU() {
    // get SKU from textbox or external scanner
    return "1";
}

async function findItemInSystem(SKU) {
    // access the database, search for item, return database location
    // also save database response in a global variable
    // returns -1 if the item is not contained in the database

    var itemLocation;

    fetch(concessionsInventoryApiUrl).then(response => {
        return response.json();
    }).then(data => {
        concessionsTable = data;
        
        itemLocation = -1;
        for(tableLocation = 0; tableLocation < data.length; tableLocation++) {
            if (data[tableLocation].aoeu == SKU) {
                itemLocation = tableLocation;
                // maybe add a break? If it's found, we don't need to loop rest of table
            }
        }
        console.log(itemLocation);
        
    }).catch(err => {
        console.log("An error ocurred in retrieving the concessions table from the database");
    });

    while(typeof itemLocation === "undefined") {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    return itemLocation;
}

function removeItemFromSystem(tableLocation) {
    // use given tableLocation to remove item from database
    // delete concessionsTabe[tableLocation]
}

// TODO: add info about concessions item
// TODO: make 'delete item' button that calls removeItemFromInventory with the correct SKU
function updateWebpage(tableLocation) {
    var concessionsResults = document.getElementById("concessions_results");
    var newConcessionsResults = "";

    if (tableLocation != -1) {
        newConcessionsResults += concessionsTable[tableLocation].aoeu;
    }
    else newConcessionsResults = "No item matched the given SKU";

    concessionsResults.innerHTML = newConcessionsResults;
}

function updateWebpageFail() {
    // called when the promise fails and itemLocation isn't found
    concessionsResults.innerHTML = "Database error";
}