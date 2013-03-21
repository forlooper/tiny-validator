# Tiny Validator
A tiny, simple, streamlined form validator based on jQuery, designed with the following in mind:

- keep it simple
- extensible
- customizable

## Requirements
Tiny Validator needs the following to work:

- jQuery
- jQuery UI (that includes at least the 'highlight' effect)

## Usage
Add references to the js and css files:

	<script type="text/javascript" src="../jquery.min.js"></script>
    <script type="text/javascript" src="../jquery-ui.custom.min.js"></script>
    <script type="text/javascript" src="../lib.js"></script>
    <script type="text/javascript" src="../view.js"></script>
    <script type="text/javascript" src="../tiny-validator.js"></script>

Instantiate an Engine object and add rules to your form controls:

	<script type="text/javascript">
        var engine;
        $(document).ready(function() {
            engine = new Validator.Engine({$form: $('#testForm')});
            engine.textField($('#name'), 'Name', 'required', []);
            engine.textField($('#age'), 'Age', 'min', [18]);

            engine.textField($('#birthdate'), 'Birthdate', 'date', []);
            engine.radioButtons($('input[name="gender"]'), 'Gender', 'required', []);
            engine.checkboxes($('input[name="attributes"]'), 'Attributes', 'required', []);
            engine.textField($('#cash'), 'Cash', 'integer', []);
            engine.selectField($('#country'), 'Country', 'required', []);
        });
    </script>

**That's it!**

## How It Works
First, we instantiate an Engine, passing to it the form we want to validate. Next, using the engine, we add the rules to the controls (textfields, radio buttons, checkboxes, select, etc) of our form. 

This is all for the setup.

When the user submits the form, the engine verifies the data against the rules. If at least one rule fails, the form will not be submitted and errors will be displayed at the top of the page.

## Attaching Rules
There are 4 methods for adding rules to controls, each corresponding to the type of control it was named after.


Engine method | Used for | Notes
------------- | --------
textField     | text fields and text areas | Expects to be given a jQuery selection of a single text field
selectField   | select dropdown lists | Expects to be given  a jQuery selection of a single select dropdown list
radioButtons  | radio buttons | Expects to be given  a jQuery selection of a group of radio buttons
checkboxes    | checkboxes | Expects to be given  a jQuery selection of a group of checkboxes

To add a rule to a text field, use the textField method. To add a rule to a select dropdown list, use the selectField method, and so on.

All 4 methods take the same 4 parameters.


	textField: function($ctrl, label, rule, params)

*$ctrl* is a jQuery selection of the control. For radio buttons and checkboxes, this selection include more than one element.

*label* is the label of the control.

*rule* is the name of the rule we want to add

*params* is optional. Some rules like 'min', which tests if a field contains a minimum number, require you to pass in a parameter so that it knows what the minimum number should be.

## Defining Rules
This section explains how rules are defined.


## FAQ
### How do I add new predfined rules?
how do I remove a rule from a control?
Can I add more than one rule to a control?
Can I choose where the error messages come up?


## API Overview
### Validator Object
The Validator object contains utility methods and the Engine object.

The Validator object does not need to be created. Its members are static in nature.

Property | Static | Description
-------- | ------ | -----------
allowCommasInNumbers | Y | Set to true if commas are allowed in numbers e.g. 1,000
rules | Y | Where the rules are defined

Method | Static | Description
------ | ------ | -----------
number | Y | Converts a number string to a Number type
parseDate | Y | Converts a date string into a Date object
date2Str | Y | Converts a Date object into a string of format dd/mm/yyyy
Engine | Y | See section on Engine Object

### Engine Object
The Engine object is used to attach rules to fields and verify if they hold valid values.

Engine objects are created with new Validator.Engine().

Property | Static | Description
-------- | ------ | -----------
$form | N | Holds the form object
$notificationArea | N | Holds the notification area object
skipDisabledControls | N | Set to true to skip validation for controls that have attached rules but disabled
submitHandler | N | Event handler for the form submission
errorFieldCssClass | N | The CSS class name to add to a field that fails a rule
errorMessageCssClass | N | The CSS class name to use for error messages in the notification area


Method | Static | Description
------ | ------ | -----------
constructor | N | Creates and returns an Engine object
textField | N | Attaches a rule to a text field
selectField | N | Attaches a rule to a select field
radioButtons | N | Attaches a rule to a radio button group
checkboxes | N | Attaches a rule to a checkbox group

## Method Reference
### Validator Object
#### number()
Converts a number string to a *Number* type
##### Syntax
	Validator.Number('123,000');
##### Parameter Values
Parameter | Description
--------- | -----------
value | Required. A string representing a number
##### Return Value
Type | Description
---- | -----------
Number | The converted Number object
 
---------------------------------------------
#### parseDate()
Converts a date string into a Date object
##### Syntax
	Validator.parseDate('31/10/2012');
##### Parameter Values
Parameter | Description
--------- | -----------
dateStr | Required. String representation of a date
##### Return Value
Type | Description
---- | -----------
Date | The Date object converted from dateStr
 
---------------------------------------------
#### date2Str()
Converts a Date object into a string of format dd/mm/yyyy
##### Syntax
	Validator.date2Str(new Date());
