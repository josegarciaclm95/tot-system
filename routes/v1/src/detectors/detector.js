/**
 * Abstract Detector function. It defines the common prototype
 * for future detectors
 * @function Detector
 * @param {string} id - Id of the detector. This id would be use in
 * HTTP request.
 * @param {string} category - Category of the detector. Values can be
 * 'face', 'voice','body', 'physio' and 'others'.
 * @param {boolean} realTime - Boolean indicating if the API works in realTime.
 * @param {string} url - Url to which the request will be sent.
 * @param {Object} otherOptions - Other options, such as API keys, and so on.
 */
function Detector( id, category, realTime, url, otherOptions ) {
	this.id = id;
	this.category = category;
	this.realTime = realTime;
	this.url = url;
	this.otherOptions = otherOptions;
	console.log( 'Detector called' );
}

/** @function analyse
 *  @param {Object} media - Media to analyse. This media will be sent
 * to the Detector's API
 */
Detector.prototype.extractEmotions = function( media ) {
	console.log( 'extractEmotions method in Detector class' );
};

Detector.prototype.translateToPAD = function( results ) {
	console.log( 'Translate method in Detector class' );
};

module.exports.Detector = Detector;
