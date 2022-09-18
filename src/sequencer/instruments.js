import * as Tone from 'tone';
import bassDrum from '../assets/LINN/kick.wav';
import highHat from '../assets/LINN/hh.wav';
import snareDrum from '../assets/LINN/snare.wav';

export const instruments = {
	synthOne: new Tone.Synth().toDestination(),
	synthTwo: new Tone.PluckSynth().toDestination(),
	synthThree: new Tone.FMSynth().toDestination(),
	bassDrum: new Tone.Player(bassDrum).toDestination(),
	snareDrum: new Tone.Player(snareDrum).toDestination(),
	highHat: new Tone.Player(highHat).toDestination(),
};

// data representation of the sequencer
export const instrumentArrays = {
	bassDrumArray: [],
	snareDrumArray: [],
	highHatArray: [],
	synthOneArray: [],
	synthTwoArray: [],
	synthThreeArray: [],
};
