// create connection

var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

// connect to method that hub invokes aka recieves notifications from hub

connectionUserCount.on("updateTotalViews", (value) => {

    var newCountSpan = document.getElementById("totalViewsCounter");

    newCountSpan.innerText = value;
})

connectionUserCount.on("updateTotalUsers", (value) => {

    var newCountSpan = document.getElementById("totalUsersCounter");

    newCountSpan.innerText = value;
})

// invoke hub methods aka send notification to hub

function newWindowLoadedOnClient()
{
    connectionUserCount.send("NewWindowLoaded");
}
function newUserConnectedOnClient() {
    connectionUserCount.send("OnConnectedAsync");
}
function newUserDisConnectedOnClient() {
    connectionUserCount.send("OnDisconnectedAsync");
}
// start connection

function fulfilled()
{
    console.log("connection to user hub successfull");
    newWindowLoadedOnClient();
    newUserConnectedOnClient();
    newUserDisConnectedOnClient();
}
function rejected() { }

connectionUserCount.start().then(fulfilled,rejected);