import { activeInstrument } from './app';
import {} from './uiValues';
import { instruments, instrumentArrays } from './instruments';

export default playNote = (step, currentNote) => {
	let note = activeInstrument[step];
	const playInstrument = (instrument, step) => {
		let note = instrument[step];
		// if not checked return (dont wanna do anything really unless true)
		if (note.checked === false) return;
		// sending note information to the synth to play it
		if (note.type === 'synth') {
			instruments[note.instrument].triggerAttackRelease(note.note, note.length);
		} else {
			instruments[note.instrument].start();
		}
	};
	//on each iteration key is equal to a key name from Instruments Arrays
	//use key name to access properties in the instrumentArray
	for (const key in instrumentArrays) {
		playInstrument(instrumentArrays[key], step);
	}

	// length - 1 is the last index because index starts at 0
	// conditional iterating through array and resetting to 0 once done
	if (currentNote >= activeInstrument.length - 1) {
		currentNote = 0;
	} else {
		currentNote++;
	}
};
