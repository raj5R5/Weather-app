let input_box=document.querySelector(".input-box");
let btn=document.querySelector(".search");

let cityObj=document.querySelector("#cityName");
let descObj=document.querySelector("#desc");
let tempObj=document.querySelector("#temp");
let humidityObj=document.querySelector("#humidity");
let windObj=document.querySelector("#wind");
let iconObj=document.querySelector("#icon")





async function apifetching(city_name) {
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=0b5604cf5bd14477518cfd0a884e494f&units=metric`;
    
    try{
        let res=await fetch(url);
        let data=await res.json();
        return data;
    }
    catch(e){
        return e;
    }
    
}

input_box.addEventListener("keypress",function(e){
    if(e.code === "Enter"){
        btn.click();
    }
})

btn.addEventListener("click",async function(e){
    
    if(input_box.value.trim() != "")
    {
        console.log(input_box.value);

        btn.disabled=true;
        iconObj.classList.add("fa-circle-notch");
        descObj.innerText="Loading...";
        let data = await apifetching(input_box.value);

        if(data.cod === 200){
            console.log(data);

            const temprature=data.main.temp;
            const humidity=data.main.humidity;
            const wind=data.wind.speed;
            const desc=data.weather[0].description;
            const name=data.name;

            iconObj.classList.remove("fa-face-frown");
            iconObj.classList.remove("fa-cloud-sun");
            iconObj.classList.remove("fa-circle-notch");

            iconObj.classList.add("fa-cloud-sun");
            descObj.innerText=desc;
            tempObj.innerHTML=`${temprature}<sup>o</sup>c`;
            cityObj.innerText=name;
            humidityObj.innerText=`${humidity}%`;
            windObj.innerText=`${wind}km/h`;


        }
        else{
            console.log(data.message);
            descObj.innerText=data.message;

            iconObj.classList.remove("fa-circle-notch");
            iconObj.classList.remove("fa-cloud-sun");

            iconObj.classList.add("fa-face-frown");

            tempObj.innerHTML=``;

            cityObj.innerText="-----";
            
            humidityObj.innerText="---";
            windObj.innerText="---";

        }
        
        input_box.style.border="1px solid white";

    }
    else
    {
        input_box.style.border="2px solid red";
    }
    btn.disabled=false;
    input_box.value="";
    input_box.focus();
})