// called when page is loaded
function getReservationsTable() {    
    fetch(reservationsApiUrl).then(response => {
        return response.json();
    }).then(data => {
        reservationsTable = data;
    }).catch(err => {
        console.log(err);
    });
}

function postReservation(newReservation) {
    fetch(reservationsApiUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: newReservation
    }).then(response => {
        getReservationsTable(); // refresh reservations table after post is complete
        document.getElementById("reservation_results").innerHTML = "<p>Reservation made successfully</p>";
    }).catch(err => {
        console.log(err);
    });
}

// called when delete button is clicked on an equipment
function deleteReservation(ID) {
    var newUrl = reservationsApiUrl + "/" + ID;
    fetch(newUrl, {
        method: 'DELETE',
    }).then(response => {
        getReservationsTable(); // refresh reservations table after delete is complete
        document.getElementById("reservation_results").innerHTML = "<p>Reservation cancelled successfully</p>";
    }).catch(err => {
        console.log(err);
    });
}

function putReservation(updatedReservation) {
    fetch(reservationsApiUrl, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: updatedReservation
    }).then(response => {
        getReservationsTable(); // refresh reservations table after put is complete
    }).catch(err => {
        console.log(err);
    });
}

function listTournaments() {
    var newData = "";

    for (i = 0; i < reservationsTable.length; i++) {
        if (reservationsTable[i].EventType == 1) {
            newData = newData.concat
                ("<p>Name: ", reservationsTable[i].Name, "</p>"
                + "<p>Location: ", reservationsTable[i].Location, "</p>"
                + "<p>Event Type: Tournament</p>"
                + "<p>Date/Time: ", reservationsTable[i].DateTime,"</p>"
                + "<p>Equipment: ", reservationsTable[i].Equipment,"</p>"
                + "<button type=\"button\" onClick=\"deleteReservation(", reservationsTable[i].ID,")\">Cancel Reservation</button>"
                + "<button type=\"button\" data-toggle=\"modal\" data-target=\"#reservation_modal\" onClick=\"editReservationModal(", i,")\">Edit Reservation</button>"
                + "<hr>");
        }
    }

    if (newData == "") {
        newData += "No tournaments available";
    }
    else newData = "Sort by: "
        + "<button type=\"button\" onClick=\"sortByName(1)\">Name</button>"
        + "<button type=\"button\" onClick=\"sortByEquipment(1)\">Equipment</button>"
        + "<button type=\"button\" onClick=\"sortByDateTime(1)\">Date and Time</button><br><br>" + newData;

    document.getElementById("reservation_results").innerHTML = newData;
}
function listReservations() {
    var newData = "";

    for (i = 0; i < reservationsTable.length; i++) {
        if (reservationsTable[i].EventType == 2) {
            newData = newData.concat
                ("<p>Name: ", reservationsTable[i].Name, "</p>"
                + "<p>Location: ", reservationsTable[i].Location, "</p>"
                + "<p>Event Type: Personal Reservation</p>"
                + "<p>Date/Time: ", reservationsTable[i].DateTime,"</p>"
                + "<p>Equipment: ", reservationsTable[i].Equipment,"</p>"
                + "<button type=\"button\" onClick=\"deleteReservation(", reservationsTable[i].ID,")\">Cancel Reservation</button>"
                + "<button type=\"button\" data-toggle=\"modal\" data-target=\"#reservation_modal\" onClick=\"editReservationModal(", i,")\">Edit Reservation</button>"
                + "<hr>");
        }
    }

    if (newData == "") {
        newData += "No reservations available";
    }
else newData = "Sort by: "
        + "<button type=\"button\" onClick=\"sortByName(2)\">Name</button>"
        + "<button type=\"button\" onClick=\"sortByEquipment(2)\">Equipment</button>"
        + "<button type=\"button\" onClick=\"sortByDateTime(2)\">Date and Time</button><br><br>" + newData;

    document.getElementById("reservation_results").innerHTML = newData;
}
function listOther() {
    var newData = "";

    for (i = 0; i < reservationsTable.length; i++) {
        if (reservationsTable[i].EventType == 3) {
            newData = newData.concat
                ("<p>Name: ", reservationsTable[i].Name, "</p>"
                + "<p>Location: ", reservationsTable[i].Location, "</p>"
                + "<p>Event Type: Other Reservation</p>"
                + "<p>Date/Time: ", reservationsTable[i].DateTime,"</p>"
                + "<p>Equipment: ", reservationsTable[i].Equipment,"</p>"
                + "<button type=\"button\" onClick=\"deleteReservation(", reservationsTable[i].ID,")\">Cancel Reservation</button>"
                + "<button type=\"button\" data-toggle=\"modal\" data-target=\"#reservation_modal\" onClick=\"editReservationModal(", i,")\">Edit Reservation</button>"
                + "<hr>");
        }
    }

    if (newData == "") {
        newData += "No other events available";
    }
    else newData = "Sort by: "
        + "<button type=\"button\" onClick=\"sortByName(3)\">Name</button>"
        + "<button type=\"button\" onClick=\"sortByEquipment(3)\">Equipment</button>"
        + "<button type=\"button\" onClick=\"sortByDateTime(3)\">Date and Time</button><br><br>" + newData;

    document.getElementById("reservation_results").innerHTML = newData;
}


