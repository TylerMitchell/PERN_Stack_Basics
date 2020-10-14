function fetchAllFromAuthRoute(){
    const fetch_url = 'http://localhost:3000/authtest/getall';
    const accessToken = localStorage.getItem('SessionToken');

    const response = fetch(fetch_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
    .then( (res) => { return res.json(); } )
    .then( (data) => { console.log(data); } )
}

function postToAuthRouteCreate(){
    const fetch_url = 'http://localhost:3000/authtest/create';
    const accessToken = localStorage.getItem("SessionToken");

    let authTestDataInput = document.getElementById('authTestData').value;
    let authInputData = { authtestdata: { item: authTestDataInput } };

    const response = fetch(fetch_url, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Authorization': accessToken
        },
        body: JSON.stringify(authInputData)
    })
    .then( (res) => { return res.json(); } )
    .then( (data) => { console.log(data); } );
}

function getOneByUser(){
    let postIdNumber = document.getElementById('getNumber').value;

    const fetch_url = `http://localhost:3000/authtest/${postIdNumber}`;
    const accessToken = localStorage.getItem("SessionToken");

    const response = fetch( fetch_url, {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'Authorization': accessToken
        }
    })
    .then( (res) => { return res.json(); } )
    .then( (res) => {
        console.log(res);
        let myItem = document.getElementById('getItemValue');
        myItem.innerHTML = res[0].authtestdata;
    });
}

function updateItem(){
    let postIdNumber = document.getElementById('updateNumber').value;
    let authTestDataInput = document.getElementById('updateValue').value;

    const fetch_url = `http://localhost:3000/authtest/update/${postIdNumber}`;
    const accessToken = localStorage.getItem("SessionToken");

    let authInputData = { authtestdata: { item: authTestDataInput } };
    const response = fetch( fetch_url, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
            'Authorization': accessToken
        },
        body: JSON.stringify(authInputData)
    })
    .then( (res) => { return res.json(); } )
    .then( (data) => {
        console.log(data);
        let myItem = document.getElementById('newItemValue');
        myItem.innerHTML = data.authtestdata;
        fetchAllFromAuthRoute();
    });
}

function showCurrentData(e){
    if( e.value != "" ){
        const fetch_url = `http://localhost:3000/authtest/${e.value}`;
        const accessToken = localStorage.getItem("SessionToken");
        console.log(fetch_url);
        fetch(fetch_url, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization': accessToken
            }
        })
        .then( (res) => { return res.json(); } )
        .then( (data) => {
            console.log(data);
            let myItem = document.getElementById('updateValue');
            if(!data){ return; }
            else{ myItem.value = (data.length > 0) ? data[0].authtestdata : ""; }
        });
    }
}

function deleteItem(){
    let postIdNumber= document.getElementById('deleteNumber').value;

    const fetch_url = `http://localhost:3000/authtest/delete/${postIdNumber}`;
    const accessToken = localStorage.getItem("SessionToken");

    const response = fetch( fetch_url, {
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json",
            'Authorization': accessToken
        }
    })
    .then( (res) => { console.log(res); fetchAllFromAuthRoute(); } );
}

function removeItem(e){
    console.log(e);
    let target = e.target;
    if( target.tagName !== 'LI' ){ return; }
    else{ target.parentNode.removeChild(target); }

    let x = target.getAttribute("id");
    deleteItemById(x);
    //console.log("The id number for this item is " + x);
}

function deleteItemById(paramNum){
    const fetch_url = `http://localhost:3000/authtest/delete/${paramNum}`;
    const accessToken = localStorage.getItem("SessionToken");

    const response = fetch( fetch_url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
    .then( (res) => { console.log(res); fetchAllFromAuthRoute(); } );
}

function fetchFromOneDisplayData(){
    const url = "http://localhost:3000/authtest/getall";
    const accessToken = localStorage.getItem("SessionToken");

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': "application/json",
            'Authorization': accessToken
        }
    })
    .then( (res) => { return res.json(); } )
    .catch( (err) => { console.error('Error: ', err); } )
    .then( (json) => {
        let text = "";
        let myList = document.querySelector("ul#fourteen");

        while(myList.firstChild){ myList.removeChild(myList.firstChild); }

        console.log(json);
        for(item of json){
            let listItem = document.createElement('li');
            let textData = item.id + ' ' + item.authtestdata;

            listItem.innerHTML = textData;
            listItem.setAttribute('id', item.id);

            myList.appendChild(listItem);
            myList.addEventListener( 'click', removeItem );
        }
    });
}