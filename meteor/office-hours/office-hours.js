if (Meteor.isClient) {

	// Static configuration type things
	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_ONLY'
	});
	
	//Startup Function
	Meteor.startup(function() {
		console.log("entered startup");
		Session.set("page", "login");
		
		var fragment = Meteor.render(function () {
			console.log("rendering template fragment");
			var currentpage = Session.get("page");
			if (currentpage == "login") {
				console.log("currentpage: " + currentpage);
				return Template.login();
			}
			if (currentpage == "pick") {
				console.log("currentpage: " + currentpage);
				return Template.pick();
			}
			if (currentpage == "place") {
				console.log("currentpage: " + currentpage);
				return Template.place();
			}
		});
		
		console.log("appending child- " + fragment);
		document.body.appendChild(fragment);
		
		Session.set("page", "login");
	});
	
	// Helper functions
	function notloggedin() {
		document.body.appendChild(Template.notloggedin());
	}
	
	
	// Event handling
	Template.navlogin.events({
		'click' : function () {
			document.getElementById(Session.get("page")+"li").className = "";
			document.getElementById("loginli").className = "active";
			Session.set("page", "login");
		}
	});
	
	Template.navplace.events({
		'click' : function () {
			if (Meteor.user() == null){
				notloggedin();
				return;
			}
			document.getElementById(Session.get("page")+"li").className = "";
			document.getElementById("placeli").className = "active";
			Session.set("page", "place");
		}
	});
	
	Template.navpick.events({
		'click' : function () {
			if (Meteor.user() == null){
				notloggedin();
				return;
			}
			document.getElementById(Session.get("page")+"li").className = "";
			document.getElementById("pickli").className = "active";
			Session.set("page", "pick");
		}
	});
	
	
//Below this line autogen'ed with meteor
//TODO take out eventually
  Template.hello.greeting = function () {
    return "Welcome to inventory-picker.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
