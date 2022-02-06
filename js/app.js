const alert = document.querySelector('#alert');
const dropdownList = document.querySelector('.dropdown-list');
const dropdown1 = document.querySelector('#dropdown-item1');
const dropdown2 = document.querySelector('#dropdown-item2');
const header = document.querySelector('.header-container');
const trafficHeader = document.querySelector('.traffic-header');
const trafficNavLink = document.querySelectorAll('.traffic-nav-link');
const trafficCanvas = document.querySelector('#traffic-chart');
const dailyTrafficCanvas = document.querySelector('#daily-traffic-chart');
const mobileCanvas = document.querySelector('#mobile-chart');
const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");
const sendEmail = document.querySelector('#send-email');
const public = document.querySelector('#public');
const timezone = document.querySelector('#timezone');
const save = document.querySelector('#save');
const cancel = document.querySelector('#cancel');

const trafficData = {
    hourly: {
        labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00",
        "07:00", "08:00", "09:00", "10:00"],
        datasets: [{
            data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
                2500],
            backgroundColor: 'rgba(116, 119, 191, .3)',
            borderWidth: 1,
        }]    
    },
    daily: {
        labels: ["12/21", "12/22", "12/23", "12/24", "12/25", "12/26", "12/27",
        "12/28", "12/29", "12/30", "12/31"],
        datasets: [{
            data: [24000, 25000, 26500, 26750, 26000, 23000, 25500, 26500, 27000, 28000,
                29000],
            backgroundColor: 'rgba(116, 119, 191, .3)',
            borderWidth: 1,
        }]    
    },
    weekly: {
        labels: ["w/e 10/24", "w/e 10/31", "w/e 11/7", "w/e 11/14", "w/e 11/21", "w/e 11/28", "w/e 12/5",
        "w/e 12/12", "w/e 12/19", "w/e 12/26", "w/e 1/2"],
        datasets: [{
            data: [142000, 155000, 162000, 159000, 167000, 175000, 185000, 191000, 187000, 190000,
                136000],
            backgroundColor: 'rgba(116, 119, 191, .3)',
            borderWidth: 1,
        }]    
    },
    monthly: {
        labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"],
        datasets: [{
            data: [350000, 390000, 420000, 465000, 480000, 550000, 590000, 620000, 675000, 714000,
                750000],
            backgroundColor: 'rgba(116, 119, 191, .3)',
            borderWidth: 1,
        }]    
    },
};

const trafficOptions = {
    backgroundColor: 'rgba(112, 104, 201, .5)',
    fill: true, 
    aspectRatio: 2.5,
    animation: {
        duration: 0,
    },
    scales: {
        y: {
            beginAtZero: true
        },
    },
    plugins: {
        legend: {
            display: false,
        },
    },
};

let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: trafficData.hourly,
    options: trafficOptions,
});

const dailyTrafficData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
        label: '# of Hits',
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: '#7477BF',
        borderWidth: 1
    }],
};

const dailyOptions = {
    scales: {
        y: {
            beginAtZero: true
    } },
      plugins: {
          legend: {
          display: false
        }
    }
};

const dailyTrafficChart = new Chart(dailyTrafficCanvas, {
    type: 'bar',
    data: dailyTrafficData,
    options: dailyOptions,
})

const mobileData = {
    labels: ["Desktop", "Tablet", "Phones"],
  datasets: [{
    label: '# of Users',
    data: [2000, 550, 500],
    borderWidth: 0,
    backgroundColor: [
      '#7477BF',
      '#78CF82',
      '#51B6C8'
    ] 
  }]
};

const mobileOptions = {
    aspectRatio: 1.9,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 20,
        fontStyle: 'bold'
      }
    } 
  }
};

const mobileChart = new Chart(mobileCanvas, {
    type: 'doughnut',
    data: mobileData,
    options: mobileOptions,
})

function timeScale(chart, period) {
    chart.data = trafficData[period];
    chart.update();
};

alert.innerHTML = `<div class="alert-banner">
                    <p><strong>Alert:</strong> You have <strong>6</strong> unread messages.</p>
                    <p class="alert-banner-close">x</p>
                   </div>`

// Event listener for Alert
alert.addEventListener('click', (e) => {
    const close = e.target;
    if (close.classList.contains('alert-banner-close')){
        alert.style.display = 'none';
    }
})

// Event listener for Bell Icon
header.addEventListener('click', (e) => {
    const close = e.target;
    if (close.classList.contains('notification-link')){
        dropdownList.style.display = 'block';
    }
})

// Event listener for Notification 1
dropdown1.addEventListener('click', (e) => {
    const close = e.target;
    if (close.classList.contains('notification-close')){
        dropdown1.style.display = 'none';
    }
})

// Event listener for Notification 2
dropdown2.addEventListener('click', (e) => {
    const close = e.target;
    if (close.classList.contains('notification-close')){
        dropdown2.style.display = 'none';
    }
})

//Event listener for Line Chart
trafficHeader.addEventListener('click', (e) => {
    const target = e.target;
    const timescale = target.textContent.toLowerCase();
    if (target.classList.contains('traffic-nav-link')){
        for(let i = 0; i < 4; i++) {
            trafficNavLink[i].classList.remove('active');
        }
        target.classList.add('active');
        timeScale(trafficChart, timescale);
    }
})

//Event listener for Message Send
send.addEventListener('click', (e) => {
    if (user.value === "" && message.value === "") {
        window.alert('Please fill in both the user and message fields before sending');
    } else if (user.value === "") {
        window.alert('Please fill out the user field');
    } else if (message.value === "") {
        window.alert('Please fill out the message field');
    } else {
        window.alert(`Message sent to ${user.value}!`);
    }
})

//  Variables for local storage
let sendEmailNotification;
let profileToPublic;
let selectTimezone;

function retrieveSettings() {
    sendEmailNotification = JSON.parse(localStorage.getItem('sendEmailNotification'));
    profileToPublic = JSON.parse(localStorage.getItem('profileToPublic'));
    selectTimezone = localStorage.getItem('selectTimezone');
}

function enactSettings() {
    if (sendEmailNotification)  {
        sendEmail.checked = true;
     } else {
        sendEmail.checked = false;
     }
  
     if (profileToPublic) {
        public.checked = true;
     } else {
        public.checked = false;
     }
  
     if (selectTimezone != null && selectTimezone !== "none") {
        timezone.value = selectTimezone; 
     } else {
        timezone.value = "none";
     }
}

// Event Listener for Save Settings
save.addEventListener('click', (e)=> {
    if (sendEmail.checked) {
        localStorage.setItem('sendEmailNotification', 'true');
     } else {
        localStorage.setItem('sendEmailNotification', 'false');
     }
     if (public.checked) {
        localStorage.setItem('profileToPublic', 'true');
     }  else {
        localStorage.setItem('profileToPublic', 'false');
     }
     if (timezone.value !== "none") {
        localStorage.setItem('selectTimezone', timezone.value);
     } 

     e.preventDefault();
})

// Event Listener for Settings Cancel
cancel.addEventListener('click', (e)=> {
    localStorage.clear();
   sendEmail.checked = false;
   public.checked = false;
   timezone.value = "none"; 
   e.preventDefault();
})

retrieveSettings();
enactSettings();