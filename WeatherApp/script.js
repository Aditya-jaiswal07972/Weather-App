const button = document.getElementById("search-button")
const city = document.getElementById("search-input")
const cityname = document.getElementById("city-name")
const citytime = document.getElementById("city-time")
const citytemp = document.getElementById("city-temp")
const img = document.getElementById("img-icon")
const forecastContainer = document.createElement("div");

forecastContainer.id = "forecast";
document.querySelector(".container").appendChild(forecastContainer);

const loader = document.createElement("p");
loader.id = "loader";
loader.innerText = `<div class="spinner"></div>`;
loader.style.display = "none";
document.querySelector(".container").appendChild(loader);

async function getdata(city) {
const apikey = 'd8193b6072a84f05a39141119251403';
   const promise = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`
);
    return await promise.json();
}

button.addEventListener("click",async()=>{
    const value = city.value.trim();
    if (!value) {
        cityname.innerText = "⚠️ Please enter a city name!";
        return;
    }
   loader.style.display = "block"
   forecastContainer.innerHTML = ""; 
    try {
        const res = await getdata(value);
        if (res.error) throw new Error(res.error.message);

        cityname.innerText = `${res.location.name}, ${res.location.region}, ${res.location.country}`;
        citytime.innerText = res.location.localtime;
        citytemp.innerText = `${res.current.temp_c} °C, ${res.current.condition.text}`;
        img.innerHTML = `<img src='${res.current.condition.icon}' alt='Weather Icon'>`;

       forecastContainer.innerHTML = "<h3>7-Day Forecast</h3>";
       res.forecast.forecastday.forEach(day => {
       const card = document.createElement("div");
       card.className = "forecast-card";
       card.innerHTML = `
        <p><strong>${day.date}</strong></p>
        <img src="${day.day.condition.icon}" alt="icon">
        <p>${day.day.avgtemp_c} °C</p>
        <p>${day.day.condition.text}</p>
      `;
      forecastContainer.appendChild(card);
    });
  }
    } catch (err) {
        cityname.innerText = `❌ ${err.message}`;
        citytime.innerText = "";
        citytemp.innerText = "";
        img.innerHTML = "";
    } finally {
    loader.style.display = "none";
  }
});
city.addEventListener("keypress", e => {
    if (e.key === "Enter") button.click();
});


(function toggleTheme(){
let darktheme = true;
const theme = document.getElementById("Theme");

if (localStorage.getItem("darktheme") === "true") {
    darktheme = true;
    document.body.style.setProperty('--bgc','#222');
    document.body.style.setProperty('--tc','#e0f3f2');
}
else{
    document.body.style.setProperty('--bgc','#e0f3f2');
    document.body.style.setProperty('--tc','#333');
}
theme.addEventListener("click",()=>{
    if(darktheme === true)
    {
        document.body.style.setProperty('--bgc','#e0f3f2');
        document.body.style.setProperty('--tc','#333');
        darktheme = false;
        localStorage.setItem("darktheme","false");
    }
    else
    {
        document.body.style.setProperty('--bgc','#222');
        document.body.style.setProperty('--tc','#e0f3f2');
        darktheme = true;
        localStorage.setItem("darktheme","true");
    }
});
})()
