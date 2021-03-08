function getEquipmentTable() {    
    var apiUrl = 'https://localhost:44335/api/Table1';
    fetch(apiUrl).then(response => {
        return response.json();
    }).then(data => {
        // Work with JSON data here
        updateWebpage(data);
    }).catch(err => {
        // Do something for an error here
        console.log("an error ocurred in retrieving the equipment table from the database");
    });
}

function updateWebpage(equipmentTable) {
    console.log(equipmentTable);
    // from here, edit the webpage to display received data
    // loop through table, get each element name, add to list
    // -> will append to a string that will eventually be used in the HTML 
    var equipmentResults = document.getElementById("equipment_results");
    var searchString = document.getElementById("search_string").value;
    console.log(searchString);
    var newEquipmentList = "";
    
    equipmentTable.forEach(function(item) {
        newEquipmentList = newEquipmentList.concat("<li><a href=\"#\">", item.aoeu, "</li></a>");
        // TODO: make list be filtered by search string -> add code for if it didn't match any results
        // TODO: make links open a popup with information about the equipment and a way to rent it
    });
    
    equipmentResults.innerHTML = newEquipmentList;
}

function displayEquipment() {
    console.log('Inside displayEquipment()');
    getEquipmentTable(); // calls updateWebpage() once the promise is fulfilled
}
