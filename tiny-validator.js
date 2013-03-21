/*
 Validator
 Author: Forlooper
 To Do:
 Usage:
 - Insert js files to page
 - get validator object
 - do any config
 - Add rules
 - add placeholder for notifications
 */
/* START: VALIDATOR CLASS */
Validator = function() {}

Validator.allowCommasInNumbers = true;

Validator.rules = {
    'required': {
        text: '{label} is required.',
        logic: function(value) {
            return (value == null || value == '' ? false : true);
        }
    },
    'email': {
        text: '{label} must be a valid email address.',
        logic: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
    },
    'integer': {
        text: '{label} must be an integer.',
        logic: /^[\-]?\d+$/
    },
    'decimal': {
        text: '{label} must be a decimal',
        logic: /^[\-]?[\d]+(\.\d*)?$/
    },
    'positive': {
        text: '{label} must be positive',
        logic: /^[\d]+(\.\d*)?$/
    },
    'negative': {
        text: '{label} must be negative',
        logic: /^\-[\d]+(\.\d*)?$/
    },
    'date': {
        text: '{label} must be a date of format dd/mm/yyyy',
        logic: /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/
    },
    'min': {
        text: '{label} must be at least {param1}',
        logic: function(value, param1) {
            value = Validator.number(value);
            if (value == null)
                return false;

            return (value >= param1 ? true : false);
        }
    },
    'max': {
        text: '{label} must be at most {param1}',
        logic: function(value, param1) {
            value = Validator.number(value);
            if (value == null)
                return false;

            return (value <= param1 ? true : false);
        }
    },
    'range': {
        text: '{label} must be between {param1} and {param2}',
        logic: function(value, param1, param2) {
            value = Validator.number(value);
            if (value == null)
                return false;

            return (value >= param1 && value <= param2 ? true : false);
        }
    },
    'minSize': {
        text: '{label} must have at least {param1} character(s)',
        logic: function(value, param1) {
            value += '';
            return (value.length >= param1 ? true : false);
        }
    },
    'maxSize': {
        text: '{label} must have at most {param1} character(s)',
        logic: function(value, param1) {
            value += '';
            return (value.length <= param1 ? true : false);
        }
    },
    'minDate': {
        text: '{label} must be {param1} or later',
        logic: function(value, param1) {
            var vDate = Validator.parseDate(value);
            var pDate = Validator.parseDate(param1);

            if (isNaN(vDate) || isNaN(pDate))
                return false;

            return (vDate - pDate >= 0 ? true : false);
        }
    },
    'maxDate': {
        text: '{label} must be {param1} or later',
        logic: function(value, param1) {
            var vDate = Validator.parseDate(value);
            var pDate = Validator.parseDate(param1);

            if (isNaN(vDate) || isNaN(pDate))
                return false;

            return (vDate - pDate <= 0 ? true : false);
        }
    },
    'decimalPlaces': {
        text: '{label} must have {param1} place(s)',
        logic: function(value) {
            //check if value is a number, round to x places
            //if value is not a number, return false
        }
    },
    'url': {
        text: '{label} must be a valid URL',
        logic: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
    },
    'phone': {
        text: '{label} must be a valid phone number',
        logic: /^[+]?[\d]{6}$/
    }
} //rules

/**
 *  Converts a number string to a Number type
 *  @param {{}} parmas - parameters
 *  @example  new Validator({form: $('#myForm'));
 */
