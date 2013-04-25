Update = new Meteor.Collection("update");

Meteor.startup(function () {
	if (Update.find().count() === 0) {
		var timestamp = new Date();
		Update.insert({name: "Location", option: 0, area: "Off-Campus", date: timestamp});
	}
});
