(function() {
	let canvas = document.getElementsByTagName("canvas")[0];
	let ctx = canvas.getContext('2d');
	// https://stackoverflow.com/questions/50681683/how-to-save-canvas-animation-as-gif-or-webm
	// records canvas for 10 seconds, but potato can be hindered due to lag
	startRecording();
	function startRecording() {
		let chunks = [];
		let stream = canvas.captureStream();
		let rec = new MediaRecorder(stream);
		rec.ondataavailable = e => chunks.push(e.data);
		rec.onstop = e => exportVid(new Blob(chunks, {type: 'video/webm'}));
		rec.start();
		setTimeout(function() {
			rec.stop();
		}, 10000);
	}
	function exportVid(blob) {
		let a = document.createElement('a');
		a.download = 'flagwave.webm';
		a.href = URL.createObjectURL(blob);
		a.textContent = 'Download';
		document.body.appendChild(a);
	}
})();
