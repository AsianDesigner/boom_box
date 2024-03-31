console.log("JS file connected");

let resetBut = document.querySelector("#resetBut"),
    vinylDiscs = document.querySelectorAll(".album-container img"),
    theAudioEl = document.querySelector('#audioEl'),
	players = document.querySelectorAll('.player'),
    draggedDisc;
    initialParents = [];

vinylDiscs.forEach(disc => {
    initialParents.push(disc.parentNode);
});

function resetPlayer() {
    theAudioEl.pause();
    theAudioEl.loop = false;
    theAudioEl.currentTime = 0;

    vinylDiscs.forEach((disc, index) => {
        initialParents[index].appendChild(disc);
    });
    console.log('lets kill this beat');
}

function loadAudio() {
    let newSrc = `audio/${this.dataset.trackref}.mp3`;
    theAudioEl.src = newSrc;
    theAudioEl.load();
}

function playAudio(audio) {
        audio.play();
        audio.loop = true;
}

function handleStartDrag() { 
    console.log('record in hand:', this);
    draggedDisc = this;
}

function handleDragOver(e) { 
	e.preventDefault();
	console.log('dragged over player'); 
}

function handleDrop(e) { 
    e.preventDefault();

    if (this.children.length > 0) {
        console.log('disc already occupying!');
        return;
    }

    this.appendChild(draggedDisc);
    console.log('lets make some music!');

    const trackRef = draggedDisc.dataset.trackref;

    if (trackRef) {
        let newSrc = `audio/${trackRef}.mp3`;

        let audio = new Audio(newSrc);

        playAudio(audio);
    } else {
    console.error('Data-trackref attribute not found on the disc.');
    }
}

resetBut.addEventListener("click", function() {
    resetPlayer();
    theAudioEl.loop = false;
});

vinylDiscs.forEach(disc => disc.addEventListener("dragstart", handleStartDrag));

players.forEach(player => player.addEventListener("dragover", handleDragOver));

players.forEach(player => player.addEventListener("drop", handleDrop));