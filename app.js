// vars and elements
const turn_on = document.querySelector("#turn_on");
const jarvis_intro = document.querySelector("#j_intro");
const time = document.querySelector("#time");
const machine = document.querySelector(".machine");
// const msgs = document.querySelector(".messages");
// whether the recognition is stopiing on my command or automatically
let stopingR = false;
// aira's commands
let airaComs = [];
airaComs.push("Who Are you");
airaComs.push("What is your name?");
airaComs.push("Who created you");


airaComs.push('=>');

airaComs.push("close this - to close opened popups");
airaComs.push("connection status - to know the connection status");
airaComs.push("current time - to know the time");
airaComs.push("what's the charge - to know battery charge");
airaComs.push(
  "change my information - information regarding your acoounts and you"
);

airaComs.push('=>');

airaComs.push("whats the weather or temperature");
airaComs.push("show the full weather report");
airaComs.push("are you there - to check Aira presence");
airaComs.push("shut down - stop voice recognition");
airaComs.push("open google");
airaComs.push('search for "your keywords" - to search on google ');
airaComs.push("open whatsapp");
airaComs.push("open youtube");
airaComs.push('play "song name" - to search on youtube ');
airaComs.push("open firebase");
airaComs.push("open netflix");
airaComs.push("open twitter");
airaComs.push("open ChatGpt");
airaComs.push("open my twitter profile");
airaComs.push("open instagram");
airaComs.push("open my instagram profile");
airaComs.push("open github");
airaComs.push("open my github profile");
airaComs.push("open LinkedIn");


// youtube window
let ytbWindow;

// show a warn to check for all the commands
console.warn('*to check for the commands speak "what are your commands"');
alert('To Know The Commands Speak => "what are your commands');

// date and time
let date = new Date();
let hrs = date.getHours();
let mins = date.getMinutes();
let secs = date.getSeconds();

// this is what aira tells about weather
let weatherStatement = "";
let charge,chargeStatus, connectivity, currentTime
chargeStatus = "unplugged"

window.onload = () => {
  turn_on.play();
  turn_on.addEventListener("ended", () => {
    setTimeout(() => {
      // autoJarvis();
      readOut("Ready to go sir");
      if (localStorage.getItem("jarvis_setup") === null) {
        readOut(
          "Sir, kindly fill out the form on your screen so that you could access most of my features and if you want to see my commands see a warning in the console"
        );
      }
    }, 200);
  });



  airaComs.forEach((e) => {
    document.querySelector(".commands").innerHTML += `<p>#${e}</p><br />`;
  });
  // battery
  let batteryPromise = navigator.getBattery();
  batteryPromise.then(batteryCallback);

  // internet connectivity

    if(navigator.onLine){
      document.querySelector("#internet").textContent = "online"
      connectivity = "online"
    } else {
      document.querySelector("#internet").textContent = "offline"
      connectivity = "offline"
    }

  setInterval(() => {
    if(navigator.onLine){
      document.querySelector("#internet").textContent = "online"
      connectivity = "online"
    } else {
      document.querySelector("#internet").textContent = "offline"
      connectivity = "offline"
    }
  }, 6000);

  function batteryCallback(batteryObject) {
    printBatteryStatus(batteryObject);
    setInterval(() => {
      printBatteryStatus(batteryObject);
    }, 5000);
  }
  function printBatteryStatus(batteryObject) {
    document.querySelector("#battery").textContent = `${
      (batteryObject.level * 100).toFixed(2)
    }%`;
    charge = batteryObject.level * 100
    if (batteryObject.charging === true) {
      document.querySelector(".battery").style.width = "200px";
      document.querySelector("#battery").textContent = `${
        (batteryObject.level * 100).toFixed(2)
      }% Charging`;
      chargeStatus = "plugged in"
    }
  }

  // timer
  setInterval(() => {
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    time.textContent = `${hrs} : ${mins} : ${secs}`;
  }, 1000);
};

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  currentTime = strTime
  time.textContent = strTime
}

formatAMPM(date)
setInterval(() => {
  formatAMPM(date)
}, 60000);

// auto aira

function autoJarvis() {
  setTimeout(() => {
    recognition.start();
  }, 1000);
}

