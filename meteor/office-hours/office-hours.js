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
			var myloc = Update.find({}, {name: "Location"});
			console.log("myloc: " + myloc.count());
			console.log("option: " + opt + ", myloc.area: ");// + myloc[0].area);
			/*
			switch(opt) {
				case 0:
					//case where you display whatever the db says
					break;
				case 1:
					return Template.status({area: "Off-Campus"});
				case 2:
					return Template.status({area: "Baird Lab"});
				default:
					return Template.status({area: "My Office (Klaus)"});
			}
			*/
			return Template.status({area: myloc.area});
			});
		frag = Template.status({area: "loading"});
		document.body.appendChild(frag);
	});
	
	/* TODO make this change out the color
	Deps.autorun(function () {
		if (Meteor.user().username == "repeet13" || Meteor.user().username == "RePeet13") {
			document.getElementById("location").setAttribute("class", "btn-large btn-"+Session.get("age"));
		} else {
			document.getElementById("location").setAttribute("class", "label label-"+Session.get("age"));
		}
	});
	*/

	// Event handling
	
	Template.status.events({
		'click .btn-large' : function () {
			console.log("ouch, you clicked me");
			var dbg = "null";
			if (Meteor.user() != null)
				dbg = Meteor.user().username;
			if (Meteor.user() != null || Meteor.user().username == "repeet13" || Meteor.user().username == "RePeet13") {
				var opt = Session.get("option");
				if (opt > 2) {
					opt = 0;
				} else {
					opt += 1;
				}
				
				var setmyloc = Update.find();
				console.log("updating: " + myloc.option + " to: " + opt);
				
				switch(opt) {
				case 0:
					Update.update(setmyloc._id, {option: opt, area: "Off-Campus"});
					break;
				case 1:
					Update.update(setmyloc._id, {option: opt, area: "My Office (Klaus)"});
					break;
				case 2:
					Update.update(setmyloc._id, {option: opt, area: "Baird Lab"});
					break;
				default:
					Update.update(setmyloc._id, {option: opt, area: "My Office (Klaus)"});
					break;
				}
				
			}
			Deps.flush();
		}
	});
	
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		if (Update.find().count() === 0) {
			Update.insert({name: "Location", option: 0, area: "Off-Campus", date: ""});
		}
	});
  
	Meteor.publish("update", function () {
		return Update.find({name: "Location"});
	});
	
	Update.allow({
		insert: function (userId, location) {
			return false;
		}
	});
}
