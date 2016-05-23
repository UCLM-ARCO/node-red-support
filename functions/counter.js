// name: counter
// outputs: 1
// it counts the number of messages that 
// arrives, and sets the property count on it

var counter = context.get("counter");
if (! counter)
    counter = 0;
    
counter++;
context.set("counter", counter);
msg.count = counter;
return msg;