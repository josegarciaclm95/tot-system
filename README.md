# Tot system
Two-level multimodal system to detect emotions.

You can read the code documentation [here](https://josegarciaclm95.github.io/tot-system/docs/v1/)


## About the API
The core of the API is inside the `routes/vX` folders. Each `vX` folder (`v1`, `v2`, `v3`, etc.) contains an `api.js` file and a `src` folder. The `api.js` file contains the handlers of each endpoint:

* `/init`
	* `GET`. Reads configuration from `credentials.json `, initialize each emotion detector and performs a benchmarking task to test the state of the network and the detectors. See [DetectorHandler.prototype.addDetector](#DetectorHandler.prototype.addDetector)
* `/setup`
	* `POST`. This endpoint gives you another opportunity to customize the services to use. For instance, during the initialization in `/init` a benchmarking process is carried out. This process sets the value of the attributes `realTime` (boolean attribute which indicates if the service answers in real time) and `delay` (how many miliseconds does the service take to answer). `/setup` receives, in the request body, up to 3 parameters.
		* `type`: detector types array you want to keep. Detector categories contained in this array will be deleted.
		* `realTime`: boolean attribute representing the `realTime` attribute. Only detectors with a matching value of it will be kept.
		* `delay`: response time threshold. Detectors whose delay attribute is bigger than the one in the `/setup` request will be deleted. 
* `/analyse`
	* `POST`. Endpoint used to analyse media files. The request contains the path pointing to the file which holds the affective information, the type of information holded in that file and the kind of information that the API must look for. 
		* `mediaType`: Kind of media which will be sent. Options can be "image", "video", "sound" and "text".
		* `lookingFor`: Feature we want to analyse. Options can be "face", "voice", "signal" and "body".
		* `mediaPath`: Path pointing to the file that must be analysed. This path can be either local or remote. Each detector must handle this path according to its characteristics.

	**IMPORTANT. THIS ENDPOINT DOESN'T RETURN THE AFFECTIVE OUTPUT RESULTING FROM ANALYSING SOME FILE. IN ORDER TO RETRIEVE THAT DATA, THE `/results` MUST BE USED.**
* `/results`
  * `GET`. This endpoint retrieves all the results in PAD form. This include each individual result and the fusion of all the results.
* `/results/:channel`
  * `GET`. This endpoint retrieves all the results in PAD form of a single channel. This include each individual result and the fusion of all the results in that channel. Channels are defined by the different category values in the `credentials.json` file.
* `/results-raw`
  * `GET`. As `/results`, but returns the results as they are produced by each detector in their own format. Since formats may not be compatible, fusion is not carried out.
* `/results-raw/:channel`. 
  *  `GET`. As in `/results-raw`, but just for one channel.

## Lanching the API

Lanching the API is quite simple. Once you've downloaded the repository, just run a

```
npm install
```
to install the node modules required and then a 
```
npm start
```
to start the API. As a express app, it runs on port 3000, but you can change this easily at the `www` file in `/bin/`. 
The root of the request will be always `/api/vX/`, being `X` the number of the version you want to use. For example, if you want to use `v1`, an `init` request would have `http://localhost:3000/api/v1/init` as `url`.

So, after starting the service, we just have to make an `init` request.

```
GET `http://localhost:3000/api/v1/init`
```

This method will read the `credentials.json` file, initialise each detector stated in that file and perform a benchmark task for each one. This task consists of, for each detector, analyse every file contained in its corresponding `benchmark-files`	and calculate an average response time, saved in the `delay` attribute of the detector.

At this point, the Tot system is ready to work. You're free to send requests to the `/analyse` and `/results` endpoints.

Additionally, you could send a `/setup` request to filter the slowest detectors, for instance, or to change the type of detectors you want to use. 
# Documentation

## `src/core.js`

### createDetector

### DetectorHandler

#### DetectorHandler.prototype.addDetector

#### DetectorHandler.prototype.analyseMedia

#### DetectorHandler.prototype.quitCategory

#### DetectorHandler.prototype.filter

#### DetectorHandler.prototype.getChannelResults

#### DetectorHandler.prototype.getDetectors

#### DetectorHandler.prototype.mergeResults

## `src/detectors/detector.js`

### Detector

#### Detector.prototype.initialize

#### Detector.prototype.extractEmotions

#### Detector.prototype.translateToPAD

#### Detector.prototype.addResults

#### Detector.prototype.cleanResults

#### Detector.prototype.getResults

## `src/detectors/channel-example`

### `src/detectors/channel-example/benchmark-files`

### `src/detectors/channel-example/example.js`

#### module.exports.initialize

#### module.exports.extractEmotions

#### module.exports.translateToPAD

# Appendix

## credentials.json sample file
`credentials.json.sample`
```json
	{
		"detector-name-that-will-become-the-id": {
			"category": "face/voice/body/eda/...",
			"media": [ "types", "of", "media", "the service", "accepts", "for", "analysis", "such us", "image", "video", "text", "sound", "..." ],
			"realTime": boolean,
			"url": "https://endpoint-of-the-service-if-any",
			"otherOptions": {
				"key": "you may add all the data/optios you need in the otherOptions object"
			},
			"callbacks": "./route/to/the/file/where/the/callbacks/are/defined.js"
		}
	}
```







