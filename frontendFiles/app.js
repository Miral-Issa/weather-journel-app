/* Global Variables */
const apiKey = "fd06286be25635d8593384e4fc66bd97&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


/*weather API*/
const getWeatherData = async (baseURL, apiKey, zipCode) => {
    const res = await fetch(baseURL+apiKey);
    try {
        const data = await res.json();
        
        return data;
      }  catch(error) {
        console.log("error", error);
      }
}

const postWeatherData = async (url = '', data={}) =>{
  const userFeelings = document.getElementById('feelings').value;
  const newEntry = {
    temperature: data.main.temp,
    date: d,
    userResponse:userFeelings 
  };

  const response = await fetch(url, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(newEntry), // body data type must match "Content-Type" header        
});

  try {
    const newData = await response.json();
    // console.log(newData);
    return newData
  }catch(error) {
  console.log("error", error);
  // appropriately handle the error
  }
};

const updateUI = async () => {
  const request = await fetch('http://localhost:8000/all');

  try{
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temperature;
    document.getElementById('content').innerHTML = allData.userResponse;

  }catch(error){
    console.log("error", error);
  }
}

const Button = document.getElementById('generate');
Button.addEventListener('click', () => {
  const zipCode = document.getElementById('zip').value;

  getWeatherData(baseURL, apiKey, zipCode)
  .then(function(data){
    postWeatherData('http://localhost:8000/addEntry', data)
  })
  .then(
    updateUI()
  );
});

