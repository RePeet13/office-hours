Update = new Meteor.Collection("update");

if (Meteor.isClient) {
	// TODO implement a changing color based on the age of the last update
	// Immediately green, green for 2 hours, then yellow, day change red
	
	
	// Static configuration type things
	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_ONLY'
	});
	
	//Startup Function
	Meteor.startup(function() {
		console.log("entered startup");
		Meteor.subscribe("update");
		Session.set("loc", "My Office");
		Session.set("age", "success");
		Session.set("option",2);
		
		var frag = Meteor.render(function () {
			var opt = Session.get("option");
			console.log("fetching");
			var myloc = Update.find().fetch();
			console.log("updating");
			Update.update(myloc._id, {option: opt});
			console.log("option " + opt);
			switch(opt) {
				case 0:
					//case where you display whatever the db says
					break;
				case 1:
					return Template.status({area: "Baird Lab"});
				default:
					return Template.status({area: "My Office (Klaus)"});
			}
			});
		document.body.appendChild(frag);
	});
	
	/* TODO make this change out the color
	Deps.autorun(function () {
		if (Meteor.userId() == "repeet13" || Meteor.user() == "RePeet13") {
			document.getElementById("location").setAttribute("class", "btn-large btn-"+Session.get("age"));
		} else {
			document.getElementById("location").setAttribute("class", "label label-"+Session.get("age"));
		}
	});
	*/

	// Event handling
	
	Template.status.events({
		'click .btn-large' : function () {
			console.log("ouch, you clicked me! " + Meteor.user());
			if (Meteor.userId() == "repeet13" || Meteor.userId() == "RePeet13") {
				var opt = Session.get("option");
				if (opt > 2) {
					Session.set("option", 1);
				} else {
					Session.set("option", opt+1);
				}
			}
			Deps.flush();
		}
	});
	
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		if (Update.find().count() === 0) {
			Update.insert({name: "Location", option: 2, custom: "none"});
		}
	});
  
	Meteor.publish("update", function () {
		return Update.find({name: "Location"});
	});
}
