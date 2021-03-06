var loginControllers = angular.module('loginControllers', ['ngStorage', 'ngSanitize', "firebase"]);

loginControllers.controller('LoginController', ['$rootScope', '$scope', '$http', '$localStorage', '$timeout', '$interval', '$sce', 'analytics', '$firebaseObject', '$firebaseArray', '$firebaseAuth', '$location',
function($rootScope, $scope, $http, $localStorage, $timeout, $interval, $sce, analytics, $firebaseObject, $firebaseArray, $firebaseAuth, $location) {

	$scope.$storage = $localStorage.$default({
		guestsList : $scope.guests
	});

	var user,
	    allRef,
	    ref,
	    guestRef;
	// Accepts twiter, facebook or google
	$scope.login = function(loginMethod) {

		var auth = $firebaseAuth();

		auth.$signInWithPopup(loginMethod).then(function(firebaseUser) {
			if (firebase.auth().currentUser) {
				$rootScope.$storage.user = firebaseUser;
				$rootScope.$storage.user.token = firebaseUser.credential.accessToken;
				user = firebaseUser.user;
				$rootScope.$storage.user.signInUser = user;
				allRef = firebase.database().ref().child("/users/" + user.uid + "/");
				$scope.$storage.allEvents = $firebaseArray(allRef);

				ref = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/");
				$scope.$storage.currentEvent = $firebaseArray(ref);

				guestRef = firebase.database().ref().child("/users/" + user.uid + "/" + $scope.$storage.eventName + "/guests");
				$scope.$storage.guestsList = $firebaseArray(guestRef);
				$location.path('/home')
				location.reload();
			} else {
				event.preventDefault();
				$location.path('/login');
			}
		}).catch(function(error) {
			console.log("Authentication failed:", error);
		});
	};

	// Opera 8.0+
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';
	// At least Safari 3+: "[object HTMLElementConstructor]"
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	// Chrome 1+
	var isChrome = !!window.chrome && !!window.chrome.webstore;
	// Blink engine detection
	var isBlink = (isChrome || isOpera) && !!window.CSS;

	$scope.logOut = function() {
		var auth = $firebaseAuth();
		firebase.auth().signOut().then(function(result) {
			// Sign-out successful.
			if (isChrome) {
				delete $localStorage.user;
			} else {
				$localStorage.$reset($scope.$storage.user);
			}

		}, function(error) {
			console.log(error);
		});
		if ($location.path('/login')) {
			location.reload();
		}
	};

	$scope.evewhyteBenefits = ["Manage Unlimited Events", "Design Tickets for each event", "Generate unique and imitation-proof tickets", "Speed up check-in process", "Check-in guests from multiple devices", "Run Events from multiple locations simulteneously", "View and manage guestlist on-the-go", "Get event summary and plan for future events", "Measure cost, benefits and impact of your event"];
}]); 