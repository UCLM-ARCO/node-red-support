// name: interval
// outputs: 1
// Send last received message at a specific interval. 
// Accepts two configuration messages:
// - topic: timeout, payload: T in ms
// - topic: enable, payload: 'true' or 'false'

function start_timer() {
    node.status({fill: "green", shape: "ring", text: "running"});
    var timeout = context.get("timeout");

    if (! timeout) {
        timeout = 500;
        node.warn("timeout not set, using default (" + timeout + " ms)");
    }
    
    var t = setInterval(function() {
        node.send(context.get("message"));
    }, timeout);
    context.set("timer", t);
}

function stop_timer() {
    node.status({fill: "red", shape: "ring", text: "stopped"});
    var t = context.get("timer");
    if (t)
        clearInterval(t);
}

function restart_timer() {
    stop_timer();
    start_timer();
}

// -----------------------------------------------------------

if (msg.topic == "timeout") {
    var timeout = parseInt(msg.payload);
    context.set("timeout", timeout);
}
else if (msg.topic == "enable") {
    if (msg.payload)
        restart_timer();
    else
        stop_timer();
}
else {
    context.set("message", msg);
    node.log("got message to send: " + msg.payload);
}
