
const errorMessage = document.querySelector('#errorMessage');
const goodMessage = document.querySelector('#goodMessage');
const weatherForm = document.querySelector('form');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    goodMessage.innerText="";
    errorMessage.innerText="Loading...";
    const search = e.target.children.address.value;
    fetch(`http://localhost:3000/weather?address=${search}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                goodMessage.innerText="";
                errorMessage.innerText=data.error
               
            } else {
                const { forecastData, location } = data
                errorMessage.innerText=""
                goodMessage.innerText = (
                    `location: ${location}
                   \n
                    summary: ${forecastData.summary}
                    \n
                    temperatureHigh: ${forecastData.temperatureHigh}
                    \n
                    temperatureLow: ${forecastData.temperatureLow}
                    \n
                    precipProbability: ${forecastData.precipProbability}`
                );
                e.target.children.address.value = "";
            }

        });
    })

})





