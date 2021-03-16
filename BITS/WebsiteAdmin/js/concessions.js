// called when search button is clicked
function displaySKU() {
    var SKU = document.getElementById("search_sku").value;
    findItemInSystem(SKU).then(updateWebpage, updateWebpageFail);
}

function removeItemFromInventory() {

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

    fetch(apiUrl).then(response => {
        return response.json();
    }).then(data => {
        concessionsTable = data;
        
        itemLocation = -1;
        for(tableLocation = 0; tableLocation < data.length; tableLocation++) {
            if (data[tableLocation].aoeu == SKU) {
                itemLocation = tableLocation;
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

function removeItemFromSystem(SKU) {
    // use given SKU to remove item from database
}

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