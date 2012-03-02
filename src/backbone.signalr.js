/***
* SignalR storage for Backbone.js
* Add a SignalR hub to your model that implements CRUD operations and use with backbone.js
*   Create => hub.create(model)
*   Read   => hub.find(model) and hub.findAll()
*   Update => hub.update(model)
*   Delete => hub.delete(model)
*
***/


Backbone.signalrSync = function(method, model, options, error){
	
	if (typeof options == 'function'){
		options = {
			success: options,
			error: error
		};
	}

	var resp;
	var hub = model.hub || model.collection.hub;

	switch(method){
		case "create":  resp = hub.create(model); break;
		case "read": 	resp = model.id != undefined ? hub.find(model) : hub.findAll(); break;
		case "update":  resp = hub.update(model); break;
		case "delete":  resp = hub.delete(model); break;
	}

	if (resp){
		alert(resp);
		options.success(resp);
	} else {
		options.error("Record not found");
	}
}

Backbone.ajaxSync = Backbone.sync;
Backbone.sync = Backbone.signalrSync;