if (Meteor.isClient) {
	// TODO implement a changing color based on the age of the last update
	
	
	// Static configuration type things
	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_ONLY'
	});
	
	//Startup Function
	Meteor.startup(function() {
		console.log("entered startup");
		Session.set("loc", "My Office");
		Session.set("age", "success");
		Session.set("option",2);
	});
	
	/*
	Deps.autorun(function () {
		if (Meteor.user() == "repeet13" || Meteor.user() == "RePeet13") {
			document.getElementById("location").setAttribute("class", "btn-large btn-"+Session.get("age"));
		} else {
			document.getElementById("location").setAttribute("class", "label label-"+Session.get("age"));
		}
	});
	*/
	
	Meteor.render(function () {
		var option = Session.get("option");
			switch(option) {
				case 0:
					//case where you display whatever the db says
					break;
				case 1:
					return Template.status({area: "Baird Lab"});
				default:
					return Template.status({area: "My Office (Klaus)"});
			}
	})
	
	/*
	Deps.autorun(function () {
		var option = Session.get("option");
		switch(option) {
			case 0:
				//case where you display whatever the db says
				break;
			case 1:
				document.getElementById("location").innerHTML = "Baird Lab";
				break;
			default:
				document.getElementById("location").innerHTML = "My Office (Klaus)";
		}
		
		});
		*/

	// Event handling
	
	Template.status.events({
		'click .btn-large' : function () {
			console.log("ouch, you clicked me!");
			//if (Meteor.user() == repeet13 || Meteor.user() == RePeet13) {
				var opt = Session.get("option");
				if (opt > 2) {
					Session.set("option", 1);
				} else {
					Session.set("option", opt+1);
				}
			//}
			Deps.flush();
		}
	});
	
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
