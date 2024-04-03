//tab navigation stuff
class NavHome extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <ion-tabs>
            <ion-tab tab="groups">
                <ion-nav id="group-nav"></ion-nav>
                <div id="groups-page">
                    <ion-header>
                        <ion-toolbar color="tertiary">
                            <ion-title><h1>Groups</h1></ion-title>
                        </ion-toolbar>
                    </ion-header>
                    <ion-content fullscreen="true" class="ion-padding">
                        <ion-select onclick="GroupSelecterLoad()" id="select-group" label="Select Group Type" >
                            <ion-select-option value="All">All</ion-select-option>
                            <ion-select-option value="Sports">Sports</ion-select-option>
                            <ion-select-option value="Arts & Theatre">Arts & Theatre</ion-select-option>
                            <ion-select-option value="Music">Music</ion-select-option>
                        </ion-select>
                        <ion-accordion-group id = "group-list-objects">
                        </ion-accordion-group>

                    </ion-content>

                </div>
            </ion-tab>
            <ion-tab tab="events">
                <ion-nav id="event-nav"></ion-nav>
                <div id="event-page">
                    <ion-header>
                        <ion-toolbar color="tertiary">
                            <ion-title><h1>Events</h1></ion-title>
                        </ion-toolbar>
                    </ion-header>
                    <ion-content fullscreen="true" class="ion-padding">
                        <ion-select onclick="EventSelecterLoad()" id="select-event" label="Select Event Type" >
                            <ion-select-option value="All">All</ion-select-option>
                            <ion-select-option value="Sports">Sports</ion-select-option>
                            <ion-select-option value="Arts & Theatre">Arts & Theatre</ion-select-option>
                            <ion-select-option value="Music">Music</ion-select-option>
                        </ion-select>
                        <ion-accordion-group id = "event-list-objects"></ion-accordion-group>

                    </ion-content>
                    
                </div>
            </ion-tab>
            <ion-tab tab="add">
                <ion-nav id="add-nav"></ion-nav>
                <div id="add-page">
                    <ion-header>
                        <ion-toolbar color="tertiary">
                            <ion-title><h1>Add</h1></ion-title>
                        </ion-toolbar>
                    </ion-header>
                    <ion-content fullscreen="true" class="ion-padding">

                        <ion-item>
                            <ion-img src="images/group.jpg"/>
                        </ion-item>
                        <ion-button onclick="showDetailGroup()"expand="block" color="tertiary">Add Group</ion-button>
                        <ion-item>
                            <ion-img src="images/tickets.jpg"/>
                        </ion-item>
                       <ion-button onclick="showDetailEvent()"expand="block" color="tertiary">Add Event</ion-button>
                    </ion-content>
                </div>
            </ion-tab>
            <ion-tab-bar slot="bottom" color="tertiary">
                <ion-tab-button tab="groups">  
                    <h3>groups</h3>
                </ion-tab-button>
                <ion-tab-button tab="events">  
                    <h3>Events</h3>
                </ion-tab-button>
                <ion-tab-button tab="add">  
                    <h3>Add</h3>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
        `;
    }
}



customElements.define('group-nav-home', NavHome);

const nav = document.querySelector('ion-nav');


function showDetailEvent(){
    nav.push('nav-event');
    console.log("Clicked");
}

function showDetailGroup(){
    nav.push('nav-group');
    console.log("Clicked");
}



// Data base stuff

let objectList;
let db = null;

    
window.onload = function createDB(){
        const request = indexedDB.open("groupDB", 1);

        //----Possible Pathways---------------

        request.onerror = function(event){
            console.log(`error: ${error.target.error}`);
        }

        request.onsuccess = function(event){
            db = event.target.result;
            console.log(`success is called`);
            addData()
        }

        request.onupgradeneeded = function(event){
            db = event.target.result;
            const myRecords = db.createObjectStore("records", { autoIncrement: true });
            console.log(`upgrade is called`);
        }
        
}

//takes data from data.js to ensure that any user added data is formatted correctly and has all the correct fields, preventing errors
function addData(){
        const tx = db.transaction("records", "readwrite")
        tx.onerror = function(event){
            console.log(`Error! ${event.target.error}`);
        }
        tx.oncomplete = function(event){
            console.log("added items successfully");
        }

        const myRecords = tx.objectStore("records");

        //for each object it adds to indexdb
        for (obj of dataArray){
            myRecords.add(obj);
            console.log("object added");
        }
        
}

//function to show groups after theyre sorted
function GroupViewData(type){

    //ensures that type cannot be null
    if (type){
        console.log(type.value);
    }else{
        type=``;
    }

    objectList = document.getElementById('group-list-objects');
    // prevents duplicates
    removeAllListItems(); 

    //open transaction to get data
    const tx = db.transaction("records", "readonly");
    const myRecords = tx.objectStore("records");

    //creates a curser (object that goes through the database to find the item)
    const Request = myRecords.openCursor();

    //if the request is successful then it will run function
    Request.onsuccess = function(event) {
        const item = event.target.result;

        //checks if item should be added then adds
        if (item) {
            const obj = item.value;
            if (obj.type.trim()==="Group") {

                if(obj.typeDetail.trim()=== type.value || type.value === "All"){
                    console.log("would be added" + type + obj.typeDetail)

                    //calls function to add accordion item
                    const newItem = groupCreateAccordionItem(obj);
                    objectList.appendChild(newItem);
                }else{
                    console.log("shouldnt add" + obj.name);
                }
                
            } else {

            }

            // Move to the next item
            item.continue();
        }
    };

    Request.onerror = function(event) {
        console.log("Error accessing database:", event.target.error);
    };
}

//function to add accordion item to group
function groupCreateAccordionItem(Data) {
    console.log(Data);
    //accesses main container element
    const accordionContainer = document.createElement('ion-accordion');

    // header stuff
    const HeaderItem = document.createElement('ion-item');
    HeaderItem.setAttribute('slot', 'header');
    HeaderItem.setAttribute('color', 'light');
    const headerLabel = document.createElement('ion-label');
    HeaderItem.innerHTML = `<h3>${Data.name}</h3>`;

    //accordion content
    const contentItem = document.createElement('div');
    contentItem.classList.add('ion-padding');
    contentItem.setAttribute('slot', 'content');
    contentItem.innerHTML = `<p>Group Meeting Time: ${Data.date}</p><p>Location: ${Data.location}</p><p>Type: ${Data.typeDetail}</p><p>Description: ${Data.descrption}</p>`;


    // add elements
    accordionContainer.appendChild(HeaderItem);
    accordionContainer.appendChild(contentItem);

    return accordionContainer;
}
function EventViewData(type){

    //ensures type cant be null
    if (type){
        console.log(type.value);
    }else{
        type=``;
    }
    

    objectList = document.getElementById('event-list-objects');
    removeAllListItems(); 

    //open transaction to get data
    const tx = db.transaction("records", "readonly");
    const myRecords = tx.objectStore("records");

    //opens a curser to get data
    const Request = myRecords.openCursor();

    const addedItems = new Set();

    //If the request is successful then it will run function
    Request.onsuccess = function(event) {
        const item = event.target.result;
        

        //checks if item should be added then adds
        if (item) {
            const obj = item.value;
            if (obj.type.trim()==="Group") {

                if(obj.typeDetail.trim()=== type.value || type.value === "All"){
                    console.log("would be added" + type + obj.typeDetail)

                    //calls function to add accordion item
                    const newItem = groupCreateAccordionItem(obj);
                    objectList.appendChild(newItem);
                }else{
                    console.log("shouldnt add" + obj.name);
                }
                
            } else {

            }

            // Move to the next item
            item.continue();
        }
    };

    Request.onerror = function(event) {
        console.log("Error accessing database:", event.target.error);
    };
    // adds stuff from api
    addExternalEvents(type)
}

// function to add accordion items to events
function eventCreateAccordionItem(Data) {
    // Create main container item
    const accordionContainer = document.createElement('ion-accordion');

    // header stuff
    // declare header item
    const HeaderItem = document.createElement('ion-item');
    //set atributes
    HeaderItem.setAttribute('slot', 'header');
    HeaderItem.setAttribute('color', 'light');
    const headerLabel = document.createElement('ion-label');
    HeaderItem.innerHTML = `<h3>${Data.name}</h3>`;

    //accordion content
    // declare content item
    const contentItem = document.createElement('div');
    //set atributes
    contentItem.classList.add('ion-padding');
    contentItem.setAttribute('slot', 'content');
    contentItem.innerHTML = `<p>Date: ${Data.date}</p><p>Location: ${Data.location}</p><p>Type: ${Data.typeDetail}</p><p>Description: ${Data.descrption}</p>`;


    // add elements
    accordionContainer.appendChild(HeaderItem);
    accordionContainer.appendChild(contentItem);

    return accordionContainer;
}


function removeAllListItems(){
    while (objectList.lastElementChild) {
        console.log(objectList.lastElementChild)
        objectList.removeChild(objectList.lastElementChild);
        
    }
  }






  // ------- Api Stuff--------------------




function addExternalEvents(type) {
    objectList = document.getElementById('event-list-objects');
    console.log("adding External Events")
    let externalEventArray
    // code from TICKETMASTER, Discovery API. [online]. Beverly Hills, California , U.S.: ticketmaster. Available from: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/ [01/04/2024].
    $.ajax({
        type:"GET",
        url:"https://app.ticketmaster.com/discovery/v2/events.json?&dmaId=607&apikey=bMeR4ijzJlQdBXba6OyeKqYbzEkRYPBA",
        async:true,
        dataType: "json",
        success: function(json) {
                    console.log(json);
                    
                    // my code again
                    externalEventArray = json._embedded.events;
                    
                    for (obj of externalEventArray){
                        console.log(obj)
                        console.log(obj.classifications[0].segment.name);
                        if(obj.classifications[0].segment.name === type.value || type.value === "All"){
                            const newItem = externalCreateAccordionItem(obj);
                            objectList.appendChild(newItem);
                        }
                    }

                    // end of my code
                },
        error: function(xhr, status, err) {
                }
    });
    // end of code from ticketmaster website
}

function externalCreateAccordionItem(Data) {
    // Create elements for accordion
    const accordionContainer = document.createElement('ion-accordion');

    // header stuff
    const HeaderItem = document.createElement('ion-item');
    HeaderItem.setAttribute('slot', 'header');
    HeaderItem.setAttribute('color', 'light');
    const headerLabel = document.createElement('ion-label');
    HeaderItem.innerHTML = `<h3>${Data.name}</h3>`;

    //accordion content
    const contentItem = document.createElement('div');
    contentItem.classList.add('ion-padding');
    contentItem.setAttribute('slot', 'content');
    
    // Make sure that field exists and code wont stop because a single item in the array lacks a field
    let type
    if (Data.classifications && Data.classifications.length > 0){
        type = Data.classifications[0].segment.name;
    }else{
        type = "undefined";
    }
    let date
    if (Data.dates.start.localDate){
        date = Data.dates.start.localDate;
    }else{
        date = "undefined";
    }
    let location
    if (Data._embedded.venues[0].name){
        location = Data._embedded.venues[0].name;
    }else{
        location = "undefined";
    }
    let description = Data.url;
    if (Data.url){
        description = Data.url;
    }else{
        description = "undefined";
    }

    contentItem.innerHTML = `<p>Date: ${date}</p><p>Location: ${location}</p><p>Type: ${type}</p><p>Description: ${description}</p>`;


    // add elements
    accordionContainer.appendChild(HeaderItem);
    accordionContainer.appendChild(contentItem);

    return accordionContainer;
}

let eventSelect
let eventListenerAdded = false;
//------------Sort Stuff---------
function EventSelecterLoad(){
    console.log("||Function CALLED||")
    eventSelect = document.getElementById('select-event');
    if (eventListenerAdded) {
        console.log("||EVENT LISTENER ON, BEING REMOVED||")
        eventListenerAdded = false;
        eventSelect.removeEventListener('ionChange', handleIonChange);
    }
    eventSelect.addEventListener('ionChange', handleIonChange);
    eventListenerAdded = true;
    console.log("||ADDED NEW EVENT LISTENER||")

    function handleIonChange(event) {
        console.log(event); 
        console.log("ITEM ADDED OR REMOVED");
        if (eventListenerAdded){
            EventViewData(eventSelect);
            console.log("||there is currently an event listener||")
            eventSelect.removeEventListener('ionChange', handleIonChange);
            eventListenerAdded = false;
        } else{
            console.log("||SHOULDNT HAVE ADDED THING||")
        }

    }
}

let groupSelect
let groupListenerAdded = false;
function GroupSelecterLoad(){
    console.log("||Function CALLED||")
    groupSelect = document.getElementById('select-group');
    if (groupListenerAdded) {
        console.log("||EVENT LISTENER ON, BEING REMOVED||")
        groupListenerAdded = false;
        groupSelect.removeEventListener('ionChange', handleIonChange);
    }
    groupSelect.addEventListener('ionChange', handleIonChange);
    groupListenerAdded = true;
    console.log("||ADDED NEW EVENT LISTENER||")

    function handleIonChange(event) {
        console.log(event); 
        console.log("ITEM ADDED OR REMOVED");
        if (groupListenerAdded){
            GroupViewData(groupSelect);
            console.log("||there is currently an event listener||")
            groupSelect.removeEventListener('ionChange', handleIonChange);
            groupListenerAdded = false;
        } else{
            console.log("||SHOULDNT HAVE ADDED THING||")
        }

    }
}

