Meteor.startup(function () {
	if (Update.find().count() === 0) {
		Update.insert({name: "Location", option: 0, area: "Off-Campus", date: ""});
	}
});