// 
// start jarvis with btn
document.querySelector("#start_jarvis_btn").addEventListener("click", () => {
  recognition.start();
  document.querySelector("#start_jarvis_btn").style.visibility= "visible";
  // Create an audio element
// const audio = new Audio();

// audio.src = 'power up.mp3'; 
// audio.play();

readOut("Now Im Ready to go");
})


document.querySelector("#stop_jarvis_btn").addEventListener("click", () => {
  stopingR = true;
  recognition.stop();
  readOut("ok sir I will take a nap");
})

// show waether
function weather(location) {
  const weatherCont = document.querySelector(".temp").querySelectorAll("*");

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      weatherCont[0].textContent = `Location : ${data.name}`;
      weatherCont[1].textContent = `Country : ${data.sys.country}`;
      weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
      weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
      weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherCont[5].textContent = `Original Temperature : ${ktc(
        data.main.temp
      )}`;
      weatherCont[6].textContent = `feels like ${ktc(data.main.feels_like)}`;
      weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
      weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
      weatherStatement = `sir the weather in ${data.name} is ${
        data.weather[0].description
      } and the temperature feels like ${ktc(data.main.feels_like)}`;
    } else {
      weatherCont[0].textContent = "Weather Info Not Found";
    }
  };

  xhr.send();
}

// convert kelvin to celcius
function ktc(k) {
  k = k - 273.15;
  return k.toFixed(2);
}

if (localStorage.getItem("jarvis_setup") !== null) {
  weather(JSON.parse(localStorage.getItem("jarvis_setup")).location);
}

// aira information setup

const setup = document.querySelector(".jarvis_setup");
setup.style.display = "none";
if (localStorage.getItem("jarvis_setup") === null) {
  setup.style.display = "flex";
  setup.querySelector("button").addEventListener("click", userInfo);
}

function userInfo() {
  let setupInfo = {
    name: setup.querySelectorAll("input")[0].value,
    bio: setup.querySelectorAll("input")[1].value,
    location: setup.querySelectorAll("input")[2].value,
    instagram: setup.querySelectorAll("input")[3].value,
    twitter: setup.querySelectorAll("input")[4].value,
    github: setup.querySelectorAll("input")[5].value,
  };

  let testArr = [];

  setup.querySelectorAll("input").forEach((e) => {
    testArr.push(e.value);
  });

  if (testArr.includes("")) {
    readOut("sir enter your complete information");
  } else {
    localStorage.clear();
    localStorage.setItem("jarvis_setup", JSON.stringify(setupInfo));
    setup.style.display = "none";
    weather(JSON.parse(localStorage.getItem("jarvis_setup")).location);
  }
}

// speech recognition

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;

var synth = window.speechSynthesis;
// const speech = new SpeechSynthesisUtterance();

recognition.onstart = function () {
  console.log("voice recognition activated");
  document.querySelector("#stop_jarvis_btn").style.display = "flex"
};

// arr of window
let windowsB = []

