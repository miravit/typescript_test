//axios med typescript

import axios from 'axios';

let promise = axios.get(
    "http://www.omdbapi.com/?i=tt3896198&apikey=25462718&s=love"
  );
  promise.then((response) => {;
    handleData(response.data.Search); //response.data är samma som data från fetch. och .Search tar mig in i Search
  });

  function handleData (response:[]){
    console.log(response)
    for (let i = 0; i < response.length; i++) {
        let myList:[] = response[i];
        console.log(myList)
        let pTag:HTMLParagraphElement = document.createElement("p");
        pTag.innerHTML+=myList[i].title;
        document.body.appendChild(pTag)

        
    }
  }
