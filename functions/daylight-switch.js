// name: daylight switch
// outputs: 1
if (msg.topic == "threshold") {
    context.set("threshold", parseInt(msg.payload));
    return;
}

var threshold = context.get("threshold") || 50;
msg.payload = msg.payload < threshold;

// logic is inverted on theese objects
msg.payload = !msg.payload;

return msg;