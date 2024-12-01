
function getUsers(){
    fetch('/api/getUsers', {
        method: 'GET',
        headers: {'Content-type': 'application/json'}
    })
    .then(res => {
        if (res.ok) {
            res.json()
            .then(data => displayUsers(data))       //Calling to display all of the lists
            .catch(err => console.log('Failed to get json object'))
        }
        else {
            console.log('Error: ',res.status)
        }        
    })
    .catch();
}

function displayUsers(){
    x = document.getElementById('getUsers');      //Showing the div area
    x.style.display = 'block';

    
}

function hideUserResults(){
    x = document.getElementById('getUsers');      //Showing the div area
    x.style.display = 'none';

    x = document.getElementById(userResults);
    x.innerHTML= '';
}