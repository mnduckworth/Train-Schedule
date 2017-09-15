
  var config = {
    apiKey: "AIzaSyB9vMaNO0xCxskSFUfkWvD6edwJi4iCKBg",
    authDomain: "train-schedule-b5bee.firebaseapp.com",
    databaseURL: "https://train-schedule-b5bee.firebaseio.com",
    projectId: "train-schedule-b5bee",
    storageBucket: "",
    messagingSenderId: "820010121295"
  };
  firebase.initializeApp(config);

	var dB = firebase.database();
		var trains = [];

		$("button").on("click",function(){

			if(!trains.includes($("#train-name-input").val())){
				var newTrain = {
					"trainName" : $("#train-name-input").val().trim(),
					"destination" : $("#destination-input").val().trim(),
					"frequency" : $("#frequency-input").val().trim(),
					"firstTrainTime" : $("#first-train-time-input").val().trim()
				};
				dB.ref().push(newTrain);
				trains.push($("#train-name-input").val());
			}
		})

		dB.ref().on("child_added",function(ChildSnapshot,prevChildKey){
			var firstTime = moment(ChildSnapshot.val().firstTrainTime, "HH:mm");
			var currentTime = moment().format("HH:mm");
			var timeDifference = Math.abs(moment().diff(moment(firstTime), "minutes"));
			var timeRemainder = timeDifference % ChildSnapshot.val().frequency;
			var minLeft = ChildSnapshot.val().frequency - timeRemainder;
			var nextTrain = moment().add(minLeft, "minutes").format("HH:mm");

			$("table").append("<tr><td>"+ChildSnapshot.val().trainName+"</td><td>"+ChildSnapshot.val().destination+"</td><td>"+ChildSnapshot.val().frequency+"</td><td>"+ChildSnapshot.val().firstTrainTime+"</td><td>"+timeDifference+"</td>");
		});