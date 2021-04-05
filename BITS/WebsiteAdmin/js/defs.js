var concessionsApiUrl = 'http://127.0.0.1:5000/concessions';
var customerInfoApiUrl = 'http://127.0.0.1:5000/customerinfo';
var employeeInfoApiUrl = 'http://127.0.0.1:5000/employeeinfo';
var equipmentApiUrl = 'http://127.0.0.1:5000/equipment';
var reservationsApiUrl = 'http://127.0.0.1:5000/reservations';

var equipmentTable;
var concessionsTable;
var reservationsTable;

// API access functions
//////////////////////////////////////////////////////// Reservations
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

//////////////////////////////////////////////////////// Concessions
function getConcessionsTable() {
    fetch(concessionsApiUrl).then(response => {
        return response.json();
    }).then(data => {
        concessionsTable = data;
    }).catch(err => {
        console.log(err);
    });
}

function postConcession(newConcession) {
    fetch(concessionsApiUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: newConcession
    }).then(response => {
        getConcessionsTable(); // refresh concessions table after post is complete
        document.getElementById("concessions_results").innerHTML = "<p>Item created successfully</p>";
    }).catch(err => {
        console.log(err);
    });
}

function deleteConcessionsItem(SKU) {
    var newUrl = concessionsApiUrl + "/" + SKU;
    fetch(newUrl, {
        method: 'DELETE',
    }).then(response => {
        getConcessionsTable(); // refresh concessions table after delete is complete
        document.getElementById("concessions_results").innerHTML = "Item was successfully removed from database"
    }).catch(err => {
        console.log(err);
    });
}

function putConcession(updatedConcession) {
    fetch(concessionsApiUrl, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: updatedConcession
    }).then(response => {
        getConcessionsTable(); // refresh concession table after put is complete
    }).catch(err => {
        console.log(err);
    });
}

//////////////////////////////////////////////////////// Equipment
function getEquipmentTable() {    
    fetch(equipmentApiUrl).then(response => {
        return response.json();
    }).then(data => {
        equipmentTable = data;
    }).catch(err => {
        console.log(err);
    });
}

function postEquipment(newEquipment) {
    fetch(equipmentApiUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: newEquipment
    }).then(response => {
        getEquipmentTable(); // refresh eq table after post is complete
        document.getElementById("equipment_results").innerHTML = "Equipment added successfully";
    }).catch(err => {
        console.log(err);
    });
}

function deleteEquipment(eqId) {
    var newUrl = equipmentApiUrl + "/" + eqId;
    fetch(newUrl, {
        method: 'DELETE',
    }).then(response => {
        getEquipmentTable(); // refresh eq table after delete is complete
        document.getElementById("equipment_results").innerHTML = "Equipment removed successfully";
    }).catch(err => {
        console.log(err);
    });
}

function putEquipment(updatedEquipment) {
    fetch(equipmentApiUrl, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: updatedEquipment
    }).then(response => {
        getEquipmentTable(); // refresh concessions table after put is complete
    }).catch(err => {
        console.log(err);
    });
}