##### Parameter Values
Parameter | Description
--------- | -----------
date | The Date object to be converted to a formatted string
##### Return Value
Type | Description
---- | -----------
String | The date in formatted string
  
 
---------------------------------------------
### Engine Object
#### contructor()
##### Example 1
	var engine = new Validator.Engine({$form: $('#theForm')});
##### Example 2
	var engine = new Validator.Engine({$form: $('#theForm'), $notificationArea: $('#notificationArea')});
##### Example 3
	var engine = new Validator.Engine({$form: $('#theForm'), 
									$notificationArea: $('#notificationArea'), 
									submitHandler: function() {
										return engine.validate();
	}});
##### Syntax
	var engine = new Validator.Engine({});
##### Parameter Values
Parameter | Description
--------- | -----------
 | 
##### Return Value
Type | Description
---- | -----------
 | 
 
---------------------------------------------
 
#### remove()
##### Example
	var engine = new Validator.Engine({$form: $('#theForm')});
	engine.textField($('#name'), 'Name', 'required');
	engine.remove($('#name'), 'required');
##### Syntax
	Engine.remove($ctrl, rule);
##### Parameter Values
Parameter | Type | Description
--------- | ---- | -----------
$ctrl | jQuery selection | Required. A jQuery selection of the field
rule | String | Required.Rule name
 
---------------------------------------------
 
#### textField()
Add a validation rule to a text field
##### Example
	var engine = new Validator.Engine({$form: $('#theForm')});
	engine.textField($('#name'), 'Name', 'required');
	engine.textField($('#age'), 'Age', 'min', [18]);
##### Syntax
	Engine.textField(ctrl, label, rule, params);
##### Parameter Values
Parameter | Type | Description
--------- | ---- | -----------
$ctrl | jQuery selection | Required. A jQuery selection of the field
label | String | Required. A string of the field name for the error message
rule | String | Required. Rule name
params | Array | Optional. Additional parameters for the rule if it them to function. Can be omitted or an empty array if this parameter is not needed for the rule.
 
---------------------------------------------
 
#### selectField()
Add a validation rule to a select field
##### Example
	var engine = new Validator.Engine({$form: $('#theForm')});
	engine.selectField($('#country'), 'Country', 'required');
##### Syntax
	Engine.selectField(ctrl, label, rule, params);
##### Parameter Values
Parameter | Type | Description
--------- | ---- | -----------
$ctrl | jQuery selection | Required. A jQuery selection of the field
label | String | Required. A string of the field name for the error message
rule | String | Required. Rule name
params | Array | Optional. Additional parameters for the rule if it them to function. Can be omitted or an empty array if this parameter is not needed for the rule.
 
---------------------------------------------
 
#### checkboxes()
Add a validation rule to a checkbox group
##### Example
	var engine = new Validator.Engine({$form: $('#theForm')});
##### Syntax
	Engine.textField(ctrl, label, rule, params);
	engine.checkboxes($('input[name="attributes"]'), 'Attributes', 'required');
##### Parameter Values
Parameter | Type | Description
--------- | ---- | -----------
$ctrl | jQuery selection | Required. A jQuery selection of the checkboxes in the checkbox group
label | String | Required. A string of the field name for the error message
rule | String | Required. Rule name
params | Array | Optional. Additional parameters for the rule if it them to function. Can be omitted or an empty array if this parameter is not needed for the rule.
 
---------------------------------------------
 
#### radioButtons()
Add a validation rule to a radio button group
##### Example
	var engine = new Validator.Engine({$form: $('#theForm')});
	engine.radioButtons($('input[name="gender"]'), 'Gender', 'required');
##### Syntax
	Engine.textField(ctrl, label, rule, params);
##### Parameter Values
Parameter | Type | Description
--------- | ---- | -----------
$ctrl | jQuery selection | Required. A jQuery selection of the radio buttons in the radio group
label | String | Required. A string of the field name for the error message
rule | String | Required. Rule name
params | Array | Optional. Additional parameters for the rule if it them to function. Can be omitted or an empty array if this parameter is not needed for the rule.
 
---------------------------------------------
 
#### errorMessage()
Displays an error message in the notification area
##### Example
	var engine = new Validator.Engine({$form: $('#theForm')});
	engine.errorMessage("There is a problem");
##### Syntax
	Engine.errorMessage("Title is required");
##### Parameter Values
Parameter | Type | Description
--------- | ---- | -----------
msg | String | Required. The message
##### Return Value
Type | Description
---- | -----------
 | 
 
---------------------------------------------
 
#### validate()
##### Example
	var engine = new Validator.Engine({$form: $('#theForm')});
	engine.textField($('#name'), 'Name', 'required');
	engine.validate();
##### Syntax
	Engine.validate();
##### Return Value
Type | Description
---- | -----------
Boolean | True if all attached rules pass. False if at least one fail.
 
---------------------------------------------
 
#### ()
##### Syntax
##### Parameter Values
Parameter | Description
--------- | -----------
 | 
##### Return Value
Type | Description
---- | -----------
 | 
 
---------------------------------------------
 
#### ()
##### Syntax
##### Parameter Values
Parameter | Description
--------- | -----------
 | 
##### Return Value
Type | Description
---- | -----------
 | 
 
---------------------------------------------