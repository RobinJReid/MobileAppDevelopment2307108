class NavGroup extends HTMLElement{
    connectedCallback() {
        this.innerHTML = `
        <ion-header>
            <ion-toolbar color="tertiary">
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/"></ion-back-button>
                </ion-buttons>
                <ion-title><h1>Add Group</h1></ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-content>
                    <ion-item>
                        <ion-input id="group-name-input" label="Group Name" label-Placement="floating" placeholder="Enter Group Name" id="lbl-item-name"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input id="group-location-input" label="Group Location" label-Placement="floating" placeholder="Enter Group location"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-select id="group-type-input" label="Select Group Type" >
                            <ion-select-option value="All">All</ion-select-option>
                            <ion-select-option value="Sports">Sports</ion-select-option>
                            <ion-select-option value="Arts & Theatre">Arts & Theatre</ion-select-option>
                            <ion-select-option value="Music">Music</ion-select-option>
                        </ion-select>
                        
                    </ion-item>
                    <ion-item>
                        <ion-input id="group-date-input" label="Group Meeting Time" label-Placement="floating" placeholder="Enter Group Meeting Time"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-textarea id="group-description-input" label="Group Description" label-placement="floating" placeholder="Enter Group Description"></ion-textarea>
                    </ion-item>
                    <ion-button onclick="addGroup()" expand="block" color="tertiary">Add Group</ion-button>
                </ion-card-content>
            </ion-card>
        </ion-content>
        `;
      }
}

customElements.define('nav-group', NavGroup);

let inputGroupName;
let inputGroupLocation;
let inputGroupType;
let inputGroupDescription;
let inputGroupdate;

function addGroup(){
    inputGroupName = document.querySelector('#group-name-input');
    inputGroupLocation = document.querySelector('#group-location-input');
    inputGroupType = document.querySelector('#group-type-input');
    inputGroupDescription = document.querySelector('#group-description-input');
    inputGroupdate = document.querySelector('#group-date-input');

    const tx = db.transaction("records", "readwrite")
    const myRecords = tx.objectStore("records");

    tx.onerror = function(event){
        console.log(`Error! ${event.target.error}`);
    }
    tx.oncomplete = function(event){
        console.log("added items successfully");
    }


    const newGroup = {
        name: inputGroupName.value,
        location: inputGroupLocation.value,
        type: 'Group',
        typeDetail: inputGroupType.value,
        descrption: inputGroupDescription.value,
        date: inputGroupdate.value,
    }
    
    const request = myRecords.add(newGroup);
    request.onerror = function(event) {
        console.log(`Error adding group: ${event.target.error}`);
    };
    request.onsuccess = function(event) {
        console.log("Group added successfully");
        nav.pop();
    };
    
}



