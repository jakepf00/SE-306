// called when page is loaded
function getConcessionsTable() {
    fetch(concessionsApiUrl).then(response => {
        return response.json();
    }).then(data => {
        concessionsTable = data;
    }).catch(err => {
        console.log(err);
    });
}

// called when add button is clicked from post concession modal
function postConcession() {
    var newSKU = getMaxSKU() + 1;
    console.log(newSKU);
    var newConcession = {
        "sku": newSKU,
        "itemName": document.getElementById("new_item_name").value,
        "cost": parseFloat(document.getElementById("new_item_cost").value),
        "quantity": parseInt(document.getElementById("new_item_quantity").value),
        "location": document.getElementById("new_item_location").value,
    }
    fetch(concessionsApiUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(newConcession)
    }).then(response => {
        console.log(response);
        getConcessionsTable(); // refresh concessions table after post is complete
    }).catch(err => {
        console.log(err);
    });
}

// Called when delete button is clicked on a specific item
function deleteConcessionsItem(SKU) {
    var newUrl = concessionsApiUrl + "/" + SKU;
    fetch(newUrl, {
        method: 'DELETE',
    }).then(response => {
        console.log(response);
        getConcessionsTable(); // refresh concessions table after delete is complete
        document.getElementById("concessions_results").innerHTML = "Item was successfully removed from database"
    }).catch(err => {
        console.log(err);
    });
}

// called when add new inventory item button is clicked
function newConcessionsModal() {
    var newData = "";

    var modalTitle = document.getElementById("modal_header");
    newData = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
    newData += "<h4 class=\"modal-title\">Add New Inventory Item</h4>";
    modalTitle.innerHTML = newData;

    var modalBody = document.getElementById("modal_body");
    newData = "<p>Name:</p><input type=\"text\" id=\"new_item_name\" size=\"40\"><br><br>";
    newData += "<p>Cost:</p><input type=\"text\" id=\"new_item_cost\" size=\"40\"><br><br>";
    newData += "<p>Quantity:</p><input type=\"text\" id=\"new_item_quantity\" size=\"40\"><br><br>";
    newData += "<p>Location:</p><input type=\"text\" id=\"new_item_location\" size=\"40\"><br><br>";
    modalBody.innerHTML = newData; // don't need to ask for SKU, it will be automatically inferred

    var modalFooter = document.getElementById("modal_footer");
    newData = 
          "<button type=\"button\" class=\"btn btn-default\" onclick=\"postConcession()\" data-dismiss=\"modal\">Add</button>"
        + "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>";
    modalFooter.innerHTML = newData;
}

function getMaxSKU() {
    var max = 0;
    for (i = 0; i < concessionsTable.length; i++) {
        if (concessionsTable[i].SKU > max) {
            max = concessionsTable[i].SKU;
        }
    }
    return max;
}

// called when search button is clicked
function displaySKU() {
    var SKU = document.getElementById("search_sku").value;
    var tableLocation = findItemInSystem(SKU);
    updateWebpage(tableLocation);
}

// Called when update stock level button is clicked on a specific item
function updateStockLevel(SKU) {
    console.log("Updating stock level " + SKU);
}

function findItemInSystem(SKU) {
    var itemLocation = -1;
    for(tableLocation = 0; tableLocation < concessionsTable.length; tableLocation++) {
        if (concessionsTable[tableLocation].SKU == SKU) { // add support for search by name?
            itemLocation = tableLocation;
        }
    }
    return itemLocation;
}

// TODO: add info about concessions item
// TODO: make 'delete item' button that calls removeItemFromInventory with the correct SKU
function updateWebpage(tableLocation) {
    var concessionsResults = document.getElementById("concessions_results");
    var newConcessionsResults = "";

    if (tableLocation != -1) {
        newConcessionsResults += "<p>SKU: " + concessionsTable[tableLocation].SKU + "</p>"
            + "<p>Name: " + concessionsTable[tableLocation].ItemName + "</p>"
            + "<p>Cost: $" + concessionsTable[tableLocation].Cost.toFixed(2) + "</p>"
            + "<p>Quantity: " + concessionsTable[tableLocation].Quantity + "</p>"
            + "<p>Location: " + concessionsTable[tableLocation].Location + "</p>"
            + "<button type=\"button\" id=\"update_inventory_button\" onclick=\"updateStockLevel(" + concessionsTable[tableLocation].SKU + ")\">Update stock level</button>"
            + "<button type=\"button\" id=\"remove_inventory_button\" onclick=\"deleteConcessionsItem(" + concessionsTable[tableLocation].SKU + ")\">Remove item from inventory</button>";
    }
    else newConcessionsResults = "No item matched the given SKU";

    concessionsResults.innerHTML = newConcessionsResults;
}