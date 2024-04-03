class NavEvent extends HTMLElement{
    connectedCallback() {
        this.innerHTML = `
        <ion-header>
            <ion-toolbar color="tertiary">
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/"></ion-back-button>
                </ion-buttons>
                <ion-title><h1>Add Event</h1></ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-content>
                    <ion-item>
                        <ion-input id="Event-name-input" label="Event Name" label-Placement="floating" placeholder="Enter Event Name"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input id="Event-location-input" label="Event Location" label-Placement="floating" placeholder="Enter Event location"></ion-input>
                    </ion-item>
                    <ion-item>
                    <ion-select id="Event-type-input" label="Select Event Type" >
                        <ion-select-option value="All">All</ion-select-option>
                        <ion-select-option value="Sports">Sports</ion-select-option>
                        <ion-select-option value="Arts & Theatre">Arts & Theatre</ion-select-option>
                        <ion-select-option value="Music">Music</ion-select-option>
                    </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-input id="Event-date-input" label="Event Date" label-Placement="floating" placeholder="Enter Event date"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-textarea id="Event-description-input" label="Event Description" label-placement="floating" placeholder="Enter Event Description"></ion-textarea>
                    </ion-item>
                    <ion-button onclick="addEvent()" expand="block" color="tertiary">Add Event</ion-button>
                </ion-card-content>
            </ion-card>
        </ion-content>

        `;
      }
}

customElements.define('nav-event', NavEvent);

let inputEventName;
let inputEventLocation;
let inputEventType;
let inputEventDescription;
let inputEventDate;

function addEvent(){
    inputEventName = document.querySelector('#Event-name-input');
    inputEventLocation = document.querySelector('#Event-location-input');
    inputEventType = document.querySelector('#Event-type-input');
    inputEventDescription = document.querySelector('#Event-description-input');
    inputEventDate = document.querySelector('#Event-date-input');

    const tx = db.transaction("records", "readwrite")
    const myRecords = tx.objectStore("records");

    tx.onerror = function(event){
        console.log(`Error! ${event.target.error}`);
    }
    tx.oncomplete = function(event){
        console.log("added items successfully");
    }


    const newEvent = {
        name: inputEventName.value,
        location: inputEventLocation.value,
        type: 'Event',
        typeDetail: inputEventType.value,
        descrption: inputEventDescription.value,
        date: inputEventDate.value,
    }
    
    const request = myRecords.add(newEvent);
    request.onerror = function(event) {
        console.log(`Error adding Event: ${event.target.error}`);
    };
    request.onsuccess = function(event) {
        console.log("Event added successfully");
        nav.pop();
    };
    
}