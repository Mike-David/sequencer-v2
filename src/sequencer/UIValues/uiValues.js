export const sliders = {
	volume: document.getElementById('volume'),
	length: document.getElementById('length'),
	noteValue: document.getElementById('note'),
};

export const sliderValues = {
	sliderLengths: ['16n', '8n', '4n', '1n'],
	sliderNotes: [
		'C4',
		'C#4',
		'D4',
		'D#4',
		'E4',
		'F4',
		'F#4',
		'G4',
		'G#4',
		'A4',
		'A#4',
		'B4',
	],
};

export const checkBoxes = Array.from(
	document.getElementsByClassName('sequence')
);
