function getEquipment() {    
    var apiUrl = 'https://localhost:44335/api/Table1';
    fetch(apiUrl).then(response => {
        return response.json();
    }).then(data => {
        // Work with JSON data here
        console.log(data);
        
    }).catch(err => {
        // Do something for an error here
    });
}

function displayEquipment() {
    console.log('Calling displayEquipment()');
    getEquipment();
}