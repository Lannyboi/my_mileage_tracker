const carsContainer = document.getElementById("cars-container")

fetch("https://my-mileage-tracker-d65fe5b7dfc2.herokuapp.com/api/cars")
.then(res => res.json())
.then(data => {
    data.forEach(makeCarCard)
})

function makeCarCard(car)
{
    
    carsContainer.innerHTML +=
    `
        <div class="car-card">
            <div class="car-image"></div>
            <div class="car-info">
                <p>${car.car_year} - ${car.make} ${car.model}</p>
            </div>
        </div>
    `
}
