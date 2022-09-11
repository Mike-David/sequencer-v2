const instruments = {
    synthOne: new Tone.Synth().toDestination(),
    synthTwo: new Tone.PluckSynth().toDestination(),
    synthThree: new Tone.FMSynth().toDestination(),
    bassDrum: new Tone.Player("./assets/LINN/kick.wav").toDestination(),
    snareDrum: new Tone.Player("./assets/LINN/snare.wav").toDestination(),
    highHat: new Tone.Player("./assets/LINN/hh.wav").toDestination(),
}

//store the last note user clicked 
let activeNote;

//sliders
let volume = document.getElementById('volume');
let length = document.getElementById('length');
let noteValue = document.getElementById('note');

let sliderLengths = ['16n', '8n', '4n', '1n']
let sliderNotes = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4']


//data structure that represents the synth 
//data representation of the sequencer 

// creating a new array of html checkbocs by getting it by classname 
let checkBoxes = Array.from(document.getElementsByClassName('sequence'));

const instrumentArrays = {
    bassDrumArray: [],
    snareDrumArray: [],
    highHatArray: [],
    synthOneArray: [],
    synthTwoArray: [],
    synthThreeArray: [],
}

//destructuring to reference each instrument of the instrumentArrays object 
const { bassDrumArray, snareDrumArray, highHatArray, synthOneArray, synthTwoArray, synthThreeArray } = instrumentArrays

//iterate through data - Array
// hook this Array up to the instrument
let buildSequencer = []

let activeInstrument = bassDrumArray;

for (let i = 0; i < checkBoxes.length; i++) {

    bassDrumArray.push({
        checked: false,
        instrument: 'bassDrum',
        type: 'sampler',
        length: '8n',
        volume: 10
    })

    snareDrumArray.push({
        checked: false,
        instrument: 'snareDrum',
        type: 'sampler',
        length: '8n',
        volume: 10
    })

    highHatArray.push({
        checked: false,
        instrument: 'highHat',
        type: 'sampler',
        length: '8n',
        volume: 10
    })

    synthOneArray.push({
        checked: false,
        instrument: 'synthOne',
        type: 'synth',
        note: 'F4',
        length: '8n',
        volume: 10
    })

    synthTwoArray.push({
        checked: false,
        instrument: 'synthTwo',
        type: 'synth',
        note: 'F4',
        length: '8n',
        volume: 10
    })

    synthThreeArray.push({
        checked: false,
        instrument: 'synthThree',
        type: 'synth',
        note: 'F4',
        length: '8n',
        volume: 10
    })
}


// set current value of note to index of 0 so that we can iterate through this Array 
// once it reaches the end, it resets index to 0 and begins at the 1st Object in the Array 
let currentNote = 0;

//setTimne takes a callback and an interval, 
let playNote = (step) => {
    let note = activeInstrument[step];
    console.log(step)
    // console.log(note)

    const playInstrument = (instrument, step) => {
        let note = instrument[step];
        // if not checked return (dont wanna do anything really unless true)
        if (note.checked === false) return;
        // sending note information to the synth to play it 
        if (note.type === 'synth') {
            console.log(instruments[note.instrument], note.instrument);
            instruments[note.instrument].triggerAttackRelease(note.note, note.length)
        } else {
            instruments[note.instrument].start()
        }
    }
    //on each iteration key is equal to a key name from Instruments Arrays
    //use key name to access properties in the instrumentArray
    for (const key in instrumentArrays) {
        playInstrument(instrumentArrays[key], step)
    }

    // length - 1 is the last index because index starts at 0 
    // conditional iterating through array and resetting to 0 once done
    if (currentNote >= activeInstrument.length - 1) {
        currentNote = 0;
    } else {
        currentNote++;
    }
}

//using forEach method to iterate through each input (check box) and add an action (on change) - and once they are changed grab assigned  value 
//to the input so that we can compare the array index to the value of checked or unchecked inputs
checkBoxes.forEach((e) => {
    e.addEventListener('change', (e) => {
        let index = Number(e.target.dataset.note);
        //returns whole array
        let notes = activeInstrument[index];
        activeNote = notes

        volume.value = activeNote.volume
        length.value = `${sliderLengths.indexOf(activeNote.length)}`
        noteValue.value = `${sliderNotes.indexOf(activeNote.note)}`

        // flip booleon in this case instead of assigning the opposite as new variable - toggle switch 
        // for example - notes.checked = false // !notes.checked = true;
        notes.checked = !notes.checked;
    })
})


let playButton;

// we are just adding event on click - (play sequence)
document.getElementById('play').addEventListener('click', () => {
    //Setinterval returns a number 
    if (!playButton) {
        playButton = setInterval(() => playNote(currentNote), 200);
    } else {
        clearInterval(playButton);
        playButton = undefined;
    }
})

let clearButton = document.getElementById('clear').addEventListener('click', () => {
    checkBoxes.forEach((e) => {
        e.checked = false;
    })

    activeInstrument.forEach((e) => {
        e.checked = false;
    })
});

let changeInstrument = Array.from(document.getElementsByClassName('instrument'));


changeInstrument.forEach((e) => {
    e.addEventListener('click', (e) => {
        activeInstrument = instrumentArrays[e.target.id];
        console.log('CHECKED ******', checkBoxes)
        checkBoxes.forEach((o, i) => {
            console.log('**IIIIIIIII**', i)
            o.checked = activeInstrument[i].checked;
        })

    })
})










