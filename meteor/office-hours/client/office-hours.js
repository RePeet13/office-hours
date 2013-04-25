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

checkUser = function () {
    if (Meteor.user() == null)
        return false;
        
    if (Meteor.user().username == "repeet13" || Meteor.user().username == "RePeet13")
        return true;
}

// Template Methods and Helpers
Template.status.status = function () {
  return Update.find({}, {sort: {name: 1}});
};

Template.status.loading = function () {
	return !updateHandle.ready();
};

Template.status.area = function () {
    Session.set("option", this.option);
	return this.area;
};

Template.status.date = function () {
	Session.set("option", this.option);
    var d = new Date(this.date);
    if (d.getHours() == "NaN")
        return "none"
    var m = d.getMinutes();
    m = (m < 10) ? "0" + m : m; //format minutes
	return d.getHours() + ":" + m + " on " + d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
};

/* TODO make this change out the color */
Template.status.age = function () {
	//return Session.get("age");
	return "success";
}

Template.regen.allowed = function () {
    return checkUser();
}

// Event handling

Template.status.events({
	'click .btn-large' : function () {
		console.log("ouch, you clicked me");
		
        var opt = 0;
		if (checkUser()) { // can probably do this restriction on the server (safer too)
			opt = (Session.get("option") > 2) ? 0 : opt+=1; //inc if not too big
			var timestamp = (new Date()).getTime();
			
			console.log("updating to: " + opt);
			Session.set("option", opt);
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

Template.regen.events({
    'click .btn-large' : function (event) {
		console.log("ouch, you clicked my regen");
        event.preventDefault();
        event.stopPropagation();
		Meteor.call("regen");
        console.log("after method call");
	}
});

// Shared Methods

Meteor.methods({
  regen: function () {}
});
