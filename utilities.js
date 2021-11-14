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
	console.log(peices)
	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	if (peices > 3){
		console.log(`To many args in timestamp`)
	} else if (peices.length == 3){
		hours = Number(peices[0])
		minutes = Number(peices[1]);
		seconds = Number(peices[2]);
	} else if (peices.length == 2){
		minutes = Number(peices[0]);
		seconds = Number(peices[1]);
	} else if (peices.length == 1 ){
		seconds = Number(peices[0]);
	}
	
	return (hours*3600 + minutes*60 + seconds);
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