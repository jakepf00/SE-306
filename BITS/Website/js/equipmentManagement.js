var equipmentTable;

function getEquipmentTable() {    
    var apiUrl = 'https://localhost:44335/api/Table1';
    fetch(apiUrl).then(response => {
        return response.json();
    }).then(data => {
        // Work with JSON data here
        updateWebpage(data);
        equipmentTable = data;
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
    
    var tableLocation = 0;
    equipmentTable.forEach(function(item) {
        if (item.aoeu.toLowerCase().includes(searchString.toLowerCase())) { // if search_string is contained within the equipment name
            newEquipmentList = newEquipmentList.concat
                ("<li><a data-toggle=\"modal\" data-target=\"#equipmentModal\" onclick=\"displayEquipmentDetails(", tableLocation, ")\">", item.aoeu, "</li></a>");
            // TODO: make list be filtered by search string -> add code for if it didn't match any results
        }
        tableLocation++; // out here because all equipment needs to be numbered, even if it's not displayed
    });
    
    equipmentResults.innerHTML = newEquipmentList;
}

function displayEquipmentDetails(tableLocation) {
    console.log("Inside displayEquipmentDetails(", tableLocation, ")");
    console.log(equipmentTable[tableLocation].aoeu);

    var equipmentModal = document.getElementById("modal_body");
    var newEquipmentData = "<p>aoeu: " + equipmentTable[tableLocation].aoeu + "</p>";
    newEquipmentData += "<p>oeui: " + equipmentTable[tableLocation].oeui + "</p>";
    equipmentModal.innerHTML = newEquipmentData;
}

function displayEquipmentList() {
    console.log('Inside displayEquipmentList()');
    getEquipmentTable(); // calls updateWebpage() once the promise is fulfilled
}
