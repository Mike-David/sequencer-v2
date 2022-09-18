import * as Tone from 'tone/build/esm/core/Tone.js';
import { instruments, instrumentArrays } from './instruments.js';
import { sliders, sliderValues, checkBoxes } from './UIValues/uiValues';

/* store the last note the user clicked */
export let activeNote;

/* destructuring instrumentArray so that the instruments are easier to refernce. */
const {
	bassDrumArray,
	snareDrumArray,
	highHatArray,
	synthOneArray,
	synthTwoArray,
	synthThreeArray,
} = instrumentArrays;

export let activeInstrument = bassDrumArray;

/* 
	Filling each instrument array with objects representing the note that checkbox will hold. 
	Maybe we could probably make a Note class and use a constructor here. Is that needed?
	or is an object literal enough? Maybe a TS interface would be nice? We should at least 
	find a more DRY, less verbose way to do this. 
*/

for (let i = 0; i < checkBoxes.length; i++) {
	bassDrumArray.push({
		checked: false,
		instrument: 'bassDrum',
		type: 'sampler',
		length: '8n',
		volume: 1,
	});

	snareDrumArray.push({
		checked: false,
		instrument: 'snareDrum',
		type: 'sampler',
		length: '8n',
		volume: 1,
	});

	highHatArray.push({
		checked: false,
		instrument: 'highHat',
		type: 'sampler',
		length: '8n',
		volume: 1,
	});

	synthOneArray.push({
		checked: false,
		instrument: 'synthOne',
		type: 'synth',
		note: 'F4',
		length: '8n',
		volume: 1,
	});

	synthTwoArray.push({
		checked: false,
		instrument: 'synthTwo',
		type: 'synth',
		note: 'F4',
		length: '8n',
		volume: 1,
	});

	synthThreeArray.push({
		checked: false,
		instrument: 'synthThree',
		type: 'synth',
		note: 'F4',
		length: '8n',
		volume: 1,
	});
}

/* 
set current value of note to index of 0 so that we can iterate through this Array
once it reaches the end, it resets index to 0 and begins at the 1st Object in the Array.

currentNote and playNote could be coupled into a class. Having them just floating 
in space like this isn't great. 
*/

let currentNote = 0;

let playNote = (step) => {
	const playInstrument = (instrument, step) => {
		let note = instrument[step];
		/* if not checked return (dont wanna do anything really unless true) */
		if (note.checked === false) return;
		/* sending note information to the synth to play it */
		if (note.type === 'synth') {
			instruments[note.instrument].triggerAttackRelease(
				note.note,
				note.length,
				'+0',
				note.volume
			);
		} else {
			instruments[note.instrument].start();
		}
	};
	/*
	 on each iteration key is equal to a key name from Instruments Arrays
	 use key name to access properties in the instrumentArray 
	 */
	for (const key in instrumentArrays) {
		playInstrument(instrumentArrays[key], step);
	}

	/* 
length - 1 is the last index because index starts at 0
conditional iterating through array and resetting to 0 once done 
*/

	if (currentNote >= activeInstrument.length - 1) {
		currentNote = 0;
	} else {
		currentNote++;
	}
};

/*
using forEach method to iterate through each input (check box) and add an action (on change) - 
and once they are changed grab assigned value to the input so that we can compare the array index 
to the value of checked or unchecked inputs. can this be factored out?
*/

checkBoxes.forEach((e) => {
	e.addEventListener('change', (e) => {
		let index = Number(e.target.dataset.note);
		/* returns whole array */
		let notes = activeInstrument[index];
		activeNote = notes;

		sliders.volume.value = activeNote.volume * 10;
		sliders.length.value = `${sliderValues.sliderLengths.indexOf(
			activeNote.length
		)}`;
		sliders.noteValue.value = `${sliderValues.sliderNotes.indexOf(
			activeNote.note
		)}`;

		/* 
		 flip booleon in this case instead of assigning the 
		 opposite as new variable - toggle switch for example: 
		 notes.checked = false // !notes.checked = true; 
		*/

		notes.checked = !notes.checked;
	});
});

let playButton;

/* adding listener for the play button. Can this be factored out? */
document.getElementById('play').addEventListener('click', () => {
	/* 
	Setinterval returns a numerical ID that you can use 
	with the clearInterval function to stop the interval 
	*/
	if (!playButton) {
		playButton = setInterval(() => playNote(currentNote, currentNote), 200);
	} else {
		clearInterval(playButton);
		playButton = undefined;
	}
});

/* Clear instruments button */
document.getElementById('clear').addEventListener('click', () => {
	checkBoxes.forEach((e) => {
		e.checked = false;
	});

	activeInstrument.forEach((e) => {
		e.checked = false;
	});
});

Array.from(document.getElementsByClassName('instrument')).forEach((e) => {
	e.addEventListener('click', (e) => {
		activeInstrument = instrumentArrays[e.target.id];
		checkBoxes.forEach((o, i) => {
			o.checked = activeInstrument[i].checked;
		});
	});
});