Validator.Engine = function(params) {
    params = Lib.setDefaultParams(params, {
        '$form': null,
        '$notificationArea': $('body'),
        'skipDisabledControl': true,
        'submitHandler': null
    })


    this.$form = params.$form; //required, so we can handle submit event
    this.$notificationArea = params.$notificationArea; //if not supplied, we send display notifications at top of the page
    this.skipDisabledControls = params.skipDisabledControls;
    this.submitHandler = params.submitHandler;
    this.errorFieldCssClass = 'tiny-validator_errorField';
    this.errorMessageCssClass = 'tiny-validator_errorMsg';

    this.registry = [];
    this.failedRegistry = [];

    if (this.submitHandler == null) {
        var thisValidator = this;
        this.$form.submit(function() {
            if (thisValidator.validate()) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    else
        this.$form.submit(params['submitHandler']);
}


/**
 *  Converts a number string to a Number type
 *  @param {String} value - the number string
 *  @example  Validator.number('123,000');
 */
Validator.number = function(value) {
    var properNum;

    //remove any commas that exists
    value += ''; //make it a string

    if (Validator.allowCommasInNumbers) {
        properNum = value.replace(/,/g, '');
    }

    if (properNum == '') //isNaN('') or isNaN(' ') or isNaN('  '), etc, == false (strange indeed!)
        return null;

    if (isNaN(properNum))
        return null;

    return Number(properNum);
}

/**
 * Converts a date string into a Date object
 * @param {String} dateStr - a date string
 * @example  Validator.parseDate('31/10/2012');
 */
Validator.parseDate = function(dateStr) {
    var parts = dateStr.split("/");
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    var d = new Date(Number(parts[2]), Number(parts[1])-1, Number(parts[0]), 0, 0, 0, 0); // months are 0-based

    return Date.parse(d);
}

/**
 * Converts a Date object into a string of format dd/mm/yyyy
 * @param {Date} date - Date object
 * @example  Validator.date2Str(new Date());
 */
Validator.date2Str = function(date) {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
}

/**
 * Define rules for validations here.
 * Keys:
 *  - text => the error message. {label} will be replaced by the control label
 *  - logic => the logic that's run to return if the value being validated is valid or not; logic can be either a regular expression or an inline function returning true or false
 */
Validator.Engine.prototype = {
    /**
     *  Add a remove rule from a control
     *  @param {String} $ctrl - the control ID of the field
     *  @param {String} rule - the rule to add to this field
     */
    remove: function($ctrl, rule) {
        for (var i=0; i < this.registry.length; i++) {
            if ($ctrl.prop('id') == this.registry[i].$ctrl.prop('id') && rule == this.registry[i].rule) {
                this.registry.splice(i, 1);
                return true;
            }
        }

        return false; //didn't remove anything
    },
    /**
     *  Add a validation rule to a text field
     *  @param {String} $ctrl - the control ID of the field
     *  @param {String} label - the label of the control
     *  @param {String} rule - the rule to add to this field
     *  @param {[]} params - an array of string params that will be passed to the rule (min: 0 parmas, max: 3 params)
     *  @example see overview
     */
    textField: function($ctrl, label, rule, params) {
        if (typeof params == 'undefined' || params == null) {
            params = [];
        }

        this.registry.push({
            type: 'text',
            $ctrl: $ctrl,
            label: label,
            rule: rule,
            params: params
        });
    },
    /**
     *  Add a validation rule to a select field
     *  Only the 'required' rule is supported if select control allows multiple selections
     *  @param {String} $ctrl - the control ID of the field
     *  @param {String} label - the label of the control
     *  @param {String} rule - the rule to add to this field
     *  @param {[]} params - an array of string params that will be passed to the rule (min: 0 parmas, max: 3 params)
     *  @example see overview
     */
    selectField: function($ctrl, label, rule, params) {
        if (typeof params == 'undefined' || params == null) {
            params = [];
        }

        this.registry.push({
            type: 'select',
            $ctrl: $ctrl,
            label: label,
            rule: rule,
            params: params
        });
    },
    /**
     *  Add a validation rule to a checkbox group
     *  Only the 'required' rule is supported for checkboxes
     *  @param {String} $ctrl - the control ID of the field
     *  @param {String} label - the label of the control
     *  @param {String} rule - the rule to add to this field
     *  @param {[]} params - an array of string params that will be passed to the rule (min: 0 parmas, max: 3 params)
     *  @example see overview
     */
    checkboxes: function($ctrl, label, rule, params) {
        if (typeof params == 'undefined' || params == null) {
            params = [];
        }

        this.registry.push({
            type: 'checkbox',
            $ctrl: $ctrl,
            label: label,
            rule: rule,
            params: params
        });
    },
    /**
     *  Add a validation rule to a radio button group
     *  @param {String} $ctrl - the control ID of the field
     *  @param {String} label - the label of the control
     *  @param {String} rule - the rule to add to this field
     *  @param {[]} params - an array of string params that will be passed to the rule (min: 0 parmas, max: 3 params)
     *  @example see overview
     */
    radioButtons: function($ctrl, label, rule, params) {
        if (typeof params == 'undefined' || params == null) {
            params = [];
        }

        this.registry.push({
            type: 'radio',
            $ctrl: $ctrl,
            label: label,
            rule: rule,
            params: params
        });
    },
    /**
     * Creates and displays an error message
     * @param {String} msg - the error message
     * @example Validator.errorMessage("Title is required");
     */
    errorMessage: function(msg) {
        View.notify(msg, {'$notificationArea': this.$notificationArea, 'addClass': this.errorMessageCssClass});
    },
    /**
     * The validation engine. Designed to be called by the system.
     * @example Validator.validate();
     */
    validate: function() {
        //clear the failed registry
        this.failedRegistry = [];
        //clear the error messages too
        $('.' + this.errorMessageCssClass).remove();

        var errorMsgs = [];

        //unhighlight all error fields if any
        this.$form.find('.' + this.errorFieldCssClass).removeClass(this.errorFieldCssClass);

        for (var i=0; i < this.registry.length; i++) {
            var item = this.registry[i];
            var type = item['type'];
            var $ctrl = item['$ctrl'];
            var label = item['label'];
            var rule = item['rule'];
            var params = item['params'];
            var isAFailedCtrl = false;

            if (jQuery.inArray($ctrl, this.failedRegistry) != -1) {
                isAFailedCtrl = true;
            }

            if (isAFailedCtrl)
                continue;

            if (this.skipDisabledControls && $ctrl.prop('disabled') == true)
                continue;

            /*
             * The following section is split into two subsections, one handling non-table fields and the other handling table fields
             * Each subsection has the following structure:
             * - get the value of a field
             * - run the rule logic on the field
             * - handle the validation result
             */
            /* START: GET CONTROL VALUE */
            var value = null;

            switch(type) {
                case 'text':
                    value = $ctrl.val();
                    break;
                case 'checkbox':
                    var $boxes = $ctrl;
                    $boxes.each(function() {
                        if ($(this).prop('checked') == true) {
                            if (value == null) {
                                value = []; //since this is a checkbox group, values are captured in an array rather than as single string
                            }
                            value.push($(this).val());
                        }
                    });
                    break;
                case 'select':
                    value = $ctrl.val();
                    break;
                case 'radio':
                    var $buttons = $ctrl;
                    $buttons.each(function() {
                        if ($(this).prop('checked') == true) {
                            value = $(this).val();
                            return false;
                        }
                    });
                    break;
            }
            /* END: GET CONTROL VALUE */

            /* START: APPLY RULE LOGIC */
            var logic = Validator.rules[rule]['logic'];
            var result = false;
            if (typeof logic == 'function') {
                result = logic(value, params[0], params[1], params[2]);
            }
            else {
                result = logic.test(value);
            }
            /* END: APPLY RULE LOGIC */

            /* START: HANDLE VALIDATION RESULT */
            /*
             * If validation fails, add the field to the failed registry so that any remaining
             * validations for it will be skipped; add a error css class to the field, and generate
             * and add the error message to the array so that all error messages are later inserted
             * to the page at once
             */
            if (result == false) {
                var text = Validator.rules[rule]['text'];

                if (typeof params[0] != 'undefined')
                    text = text.replace(/{param1}/g, params[0]);

                if (typeof params[1] != 'undefined')
                    text = text.replace(/{param2}/g, params[1]);

                if (typeof params[2] != 'undefined')
                    text = text.replace(/{param3}/g, params[2]);

                //if control is group of radio buttons or checkboxes, scroll it to the first item of the group
                switch(type) {
                    case 'radio':
                    case 'checkbox':
                        text = text.replace(/{label}/g, '<a href="javascript: void(0)" onclick="View.scrollToElement(\'' + $ctrl.first().prop('id') + '\')">' + label + '</a>');
                        break;
                    default:
                        text = text.replace(/{label}/g, '<a href="javascript: void(0)" onclick="View.scrollToElement(\'' + $ctrl.prop('id') + '\')">' + label + '</a>');
                        break;
                }

                this.failedRegistry.push($ctrl);

                //only add class if it's not radio button group or checkboxes
                if (type != 'checkbox' && type != 'radio')
                    $ctrl.addClass(this.errorFieldCssClass);

                errorMsgs.push(text);
            }
            else {
                $ctrl.removeClass(this.errorFieldCssClass);
            }
            /* END: HANDLE VALIDATION RESULT */
        }


        /* START: DISPLAY ERROR NOTIFICATIONS AND RETURN VALIDATE METHOD RESULT */
        if (errorMsgs.length > 0) {
            $('body').animate({
                scrollTop: this.$notificationArea.position().top
            }, 'slow');

            while ( (msg = errorMsgs.pop()) != null) {
                this.errorMessage(msg);
            }

            return false;
        }
        else {
            return true;
        }
        /* END: DISPLAY ERROR NOTIFICATIONS AND RETURN VALIDATE METHOD RESULT */
    }
}
/* END: VALIDATOR CLASS */

/* START: LIB CLASS */
Lib = function () {
};

/*
 super imposes supplied parameters into a function/method so we have all parameters and those not supplied will be using default values
 */
Lib.setDefaultParams = function (suppliedParams, defaultParams) {
    for (var key in suppliedParams) {
        defaultParams[key] = suppliedParams[key];
    }

    suppliedParams = defaultParams;

    return suppliedParams;
}
/* END: LIB CLASS */

/* START: VIEW CLASS */
function View() {
}

View.notificationCount = 0;
View.notify = function (msg, params) {
    params = Lib.setDefaultParams(params, {
        $notificationArea: $('body'),
        highlight: true,
        addClass: null
    });

    //create div
    var $newDiv = $('<div class="notification">');
    $newDiv.prop('id', 'view_notification_' + View.notificationCount);
    $newDiv.css('text-align', 'center');

    if (params['addClass'] != null)
        $newDiv.addClass(params['addClass']);

    View.notificationCount++;

    //add msg to div
    $newDiv.html(msg);

    //prepend div to
    params.$notificationArea.prepend($newDiv);

    if (params['highlight'])
        $newDiv.effect("highlight", {}, 10000);
}

/**
 * highlight: Highlight the element after scrolling to it
 */
View.scrollToElement = function (ctrlId, options) {
    if (typeof options == 'undefined' || options == null) {
        options = {
            highlight: false,
            highlightDuration: 1000
        };
    }

    if (typeof options['highlightDuration'] == 'undefined' || options['highlightDuration'] == null) {
        options['highlightDuration'] = 1000;
    }
    //check if ctrl is in tabs, if it is, activate that tab first

    $('body').animate({
        scrollTop: $('#' + ctrlId).position().top
    }, 'slow', function () {
        $('#' + ctrlId).effect("highlight", {}, options['highlightDuration']);
    });
}
/* START: VIEW CLASS */