function newReservationModal() {
    var newData = "";

    var modalTitle = document.getElementById("modal_header");
    newData = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
    newData += "<h4 class=\"modal-title\">Create New Reservation</h4>";
    modalTitle.innerHTML = newData;

    var modalBody = document.getElementById("modal_body");
    newData = "<p>Name:</p><input type=\"text\" id=\"new_reservation_name\" size=\"40\"><br><br>";
    newData += "<p>Location:</p><input type=\"text\" id=\"new_reservation_location\" size=\"40\"><br><br>";
    newData += "<p>Event Type:</p><input type=\"text\" id=\"new_reservation_event_type\" size=\"40\"><br><br>";
    newData += "<p>Date and Time:</p><input type=\"text\" id=\"new_reservation_date_time\" size=\"40\"><br><br>";
    newData += "<p>Equipment:</p><input type=\"text\" id=\"new_reservation_equipment\" size=\"40\"><br><br>";
    modalBody.innerHTML = newData; // don't need to ask for ID, it will be automatically inferred

    var modalFooter = document.getElementById("modal_footer");
    newData = 
          "<button type=\"button\" class=\"btn btn-default\" onclick=\"submitNewReservation()\" data-dismiss=\"modal\">Add</button>"
        + "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>";
    modalFooter.innerHTML = newData;
}

function submitNewReservation() {
    var newID = getMaxReservationID() + 1;
    var newReservation = {
        "ID": newID,
        "name": document.getElementById("new_reservation_name").value,
        "location": document.getElementById("new_reservation_location").value,
        "eventType": parseInt(document.getElementById("new_reservation_event_type").value),
        "dateTime": document.getElementById("new_reservation_date_time").value,
        "equipment": parseInt(document.getElementById("new_reservation_equipment").value),
    }
    postReservation(JSON.stringify(newReservation));
}

function editReservationModal(tableLocation) {
    var newData = "";

    var modalTitle = document.getElementById("modal_header");
    newData = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
    newData += "<h4 class=\"modal-title\">Edit Reservation</h4>";
    modalTitle.innerHTML = newData;

    var modalBody = document.getElementById("modal_body");
    newData = "<p>Name:</p><input type=\"text\" id=\"edit_reservation_name\" size=\"40\" value=\"" + reservationsTable[tableLocation].Name + "\"><br><br>";
    newData += "<p>Location:</p><input type=\"text\" id=\"edit_reservation_location\" size=\"40\" value=\"" + reservationsTable[tableLocation].Location + "\"><br><br>";
    newData += "<p>Event Type:</p><input type=\"text\" id=\"edit_reservation_event_type\" size=\"40\" value=\"" + reservationsTable[tableLocation].EventType + "\"><br><br>";
    newData += "<p>Date and Time:</p><input type=\"text\" id=\"edit_reservation_date_time\" size=\"40\" value=\"" + reservationsTable[tableLocation].DateTime + "\"><br><br>";
    newData += "<p>Equipment:</p><input type=\"text\" id=\"edit_reservation_equipment\" size=\"40\" value=\"" + reservationsTable[tableLocation].Equipment + "\"><br><br>";
    modalBody.innerHTML = newData;

    var modalFooter = document.getElementById("modal_footer");
    newData = 
          "<button type=\"button\" class=\"btn btn-default\" onclick=\"editReservation(" + tableLocation + ")\" data-dismiss=\"modal\">Save Changes</button>"
        + "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>";
    modalFooter.innerHTML = newData;
}

