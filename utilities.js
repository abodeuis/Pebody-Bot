// Utilities.js
function fixeddelay() {
	return new Promise(resolve =>{
		setTimeout(() => {
			resolve('resolved');
		}, 100);
	})
}

function timestampToSec(timestring){
	const peices = timestring.split(':');
	var minutes = Number(peices[0]);
	var seconds = Number(peices[1]); 
	return (minutes*60 + seconds);
}

function format_duration(seconds){
	const hour = Math.floor(seconds / 3600)
	const min = (Math.floor(seconds / 60) % 60)
	const sec = Math.floor(seconds % 60)
	var output_str = ""
	if (hour > 0){
		output_str = `${hour}:`
		// Make sure minutes is a 2 digit number
		if (min < 10){  
			output_str += `0${min}:`
		}
		else {  // min is already 2 digits
			output_str += `${min}:`
		}
	}
	else { // don't care about min 2 digit formating if there no hour
		output_str += `${min}:` 
	}
	// Make sure seconds is a 2 digit number
	if (sec < 10){  
		output_str += `0${sec}`
	}
	else {  // secs is already 2 digits
		output_str += `${sec}`
	}
	return output_str
}

module.exports.fixeddelay = fixeddelay;
module.exports.timestampToSec = timestampToSec;
module.exports.format_duration = format_duration;