// Knockout numeric handler.
// Author: Dragon Rhyme

ko.bindingHandlers['numeric'] = {
    'init': function (element, valueAccessor, allBindingsAccessor) {
        // Handle the field changing to store the new value.
        ko.utils.registerEventHandler(element, "change", function () {
        	var _observable = valueAccessor();

        	if(!typeof(_observable) === 'function') {
	        	_observable = valueAccessor;
        	}

        	_observable(this.value);
        });
        // Prevent improper input when keydown.
        ko.utils.registerEventHandler(element, "keydown", function (e) {
			if(this.value.replace(/\d+/,'').length > 0 && e.keyCode === 190) {
	    		return false;
	    	}
	    	return true;
	    });
	    // Replace the appropriate input when keyup.
        ko.utils.registerEventHandler(element, "keyup", function (e) {
        	try {
	        	if(e.keyCode === 190) {
		        	return;
	        	} else {
		        	if(/[^\d+(\.\d{2})?$]/.test(this.value)){
		        		this.value = this.value.replace(/[^\d+(\.\d{2})?$]/g,'');
		        	}
		        }
	        } catch(ex) {
	        	// Restored to the previous value, you have a better approach?
		        var _value = ko.utils.unwrapObservable(valueAccessor());
		        this.value = _value;
		        return false;
	        }
        });
    },
    'update': function (element, valueAccessor) {
        var _value = ko.utils.unwrapObservable(valueAccessor());
        element.value = _value;
    }
};