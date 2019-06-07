const Logger = {};

function getLoggerForStatusCode(statusCode) {
	if (statusCode >= 500) return console.error.bind(console)
	if (statusCode >= 400) return console.warn.bind(console)
	return console.info.bind(console)
}
  
Logger.logRequestStart = function logRequestStart(req, res, next){
	const cleanup = () => {
	  res.removeListener('finish', logFn)
	  res.removeListener('close', abortFn)
	  res.removeListener('error', errorFn)
	}
  
	const logFn = () => {
	  	if(res.statusCode !== 304) {
			cleanup()
			const startHrTime = process.hrtime();
			const elapsedHrTime = process.hrtime(startHrTime);
			const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
			
			const logger = getLoggerForStatusCode(res.statusCode)

			logger(`Timing: ${elapsedTimeInMs}ms\nDate-Time: [${new Date().toISOString()}]\nIP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}\nHTTP Method: ${req.method}\nURL: ${req.originalUrl}\nRequest: ${JSON.stringify(req.body)}\nResponse: ${JSON.stringify(res.body)}\nUser agent: ${req.headers['user-agent']}\nStatus Code: ${res.statusCode}\nStatus Message: ${res.statusMessage}\nContent Size: ${res.get('Content-Length') || 0}b sent`)
	  	}
	}
  
	const abortFn = () => cleanup() || console.warn('Request aborted by the client')
  
	const errorFn = err => cleanup() || console.error(`Request pipeline error: ${err}`)

  
	res.on('finish', logFn)
	res.on('close', abortFn)
	res.on('error', errorFn)
  
	next()
}
  

module.exports = Logger