	(function() {
		let canvas = document.getElementsByTagName("canvas")[0];
		let ctx = canvas.getContext('2d');
		// https://stackoverflow.com/questions/50681683/how-to-save-canvas-animation-as-gif-or-webm
		// records canvas for 10 seconds, but potato can be hindered due to lag
    // only needs to be included in index.html to work, I'm pretty sure
    // maybe some window.onload things need to happen as well
		startRecording();
		function startRecording() {
			let chunks = [];
			let stream = canvas.captureStream();
			let rec = new MediaRecorder(stream);
			rec.ondataavailable = function(e) {
				chunks.push(e.data);
			}
			rec.onstop = function(e) {
				let a = document.createElement('a');
				a.download = 'flagwave.webm';
				a.href = URL.createObjectURL(new Blob(chunks, {type: 'video/webm'}));
				a.innerHTML = 'Download';
				a.style = "position: absolute; left: 10px; top: 100px; font-family: 20px monospace";
				document.body.appendChild(a);
			}
			rec.start();
			setTimeout(function() {
				rec.stop();
			}, 10000);
		}
	})();
