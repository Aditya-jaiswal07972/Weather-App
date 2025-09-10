const button = document.getElementById("search-button")
const city = document.getElementById("search-input")
const cityname = document.getElementById("city-name")
const citytime = document.getElementById("city-time")
const citytemp = document.getElementById("city-temp")
const img = document.getElementById("img-icon")

async function getdata(city) {
const apikey = 'd8193b6072a84f05a39141119251403';
   const promise = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`
);
    return await promise.json();
}

button.addEventListener("click",async()=>{
    const value = city.value
    const res = await getdata(value);
    cityname.innerText = `${res.location.name}, ${res.location.region}, ${res.location.country}`;
    citytime.innerText = res.location.localtime;
    citytemp.innerText = `${res.current.temp_c} °C, ${res.current.condition.text}`;
    img.innerHTML = `
    <img src='${res.current.condition.icon}' alt='Weather Icon'>`;

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
