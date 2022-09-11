volume.addEventListener('change', e => {
    activeNote.volume = e.target.value;
})

length.addEventListener('change', e => {
    console.log('okgvdfksjhbvjfs');

    // Converting from a string (i.e. "3") to an integer
    activeNote.length = sliderLengths[parseInt(e.target.value)]
    console.log(activeNote);
})

noteValue.addEventListener('change', e => {
    console.log('NOTE', e.target.value);
    activeNote.note = sliderNotes[parseInt(e.target.value)]
    console.log(activeNote)
}) 