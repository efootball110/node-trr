

// const socket = io();

// if (navigator.geolocation) {
//     navigator.geolocation.watchPosition(
//         (position) => {
//             const { latitude, longitude } = position.coords;
//             socket.emit("send-location", { latitude, longitude });
//         },
//         (err) => {
//             console.log(err);
//         },
//         {
//             enableHighAccuracy: true,
//             timeout: 5000,
//             maximumAge: 0,
//         }
//     );
// }

// const map = L.map("map").setView([0, 0], 10);
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);



// const markers={};

// socket.on("receive-location",(data)=>{
//     const {id,latitude,longitude}=data;
//     map.setView([latitude,longitude],16);
//     if(markers[id]){
//         markers[id].setLatLng([latitude,longitude]);
//     }else{
//         markers[id]=L.marker([latitude,longitude]).addTo(map);
//     }
// })

// console.log("Hello");


const socket = io();


  
  

let firstName = prompt("Please enter your first name:");



if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("send-location", { latitude, longitude, firstName });
        },
        (err) => {
            console.log(err);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}

const map = L.map("map").setView([0, 0], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);



const markers = {};

socket.on("receive-location", (data) => {
    const { id, latitude, longitude, firstName } = data;

    // Center the map on the location
    map.setView([latitude, longitude], 15);

    // Check if marker for the user already exists
    if (markers[id]) {
        // Update the position of the marker
        markers[id].setLatLng([latitude, longitude]);
        // Optionally update the popup content if the information changes
        markers[id].getPopup().setContent(`Location of user ${firstName}`);
    } else {
        // Create a new marker with a popup
        markers[id] = L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(`Location of user ${firstName}`) // Add popup information
            .openPopup(); // Automatically open the popup when marker is added
    }
});

console.log("Hello");