recognition.onresult = function (event) {
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript;
  transcript = transcript.toLowerCase();
  console.log(transcript);
  let userData = localStorage.getItem("jarvis_setup");

  // commands

  //response
  if (transcript.includes('good') || transcript.includes('nice') || transcript.includes('excellent') || transcript.includes('amazing')) {
    readOut("Thank You Sir");
  }

else if (transcript.includes('greet them')) {
    readOut(`Hello Everyone, Good Morining ,  Respected H O D of Computer Science,  Mr. Sanjay Gupta Sir , and Respected Teacher , Sandeep Sir, Swapnshree Mam, Mohani Mam, Good Morning all of you`);
  }
 

  
  // some casual commands
  else if (transcript.includes("what's the current charge")) {
    readOut(`the current charge is ${charge}`);
  }
  else if (transcript.includes("what's the charging status")) {
    readOut(`the current charging status is ${chargeStatus}`);
  }
  else if (transcript.includes("current time")) {
    readOut(currentTime);
  }
  else if (transcript.includes("connection status")) {
    readOut(`you are ${connectivity} sir`);
  }
  // jarvis commands
  else if (transcript.includes("what are your commands")) {
    readOut("sir here's the list of commands i can follow");
    if(window.innerWidth <= 400 ){
      window.resizeTo(screen.width,screen.height)
    }
    document.querySelector(".commands").style.display = "block";
  }

  //jarvis Name
  else if(transcript.includes('what is your name') ){
    readOut("sir, My name is Aira,")
  }
  else if(transcript.includes( 'who created you')){
    readOut("My Owner is Prince Soni , Abhishek Gupta, Abhishek Kumar Gupta, Keshav Singh ")
  }
  // jarvis bio
  else if (transcript.includes('who are you') || transcript.includes('introduce yourself')) {
    readOut("sir, i am a jarvis, a voice asistant made for browsers using javascript by one of the Enthusiastic dev. I can do anything which can be done from a browser.");
  }

  // close popups
  else if (transcript.includes("close this")) {
    readOut("closing the tab sir");
    document.querySelector(".commands").style.display = "none";
    if(window.innerWidth >= 401 ){
      window.resizeTo(250,250)
    }
    setup.style.display = "none";
  }

  // info change
  else if (transcript.includes("change my information")) {
    readOut("Opening the information tab sir");
    localStorage.clear();
    
    if(window.innerWidth <= 400 ){
      window.resizeTo(screen.width,screen.height)
    }
    setup.style.display = "flex";
    setup.querySelector("button").addEventListener("click", userInfo);
  }

  // ChatGpt

  else if(transcript.includes("open chatgpt")){
    readOut('opening Chatgpt');
    let a = window.open("https://chat.openai.com/");
  windowsB.push(a)
  }


  
  // weather report
  else if (
    transcript.includes("what's the temperature")
  ) {
    readOut(weatherStatement);
  }

   else if (transcript.includes("full weather report")) {
    readOut("opening the weather report sir");
    let a = window.open(
      `https://www.google.com/search?q=weather+in+${
        JSON.parse(localStorage.getItem("jarvis_setup")).location
      }`
    );
    windowsB.push(a)
  }
  // availability check
   else if (transcript.includes("are you there") || transcript.includes("excuse me?")) {
    readOut("yes sir");
  }
  // close voice recognition
  else if (transcript.includes("shut down")) {
    readOut("Ok sir i will take a nap");
    stopingR = true;
    recognition.stop();
  }

// whatsapp
  else if (transcript.includes("open whatsapp")) {
    readOut("opening whatsapp");
    let a = window.open("https://web.whatsapp.com/");
    windowsB.push(a)
  }
// netlify
   else if (transcript.includes("open netflix")) {
    readOut("opening netflix");
    let a = window.open("https://www.netflix.com/");
    windowsB.push(a)
  }
// spotify
else   if (transcript.includes("open spotify")) {
    readOut("opening spotify");
    let a = window.open("https://open.spotify.com/");
    windowsB.push(a)
  }


  // firebase

  else if (transcript.includes("open fire base") && transcript.includes("account")) {
    readOut("opening firebase console");
    let accId = transcript;
    accId = accId.split("");
    accId.pop();
    accId = accId[accId.length - 1];
    console.log(`accId: ${accId}`);
    // https://console.firebase.google.com/u/0/
    let a = window.open(`https://console.firebase.google.com/u/${accId}/`);
    windowsB.push(a)
  }

  // canva

  else if (transcript.includes("open my canva designs")) {
    readOut("opening canva designs");
    window.open("https://www.canva.com/folder/all-designs");
  }

  // Calculator

   else if(transcript.includes('open calculator')) {
    window.open('Calculator:///')
    const finalText = "Opening Calculator";
    readOut(finalText);
}


  // userdata access commands

   else if (transcript.includes("what's my name")) {
    readOut(`Sir, I know that you are ${JSON.parse(userData).name}`);
  }
  else if (transcript.includes("what's my bio")) {
    readOut(`Sir, I know that you are ${JSON.parse(userData).bio}`);
  }

  // google

  else if (transcript.includes("open google")) {
    readOut("opening google");
    let a = window.open("https://www.google.com/");
    windowsB.push(a)
  }

  if (transcript.includes("search for")) {
    readOut("here's your result");
    let input = transcript.split("");
    input.splice(0, 11);
    input.pop();
    input = input.join("").split(" ").join("+");
    let a = window.open(`https://www.google.com/search?q=${input}`);
    windowsB.push(a)
  }

  // youtube
  else if (transcript.includes("open youtube")) {
    readOut("opening youtube sir");
    let a = window.open("https://www.youtube.com/");
    windowsB.push(a)
  }

  else if (transcript.includes("play")) {
    let playStr = transcript.split("");
    playStr.splice(0, 5);
    let videoName = playStr.join("");
    playStr = playStr.join("").split(" ").join("+");
    readOut(`searching youtube for ${videoName}`);
    let a = window.open(`https://www.youtube.com/search?q=${playStr}`
    );
    windowsB.push(a)
  }


  // instagram
  else if (transcript.includes("open instagram")) {
    readOut("opening instagram sir");
    let a =window.open("https://www.instagram.com");
    windowsB.push(a)
  }
  else if (transcript.includes("open my instagram profile")) {
    if (JSON.parse(userData).instagram) {
      readOut("opening your instagram profile");
      let a =window.open(
        `https://www.instagram.com/${JSON.parse(userData).instagram}/`
      );
      windowsB.push(a)
    } else {
      readOut("sir i didn't found your instagram information");
    }
  }
  // twitter
  else if (transcript.includes("open my twitter profile")) {
    readOut("opening your twitter profile");
    let a=window.open(`https://twitter.com/${JSON.parse(userData).twitter}`);
    windowsB.push(a)
  }
 else if (transcript.includes("open twitter")) {
    readOut("opening twitter sir");
    let a = window.open(`https://twitter.com/`);
    windowsB.push(a)
  }

  // github
  else if (transcript.includes("open my github profile")) {
    readOut("opening your github profile");
    let a = window.open(`https://github.com/${JSON.parse(userData).github}`);
    windowsB.push(a)
  }
   else if (transcript.includes("open github")) {
    readOut("opening github");
    let a = window.open("https://github.com/");
    windowsB.push(a)
  }
  // calendar
  else if (transcript.includes("open calendar")) {
    readOut("opening calendar");
    let a = window.open("https://calendar.google.com/");
    windowsB.push(a)
  }
  
  //LinkedIn

  else if (transcript.includes("open linkedin")) {
    readOut("opening linkedin");
    let a = window.open("https://www.linkedin.com/");
    windowsB.push(a)
  }

  // close all opened tabs
   else if (transcript.includes("close all tabs")) {
    readOut("closing all tabs sir")
    windowsB.forEach((e) => {
      e.close();
    })  
  

  
  }
//   else {
//     window.open(`https://www.google.com/search?q=${transcript.replace(" ", "+")}`, "_blank");
//     const finalText = "I found some information for " + transcript + " on google";
//     readOut(finalText);
// }
}




