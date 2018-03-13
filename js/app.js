$(document).ready(function() {
	const portInputs = [...$('#portfolio input')];
	const accountInputs = [...$('#account input')];
	const inputs = [...$('input')];

	const disableAccInputs = function disableAccInputs(value) {
		for (let i = 0; i < accountInputs.length; i++) {
			if (typeof value !== "boolean") {
				throw 'Invalid type of parameter, must be a boolean';
			}
			$(accountInputs[i]).prop('disabled', value);
		}
	}

	const checkForSubmit = function checkForSubmit() {
		if (inputs.every(input => input.value) && $('#priv-terms')[0].checked) {
			$('form').off('submit');
		} else {
			$('form').on('submit', function(e) {
				e.preventDefault();
			});
		}
	}

	// Required checking
	inputs.forEach(input => {
		$(input).on('focusout', function() {
			if (!this.value) {
				$(this).addClass('required');
				$(this).attr('placeholder', 'REQUIRED');
			} else {
				$(this).removeClass('required');
				$(this).attr('placeholder', '');
			}
		});

		// This is for UX improvement
		// when filling a required input
		$(input).on('keypress', function() {
			$(this).removeClass('required');
			$(this).attr('placeholder', '');
		});
	});

	// Check if portfolio inputs are filled
	disableAccInputs(true);
	portInputs.forEach(input => {
		$(input).on('keyup', function() {
			if (portInputs.every(input => input.value)) {
				disableAccInputs(false);
			} else {
				disableAccInputs(true);
				accountInputs.forEach(input => input.value = '')
			}
		});
	});

	// Submit button "disabled" toggle
	$('form button').prop('disabled', true);
	$('#priv-terms').on('click', function() {
		if (!$('#priv-terms')[0].checked) {
			$('form button').prop('disabled', true);
		} else {
			$('form button').prop('disabled', false);
		}
	});

	$('form').on('submit', checkForSubmit);
});
