// create connection

var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

// connect to method that hub invokes aka recieves notifications from hub

connectionUserCount.on("updateTotalViews", (value) => {

    var newCountSpan = document.getElementById("totalViewsCounter");

    newCountSpan.innerText = value;

})

// invoke hub methods aka send notification to hub

function newWindowLoadedOnClient()
{
    connectionUserCount.send("NewWindowLoaded");
}

// start connection

function fulfilled()
{
    console.log("connection to user hub successfull");
    newWindowLoadedOnClient();
}
function rejected() { }

connectionUserCount.start().then(fulfilled,rejected);