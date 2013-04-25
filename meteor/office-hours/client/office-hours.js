Update = new Meteor.Collection("update");
//var timestamp = (new Date()).getTime();

Meteor.startup(function () {

	// Session Vars
	// Location
	Session.setDefault("loc", "My Office (Klaus)");
	// Age of last update
	Session.setDefault("age", "success");
	// Location number (for iterating)
	Session.setDefault("option",0);
});


// TODO implement a changing color based on the age of the last update
// Immediately green, green for 2 hours, then yellow, day change red
var updateHandle = null;
updateHandle = Meteor.subscribe("update", function () {
  if (!Session.get("age")) 
    var myloc = Update.findOne({}, {sort: {name: 1}});
});

// Static configuration type things
Accounts.ui.config({
	passwordSignupFields: 'USERNAME_ONLY'
});


// Template Methods and Helpers
Template.status.status = function () {
  return Update.find({}, {sort: {name: 1}});
};

Template.status.loading = function () {
	return !updateHandle.ready();
};

Template.status.area = function () {
	return this.area;
};

Template.status.date = function () {
	Session.set("option", this.option);
	return (new Date(this.date)).getSeconds();
};

/* TODO make this change out the color */
Template.status.age = function () {
	//return Session.get("age");
	return "success";
}

// Event handling

Template.status.events({
	'click .btn-large' : function () {
		console.log("ouch, you clicked me");
		var dbg = "null";
		if (Meteor.user() != null)
			dbg = Meteor.user().username;
			
		if (Meteor.user() != null && (Meteor.user().username == "repeet13" || Meteor.user().username == "RePeet13")) { // can probably do this restriction on the server (safer too)
			var opt = (Session.get("option") > 2) ? 0 : opt+=1; //inc if not too big
			var timestamp = (new Date()).getTime();
			
			console.log("updating to: " + opt);
			
			switch(opt) {
			case 0:
				Update.update(this._id, {option: opt, area: "Off-Campus", date: timestamp});
				break;
			case 1:
				Update.update(this._id, {option: opt, area: "My Office (Klaus)", date: timestamp});
				break;
			case 2:
				Update.update(this._id, {option: opt, area: "Baird Lab", date: timestamp});
				break;
			default:
				Update.update(this._id, {option: opt, area: "My Office (Klaus)", date: timestamp});
				break;
			}
			
		}
	}
});
