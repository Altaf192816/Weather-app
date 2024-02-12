//Card Variable
const form = document.getElementById("form");
const temp = document.getElementById("temp");
const tempMax = document.getElementById("max_temp");
const tempMin = document.getElementById("min_temp");
const tempFeel = document.getElementById("feel_temp");
const windSpeed = document.getElementsByClassName("wind-speed"); 
const windDegree = document.getElementById("wind-deg");
const humidity = document.getElementById("humidity");
const sunrise = document.getElementById("sun-rise");
const sunset = document.getElementById("sun-set");
const cloudPct = document.getElementById("cloud-pct");
const currentDate = document.getElementById("date");
const cityHeading = document.getElementById("city");
const city = document.querySelector(".city");
//Table Variable
const cloudPctElArr = [...document.querySelectorAll(".cloud_pct")];
const feelsLikeElArr = [...document.querySelectorAll(".feels-like")];
const humidityElArr = [...document.querySelectorAll(".humidity")];
const maxTempElArr = [...document.querySelectorAll(".max-temp")];
const minTempElArr = [...document.querySelectorAll(".min-temp")];
const sunRiseElArr = [...document.querySelectorAll(".sun-rise")];
const sunSetElArr = [...document.querySelectorAll(".sun-set")];
const tempElArr = [...document.querySelectorAll(".temp")];
const windSpeedElArr = [...document.querySelectorAll(".wind-speed-table")];
const windDegreeElArr = [...document.querySelectorAll(".wind-degree-table")];
//Fetch Option
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "cb224e1b45msh081aabaaf19def7p174252jsn9b238512c4e9",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};
///////////////////////////////////////////////////////////////////

const getTime = function (timeData) {
  const hours =
    timeData.getHours() > 12 ? timeData.getHours() - 12 : timeData.getHours();
  const min = String(timeData.getMinutes()).padStart(2, 0);

  return `${String(hours).padStart(2, 0)}:${min}`;
};

const displayData = function (data) {
  //Temp info
  temp.textContent = `${data.temp} ℃`;
  tempMax.textContent = `${data.max_temp} ℃`;
  tempMin.textContent = `${data.min_temp} ℃`;
  tempFeel.textContent = `${data.feels_like} ℃`;
 //wind info
  [...windSpeed].forEach((el) => (el.textContent = `${data.wind_speed} Km/hr`));
  windDegree.textContent = `${data.wind_degrees}°`;
  humidity.textContent = `${data.humidity} %`;
//sun info
  const date = new Date(data.sunrise * 1000);
  const formatedDate = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
  currentDate.textContent = formatedDate;
  const sunriseTime = getTime(new Date(data.sunrise * 1000));
  const sunsetTime = getTime(new Date(data.sunset * 1000));
  sunrise.textContent = `${sunriseTime} AM`;
  sunset.textContent = `${sunsetTime} PM`;
  cloudPct.textContent = `${data.cloud_pct}`;
};

const correctAndValidCity = function (userinput) {
  if (!userinput) return;
  const capitalCityArr = userinput.toLowerCase().split("");
  const correctCity =
    capitalCityArr[0].toUpperCase() + capitalCityArr.slice(1).join("");
  return correctCity;
};

const AJAX = async function (city) {
  try {
    const reponse = await fetch(
      `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`,
      options
    );
    if (!reponse.ok) throw new Error(`Please enter the valid city`);
    const data = await reponse.json();
    return data;
  } catch (err) {
    throw err;
  }
};

//Card Logic
const fetchData = async function (e) {
  try {
    e.preventDefault();
    //Changing h1 if input is correct after incorrect input
    city.textContent = "Weather for ";
    cityHeading.textContent = `City`;
    //getting user input
    const userinput = correctAndValidCity(document.getElementById("input").value);
    //Getting data for user input
    const data = await AJAX(userinput);
   //displaying data for user input
    displayData(data);
     //changing heeading
    cityHeading.textContent = userinput;
  } catch (err) {
    cityHeading.textContent = `${err.message}`;
    city.textContent = "";
  }
};

form.addEventListener("submit", fetchData);

//Table Logic
const displayTableData = function (data) {
  const cloudPctArr = data.map((el) => el.cloud_pct);
  cloudPctElArr.forEach((el, i) => {
    el.textContent = `${cloudPctArr[i]}`;
  });

  const feelsLikeArr = data.map((el) => el.feels_like);
  feelsLikeElArr.forEach((el, i) => {
    el.textContent = `${feelsLikeArr[i]} ℃`;
  });

  const humidityArr = data.map((el) => el.humidity);
  humidityElArr.forEach((el, i) => {
    el.textContent = `${humidityArr[i]} %`;
  });

  const maxTempArr = data.map((el) => el.max_temp);
  maxTempElArr.forEach((el, i) => {
    el.textContent = `${maxTempArr[i]} ℃`;
  });

  const minTempArr = data.map((el) => el.min_temp);
  minTempElArr.forEach((el, i) => {
    el.textContent = `${minTempArr[i]} ℃`;
  });

  const sunRiseArr = data.map((el) => getTime(new Date(el.sunrise * 1000)));
  sunRiseElArr.forEach((el, i) => {
    el.textContent = `${sunRiseArr[i]} AM`;
  });

  const sunSetArr = data.map((el) => getTime(new Date(el.sunset * 1000)));
  sunSetElArr.forEach((el, i) => {
    el.textContent = `${sunSetArr[i]} PM`;
  });

  const tempArr = data.map((el) => el.temp);
  tempElArr.forEach((el, i) => {
    el.textContent = `${tempArr[i]} ℃`;
  });

  const windSpeedArr = data.map((el) => el.wind_speed);
  windSpeedElArr.forEach((el, i) => {
    el.textContent = `${windSpeedArr[i]} Km/hr`;
  });

 const windDegreeArr = data.map((el) => el.wind_degrees);
  windDegreeElArr.forEach((el, i) => {
    el.textContent = `${windDegreeArr[i]}°`;
  });
};

const tableCity = async function () {
  const data = await Promise.all([AJAX("Delhi"),AJAX("Mumbai"),AJAX("bangalore"),AJAX("kolkata")]);
  displayTableData(data);
};
tableCity();

