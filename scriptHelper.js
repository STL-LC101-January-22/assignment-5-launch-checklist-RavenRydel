// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
  
    let possiblePlanets = "";
    possiblePlanets += `<h2> Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">`
    
    document.innerHTML = possiblePlanets;
}

function validateInput(testInput) {
    
    let nameOfPilot = document.querySelector("input[name=pilotName]");
    let nameOfCopilot = document.querySelector("input[name=copilotName]");
    let levelOfFuel = document.querySelector("input[name=fuelLevel]");
    let massOfCargo = document.querySelector("input[name=cargoMass]");
    
    if(testInput === ""){
        return alert("Empty");
    } else if(!isNaN(testInput)){
        if(testInput === nameOfPilot.value || testInput === nameOfCopilot.value){
            return alert("Is a Number");
        }
    } else if(isNaN(testInput)){
        if(testInput === levelOfFuel.value || testInput === massOfCargo.value){
            return alert("Not a Number");
        }
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    let statusOfPilot = document.getElementById("pilotStatus");
    let statusOfCopilot = document.getElementById("copilotStatus");
    let statusOfFuelLevel = document.getElementById("fuelStatus");
    let statusOfCargoLevel = document.getElementById("cargoStatus");
    
    let launchReady = document.getElementById("launchStatus");
    
    validateInput(pilot);
    validateInput(copilot);
    validateInput(fuelLevel);
    validateInput(cargoLevel);

    statusOfPilot.textContent = `Pilot ${pilot} is ready for launch`;
    statusOfCopilot.textContent = `Co-pilot ${copilot} is ready for launch`;

    if(pilot === "" || copilot === "" || fuelLevel === "" ||  cargoLevel === ""){
        return false;

    } else if(fuelLevel < 10000){
        list.style.visibility = "visible";
        statusOfFuelLevel.textContent = "Fuel level too low for launch";
        launchReady.style.color = "rgb(199, 37, 78)";
        launchReady.textContent = "Shuttle not ready for launch";

    } else if(cargoLevel > 10000){
        list.style.visibility = "visible";
        statusOfCargoLevel.textContent = "Cargo mass too heavy for launch";
        launchReady.style.color = "rgb(199, 37, 78)";
        launchReady.textContent = "Shuttle not ready for launch";

    } else{
        list.style.visibility = "visible";
        launchReady.style.color = "rgb(65, 159, 106)";
        launchReady.textContent = "Shuttle is Ready for Launch";
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
