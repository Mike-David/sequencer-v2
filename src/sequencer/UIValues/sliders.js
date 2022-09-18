import { sliders, sliderValues } from './uiValues';
import { activeNote } from '../app.js';

sliders.volume.addEventListener('change', (e) => {
	activeNote.volume = e.target.value;
});

sliders.length.addEventListener('change', (e) => {
	// Converting from a string (i.e. "3") to an integer
	activeNote.length = sliderValues.sliderLengths[parseInt(e.target.value)];
	console.log(activeNote);
});

sliders.noteValue.addEventListener('change', (e) => {
	activeNote.note = sliderValues.sliderNotes[parseInt(e.target.value)];
	console.log(activeNote);
});
