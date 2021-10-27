// Utilities.js
module.exports = {
	fixeddelay() {
		return new Promise(resolve =>{
			setTimeout(() => {
				resolve('resolved');
			}, 100);
		})
	},

	timestampToSec(timestring){
		const peices = timestring.split(':');
		var minutes = Number(peices[0]);
		var seconds = Number(peices[1]); 
		return (minutes*60 + seconds);
	}
}