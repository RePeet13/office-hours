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
		Session.set("option","2");
		/*
		Session.set("page", "login");
		var fragment = Meteor.render(function () {
			console.log("rendering template fragment");
			var currentpage = Session.get("page");
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
		*/
	});
	
	Deps.autorun{function () {
		if (Meteor.user() == "repeet13" || Meteor.user() == "RePeet13") {
			document.getElementById("location").setAttribute("class", "btn-large btn-"+Session.get("age"));
		} else {
			document.getElementById("location").setAttribute("class", "label label-"+Session.get("age"));
		}
	}
	
	Deps.autorun{function () {
		var option = (int)Session.get("option");
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
		
		}	
	}

	// Event handling
	
	/*
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
	*/
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
