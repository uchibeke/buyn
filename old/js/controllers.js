var mainControllers = angular.module('mainControllers', ['ngStorage', 'ngSanitize', "firebase"]);

mainControllers.controller('MainController', ['$rootScope', '$scope', '$http', '$localStorage', '$timeout', '$interval', '$sce', 'analytics', '$firebaseObject', '$firebaseArray', '$firebaseAuth',
function($rootScope, $scope, $http, $localStorage, $timeout, $interval, $sce, analytics, $firebaseObject, $firebaseArray, $firebaseAuth) {
	$scope.guests = [];

	$scope.guestOrder = 'name';
	$scope.guestSearch = '';
	$scope.instruction = 'Please, start typing';

	$scope.dataField = '';
	$scope.listBtnText = 'Add';
	$scope.$storage = $localStorage.$default({
		guestsList : $scope.guests
	});

	$scope.hide_logo = false;

	$scope.$storage.x = '';

	// List of all user events
	$scope.visualize = function() {
		var showGuest = true;
		if ($scope.guestSearch.length > 0) {
			showGuest = false;
		}
		return showGuest;
	};

	$scope.clearField = function(field) {
		field = '';
	};

	$scope.$storage.xx = "";

	$scope.$storage.options = {
	};
	$scope.$storage.options.hideCheckin = [];

	$scope.deleteStored = function() {
		if (!(angular.equals($scope.$storage.guestsList, $scope.guests))) {
			$scope.$storage.backUpGuestList = [];
			$scope.$storage.backUpGuestList = $scope.$storage.guestsList;
			$scope.$storage.guestsList = [];
			$scope.$storage.guestsList = $scope.guests;
		}
	};

	$scope.dateString = function() {
		var d = new Date();
		return d.getFullYear() + "" + ('0' + (d.getMonth() + 1)).slice(-2) + "" + ('0' + d.getDate()).slice(-2);
	};

	$scope.backUpTxt = function() {
		if ($scope.backUp) {
			return 'Hide Backup list';
			;
		} else {
			return 'View Backup list';
		}
	};

	$scope.backUp = false;
	$scope.backUpBtn = function() {
		$scope.backUp = !$scope.backUp;
	};

	function stringGen(len) {
		var text = "";
		var charset = "abcdefghijklmnopqrstuvwxyz";
		for (var i = 0; i < len; i++)
			text += charset.charAt(Math.floor(Math.random() * charset.length));
		return text;
	}


	$scope.setEvent = function(eventName) {
		$scope.$storage.eventName = eventName;
		guestRef = firebase.database().ref().child("/users/" + firebase.auth().currentUser.uid + "/" + $scope.$storage.eventName + "/guests");
		$scope.$storage.guestsList = $firebaseArray(guestRef);

	};

	var user,
	    allRef,
	    ref,
	    guestRef;
	if (firebase.auth().currentUser) {
		user = firebase.auth().currentUser;
		allRef = firebase.database().ref().child("/users/" + user.uid + "/");
		$scope.$storage.allEvents = $firebaseArray(allRef);

		ref = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/");
		$scope.$storage.currentEvent = $firebaseArray(ref);

		guestRef = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/guests");
		$scope.$storage.guestsList = $firebaseArray(guestRef);

	}

	function ticketOp() {
		if ($scope.$storage.totalTickets.length <= 0) {
			alert("You must enter the number of tickets to generate");
		} else {
			var numbDigits = 4;
			var obj = [];
			for (var i = 0; i < $scope.$storage.totalTickets; i++) {
				var element = {};
				var firstNum = "";
				while (firstNum.length > numbDigits || firstNum.length < numbDigits) {
					firstNum = parseInt(Math.random().toString().slice(2, numbDigits + 2));
				}
				element.ticketNumber = (stringGen(3) + "" + firstNum + stringGen(3)).toUpperCase();
				element.guestStatus = false;
				obj.push(element);
			}
			$scope.$storage.guestsList = Object.assign([], obj);
			guestRef = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/guests");
			guestRef.set($scope.$storage.guestsList);
			ref = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/");
			ref.child("/eventName/").set($scope.$storage.eventName);
			$scope.$storage.totalTickets = '';
		}
	};

	$scope.loading = [];

	$scope.generateTicketNums = function() {
		$scope.loading.generatingTicket = true;
		$('#test').html($scope.loading.generatingTicket);
		try {
			ticketOp();
		} catch(err) {
			// message.innerHTML = "Error: " + err + ".";
		} finally {
			$scope.loading.generatingTicket = false;
		}
	};

	$scope.deleteEvent = function(eventName) {
		ref = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "");
		var list = $firebaseArray(ref);
		var item = list[eventName];
		var obj = $firebaseObject(ref);
		obj.$remove().then(function(ref) {
		}, function(error) {
			console.log("Error:", error);
		});
	};

	$interval(function() {
		var theTime = new Date().toLocaleTimeString();
		$('#txt').html(theTime);
	}, 1000);

	// Paste from excel file
	$scope.addPastedExcel = function() {
		var rows = $scope.dataFieldExcel.split('\n');
		var obj = [];
		cart = [];
		for (var i = 0; i < rows.length; i++) {
			var arr = rows[i].split('\t');
			function a() {
				var wholeRow = "";
				var element = {};
				for (var i = 0; i < arr.length; i++) {
					wholeRow = wholeRow + arr[i] + "     ";
					element[i] = arr[i];
				}
				element.guestStatus = false;
				cart.push(element);
				return wholeRow;
			}


			obj.push(a());
		}
		$scope.testObj = cart;
		$scope.$storage.guestsList = Object.assign([], $scope.testObj);
		guestRef.set($scope.$storage.guestsList);
		ref.child("/eventName/").set($scope.$storage.eventName);
		$scope.$storage.showExcelList = true;
	};

}]);
