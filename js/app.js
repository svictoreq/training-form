$(document).ready(function() {
	const portInputs = [...$('#portfolio input')];
	const accountInputs = [...$('#account input')];
	const inputs = [...$('input')];

	const disableAccInputs = function disableAccInputs(value) {
		for (let i = accountInputs.length - 1; i >= 0; i--) {
			if (typeof value !== "boolean") {
				throw 'Invalid type of parameter, must be a boolean';
			}
			$(accountInputs[i]).prop('disabled', value);
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
			}
		});
	})
});
