// basic functionalities
var client;

var btnPublish = $("#btn-publish")

$('#btn-connect').on('click', function () {
  // connect
  console.log("connect button clicked..")
  client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt")
  $("#status").text("Connecting to wss://test.mosquitto.org:8081/mqtt....")
  $("#status").css("color", "green")
  $("#status").css("font-style", "italic")
  client.on("connect", function () {
    console.log("succ")
    $("#status").text("Succesfully Connected!")
    $("#status").css("color", "green")
    $("#status").css("font-style", "italic")
    
  });

  $(".btn-disconnect").click(function () {
    client.end();
    $("#status1").text("You Are Not Connected!")
    $("#status1").css("color", "red")
  })

  
  $("#btn-publish").click(function () {
    var topic = $("#topic").val();
    var message = $("#payload").val();
    if (topic == "" || message == "") {
      Swal.fire({
        type: 'error',
        title: 'All Input is Required',
      })
    } else {
      console.log("Published Topic: "+topic+ " Message: " + message)
      client.publish(topic, message);
      Swal.fire({
        type: 'success',
        title: 'Publish Successfully!',
      })
    }
  })

  $("#btn-subscibe").click(function () {
    var topicsub = $("#topic-subscribe").val();
    if (topicsub == "") {
      Swal.fire({
        type: 'error',
        title: 'Topic is Required',
      })
    } else {
      console.log("Subcribed Topic: "+ topicsub)
      client.subscribe(topicsub);
      Swal.fire({
        type: 'success',
        title: 'Subscribe Successfully',
      })
    }
  })
  $("#btn-unsubscribe").click(function () {
    var topicsub = $("#topic-subscribe").val();
    if (topicsub == "") {
      Swal.fire({
        type: 'error',
        title: 'Topic is Required',
      })
    } else {
      client.unsubscribe(topicsub);
      Swal.fire({
        type: 'success',
        title: 'Unsubscribe Successfully',
      })
    }
    $("#btn-unsubscribe").removeClass("alert-success")
    $("#btn-unsubscribe").addClass("alert-secondary")
  })
  client.on("message", function (topic, payload) {
    console.log("Recieved Topic: "+topic+"Payload: "+payload)
    var row = $("<tr>")
    $("<td>" ).text(topic).appendTo($(row))
    $("<td>").text(payload).appendTo($(row))
    $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row))
    $("tbody").append($(row))
    
  })
})
// // advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })
