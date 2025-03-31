document.addEventListener("DOMContentLoaded", function () {
    const busesData = {
        "City A-City B": [
            { id: 1, name: "Red Express", time: "10:00 AM", price: "$15" },
            { id: 2, name: "Blue Travels", time: "1:00 PM", price: "$18" },
            { id: 3, name: "Green Line", time: "4:00 PM", price: "$20" }
        ],
        "City B-City C": [
            { id: 4, name: "Silver Wings", time: "9:30 AM", price: "$12" },
            { id: 5, name: "Yellow Bus", time: "12:00 PM", price: "$17" }
        ],
        "City C-City D": [
            { id: 6, name: "Black Arrow", time: "8:00 AM", price: "$14" },
            { id: 7, name: "Skyline Travels", time: "2:30 PM", price: "$22" }
        ]
    };

    // Get search parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const fromCity = urlParams.get("from");
    const toCity = urlParams.get("to");

    // Create route key
    const routeKey = `${fromCity}-${toCity}`;
    const busList = busesData[routeKey] || [];

    // Display buses
    const busContainer = document.getElementById("bus-list");
    busContainer.innerHTML = "";

    if (busList.length === 0) {
        busContainer.innerHTML = "<p>No buses available for this route.</p>";
    } else {
        busList.forEach(bus => {
            busContainer.innerHTML += `
                <div class="bus-item">
                    <h3>${bus.name}</h3>
                    <p>Departure Time: ${bus.time}</p>
                    <p>Price: ${bus.price}</p>
                    <button onclick="bookBus(${bus.id})">Book Now</button>
                </div>
            `;
        });
    }
});

function bookBus(busId) {
    alert("Bus ID " + busId + " booked successfully!");
}
