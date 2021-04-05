

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
function updateItem(SKU) {
    console.log("Updating item " + SKU);
}

function orderInventory(tableLocation) {
    var updatedConcession = {
        "sku": concessionsTable[tableLocation].SKU,
        "itemName": concessionsTable[tableLocation].ItemName,
        "cost": concessionsTable[tableLocation].Cost,
        "quantity": concessionsTable[tableLocation].Quantity + parseInt(document.getElementById("ordered_amount").value),
        "location": concessionsTable[tableLocation].Location,
    }
    putConcession(JSON.stringify(updatedConcession));
    document.getElementById("concessions_results").innerHTML = "<p>Item ordered successfully</p>"
}

function updateItem(tableLocation) {
    var updatedConcession = {
        "sku": concessionsTable[tableLocation].SKU,
        "itemName": document.getElementById("updated_item_name").value,
        "cost": parseInt(document.getElementById("updated_item_cost").value),
        "quantity": parseInt(document.getElementById("updated_item_quantity").value),
        "location": document.getElementById("updated_item_location").value,
    }
    putConcession(JSON.stringify(updatedConcession));
    document.getElementById("concessions_results").innerHTML = "<p>Item updated successfully</p>"
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

function updateWebpage(tableLocation) {
    var concessionsResults = document.getElementById("concessions_results");
    var newConcessionsResults = "";

    if (tableLocation != -1) {
        newConcessionsResults += "<p>SKU: " + concessionsTable[tableLocation].SKU + "</p>"
            + "<p>Name: " + concessionsTable[tableLocation].ItemName + "</p>"
            + "<p>Cost: $" + concessionsTable[tableLocation].Cost.toFixed(2) + "</p>"
            + "<p>Quantity: " + concessionsTable[tableLocation].Quantity + "</p>"
            + "<p>Location: " + concessionsTable[tableLocation].Location + "</p>"
            + "<button type=\"button\" id=\"update_inventory_button\" onclick=\"updateItemModal(" + tableLocation + ")\" data-toggle=\"modal\" data-target=\"#concessions_modal\">Update item</button><br><br>"
            + "<button type=\"button\" id=\"order_inventory_button\" onclick=\"placeOrderModal(" + tableLocation + ")\" data-toggle=\"modal\" data-target=\"#concessions_modal\">Place order</button><br><br>"
            + "<button type=\"button\" id=\"remove_inventory_button\" onclick=\"deleteConcessionsItem(" + concessionsTable[tableLocation].SKU + ")\">Remove item from inventory</button><br><br>";
    }
    else newConcessionsResults = "No item matched the given SKU";

    concessionsResults.innerHTML = newConcessionsResults;
}

function placeOrderModal(tableLocation) {
    // calls orderInventory(tableLocation)
    var newData = "";

    var modalTitle = document.getElementById("modal_header");
    newData = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
    newData += "<h4 class=\"modal-title\">Place Order</h4>";
    modalTitle.innerHTML = newData;

    var concessionsModal = document.getElementById("modal_body");
    newData = "<p>Amount to order: </p><input type=\"text\" id=\"ordered_amount\" size=\"30\"><br><br>";
    concessionsModal.innerHTML = newData;

    var modalFooter = document.getElementById("modal_footer");
    newData = "<button type=\"button\" class=\"btn btn-default\" onclick=\"orderInventory(" + tableLocation + ")\" data-dismiss=\"modal\">OK</button>"
    modalFooter.innerHTML = newData;
}

function updateItemModal(tableLocation) {
    var newData = "";

    var modalTitle = document.getElementById("modal_header");
    newData = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
    newData += "<h4 class=\"modal-title\">Update Item</h4>";
    modalTitle.innerHTML = newData;

    var concessionsModal = document.getElementById("modal_body");
    newData = "<p>Name: </p><input type=\"text\" id=\"updated_item_name\" size=\"30\" value=\"" + concessionsTable[tableLocation].ItemName + "\"><br><br>";
    newData += "<p>Cost: </p><input type=\"text\" id=\"updated_item_cost\" size=\"30\" value=\"" + concessionsTable[tableLocation].Cost + "\"><br><br>";
    newData += "<p>Quantity: </p><input type=\"text\" id=\"updated_item_quantity\" size=\"30\" value=\"" + concessionsTable[tableLocation].Quantity + "\"><br><br>";
    newData += "<p>Location: </p><input type=\"text\" id=\"updated_item_location\" size=\"30\" value=\"" + concessionsTable[tableLocation].Location + "\"><br><br>";
    concessionsModal.innerHTML = newData;

    var modalFooter = document.getElementById("modal_footer");
    newData = "<button type=\"button\" class=\"btn btn-default\" onclick=\"updateItem(" + tableLocation + ")\" data-dismiss=\"modal\">OK</button>"
    modalFooter.innerHTML = newData;
}