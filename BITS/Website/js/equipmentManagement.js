var equipmentTable;

function getEquipmentTable() {    
    var apiUrl = 'https://localhost:44335/api/Table1';
    fetch(apiUrl).then(response => {
        return response.json();
    }).then(data => {
        // Work with JSON data here
        equipmentTable = data;
    }).catch(err => {
        // Do something for an error here
    });
}

function updateWebpage() {
    if (equipmentTable) { // wait until the getEquipmentTable function has completed before updating webpage with recieved data
        console.log(equipmentTable);
        // from here, edit the webpage to display received data
        // loop through table, get each element name, add to list
        // -> will append to a string that will eventually be used in the HTML 
        var equipmentResults = document.getElementById("equipment_results");
        var newEquipmentList = "";
        
        equipmentTable.forEach(function(item) {
            newEquipmentList = newEquipmentList.concat("<li><a href=\"#\">", item.aoeu, "</li></a>");
            // TODO: make list be filtered by search string
            // TODO: make links open a popup with information about the equipment and a way to rent it
        });
        
        equipmentResults.innerHTML = newEquipmentList;
    }
    else {
        setTimeout(updateWebpage, 100); // wait 100ms then try again
    }
}

function displayEquipment() {
    console.log('Inside displayEquipment()');
    getEquipmentTable();
    updateWebpage();
    equipmentTable = null; // maybe don't want to do this?
        // don't want variable to be saved over between searches, because then upon new search, function might use old data before it is updated
        // but we might want to use it later to display the data for a specific equipment if it is clicked
}