function editReservation(tableLocation) {
    var editReservation = {
        "ID": reservationsTable[tableLocation].ID,
        "name": document.getElementById("edit_reservation_name").value,
        "location": document.getElementById("edit_reservation_location").value,
        "eventType": parseInt(document.getElementById("edit_reservation_event_type").value),
        "dateTime": document.getElementById("edit_reservation_date_time").value,
        "equipment": parseInt(document.getElementById("edit_reservation_equipment").value),
    }
    putReservation(JSON.stringify(editReservation));
    document.getElementById("reservation_results").innerHTML = "Reservation updated successfully";
}

function getMaxReservationID() {
    var max = 0;
    for (i = 0; i < reservationsTable.length; i++) {
        if (reservationsTable[i].ID > max) {
            max = reservationsTable[i].ID;
        }
    }
    return max;
}

function checkAvailabilityModal() {
    var newData = "";

    var modalTitle = document.getElementById("modal_header");
    newData = "<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
    newData += "<h4 class=\"modal-title\">Check Space Availability</h4>";
    modalTitle.innerHTML = newData;

    var modalBody = document.getElementById("modal_body");
    newData = "<p>Enter space to check</p><input type=\"text\" id=\"space_to_check\" size=\"40\"><br><br>";
    modalBody.innerHTML = newData;

    var modalFooter = document.getElementById("modal_footer");
    newData = 
          "<button type=\"button\" class=\"btn btn-default\" onclick=\"checkAvailability()\" data-dismiss=\"modal\">Check</button>"
        + "<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>";
    modalFooter.innerHTML = newData;
}

function checkAvailability() {
    var space = document.getElementById("space_to_check").value;
    var newData = ""
    for (i = 0; i < reservationsTable.length; i++) {
        if (reservationsTable[i].Location == space) {
            newData += "<p>" + reservationsTable[i].Name + " at " + reservationsTable[i].DateTime + "</p>";
        }
    }
    if (newData == "") {
        newData = "<p>Space not in use</p>";
    }
    else newData = "<p>Space in use by</p>" + newData;
    document.getElementById("reservation_results").innerHTML = newData;
}

function sortByName(eventType) {
    for (i = 0; i < reservationsTable.length; i++) {
        for (j = 0; j < reservationsTable.length - i - 1; j++) {
            if (reservationsTable[j].Name > reservationsTable[j + 1].Name) {
                var temp = reservationsTable[j];
                reservationsTable[j] = reservationsTable[j + 1];
                reservationsTable[j + 1] = temp;
            }
        }
    }
    switch (eventType) {
        case 1: listTournaments(); break;
        case 2: listReservations(); break;
        case 3: listOther(); break;
    }
}
function sortByEquipment(eventType) {
    for (i = 0; i < reservationsTable.length; i++) {
        for (j = 0; j < reservationsTable.length - i - 1; j++) {
            if (reservationsTable[j].Equipment > reservationsTable[j + 1].Equipment) {
                var temp = reservationsTable[j];
                reservationsTable[j] = reservationsTable[j + 1];
                reservationsTable[j + 1] = temp;
            }
        }
    }
    switch (eventType) {
        case 1: listTournaments(); break;
        case 2: listReservations(); break;
        case 3: listOther(); break;
    }
}
function sortByDateTime(eventType) {
    for (i = 0; i < reservationsTable.length; i++) {
        for (j = 0; j < reservationsTable.length - i - 1; j++) {
            if (reservationsTable[j].DateTime > reservationsTable[j + 1].DateTime) {
                var temp = reservationsTable[j];
                reservationsTable[j] = reservationsTable[j + 1];
                reservationsTable[j + 1] = temp;
            }
        }
    }
    switch (eventType) {
        case 1: listTournaments(); break;
        case 2: listReservations(); break;
        case 3: listOther(); break;
    }
}