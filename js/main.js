console.log("JS file connected");

let resetBut = document.querySelector("#resetBut"),
    vinylDiscs = document.querySelectorAll(".album-container img"),
	players = document.querySelectorAll('.player'),
    draggedDisc;
    initialParents = [];

vinylDiscs.forEach(disc => {
    initialParents.push(disc.parentNode);
});

function resetPlayer() {
    vinylDiscs.forEach((disc, index) => {
        initialParents[index].appendChild(disc);
    });
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
	console.log('lets make some music!');

	if (this.children.length > 0) {
        console.log('disc already occupying!');
        return;
    }

	this.appendChild(draggedDisc);
}

resetBut.addEventListener("click", resetPlayer);

vinylDiscs.forEach(disc => disc.addEventListener("dragstart", handleStartDrag));

players.forEach(player => player.addEventListener("dragover", handleDragOver));

players.forEach(player => player.addEventListener("drop", handleDrop));