recognition.onend = function () {
  if (stopingR === false) {
    setTimeout(() => {
      recognition.start();
    }, 500);
  } else if (stopingR === true) {
    recognition.stop();
    document.querySelector("#stop_jarvis_btn").style.display = "none"
  }
};

// speak out


function readOut(message) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = message;
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
  console.log("Speaking out");
}

function readOutLang(message,lang) {
  const speech = new SpeechSynthesisUtterance();
  speech.lang = lang
  let voices = speechSynthesis.getVoices()
  let z;
  voices.forEach((v) => {
    if(v.lang.includes(lang)){
      z = v
    }
  })
  speech.voice = z
  speech.text = message;
  speech.volume = 1;
  console.log(message);
  window.speechSynthesis.speak(speech);
  console.log("Speaking out - translated");
}



// small jarvis
const smallJarvis = document.querySelector("#small_jarvis")

smallJarvis.addEventListener("click", () => {
  window.open(`${window.location.href}`,"newWindow","menubar=true,location=true,resizable=false,scrollbars=false,width=400,height=400,top=0,left=0")
  window.close()
})



document.querySelector("#jarvis_start").addEventListener("click", () => {
  recognition.start()
})

// calendar

const lang = navigator.language;

let datex = new Date();
let dayNumber 	= date.getDate();
let monthx 		= date.getMonth();

let dayName 	= date.toLocaleString(lang, {weekday: 'long'});
let monthName 	= date.toLocaleString(lang, {month: 'long'});
let year 		= date.getFullYear();

document.querySelector("#month").innerHTML = monthName
document.querySelector("#day").innerHTML = dayName
document.querySelector("#date").innerHTML = dayNumber
document.querySelector("#year").innerHTML = year

document.querySelector(".calendar").addEventListener("click", () => {
  window.open("https://calendar.google.com/")
})



