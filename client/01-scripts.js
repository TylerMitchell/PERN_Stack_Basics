function fetchHelloDataFromAPI(){ 
    fetch('http://localhost:3000/test/helloclient', {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then( (res) => {
        console.log("Fetch response: ", res);
        return res.json();
    }).then( (text) => {
        console.log(text);
    });
}

function postToOne(){
    let url = 'http://localhost:3000/test/one'

    fetch(url, {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then( (res) => { return res.text(); } )
    .catch( (err) => { console.log('Error: ', err); } )
    .then( (res) => { console.log("Success: ", res); } )
}

function postToOneArrow() { postToOne(); }

function postData() {
    let content = { testdata: { item: 'This was saved' } };

    let testDataAfterFetch =  document.getElementById('test-data');
    let createdAtAfterFetch = document.getElementById('created-at');

    fetch('http://localhost:3000/test/seven', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    })
    .then( (res) => { return res.json(); })
    .then( (text) => {
        console.log(text);
        testDataAfterFetch.innerHTML = text.testdata.testData;
        createdAtAfterFetch.innerHTML = text.testdata.createdAt;
    });
}

function fetchFromOneDisplayData() {
    let url = 'http://localhost:3000/test/one';

    fetch(url, {
        method: "GET",
        headers: new Headers({
            'Content-Type': "application/json"
        })
    }).then( (res) => { return res.json(); } )
    .catch( (err) => { console.error('Error: ', err); } )
    .then( (results) => {
        let myList = document.querySelector('#getjson');

        for(r of results){
            console.log('Response:', r.testData);
            let listItem = document.createElement('li');
            listItem.innerHTML = r.testData;
            myList.appendChild(listItem);
        }
    } )
}