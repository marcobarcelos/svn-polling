'use strict';

const EventEmitter = require('events');
const storage = require('node-persist');
const Svn = require('./svn');
const defaultOptions = require('./default-options');

class SvnPolling extends EventEmitter {
	constructor(options) {
		super();
		this.options = Object.assign({}, defaultOptions, options);
		this.svn = new Svn(this.options);
	}

	start() {
		return storage.init()
			.then(() => this.fetch())
			.then(() => setTimeout(() => this.start(), this.options.pollInterval))
			.catch(err => console.error(err));
	}

	fetch() {
		return this.getLastCheckedRevision()
			.then(getLogsFromSvn.bind(this))
			.then(emitDataEvent.bind(this))
			.catch(err => console.error(err));
	}

	getLastCheckedRevision() {
		return storage.getItem(this.options.remoteUrl);
	}
}

function getLogsFromSvn(revision) {
	const options = {
		verbose: true,
		remote: this.options.remoteUrl,
		revision
	};

	if (typeof revision === 'undefined') {
		options.limit = this.options.logsLimit;
	}

	return this.svn.getLogs(options);
}

function emitDataEvent(logs) {
	if (!logs.length) {
		return;
	}

	const revision = Math.max.apply(Math, logs.map(log => log.revision));

	this.emit('data', {
		revision,
		logs
	});

	return storage.setItem(this.options.remoteUrl, revision);
}

module.exports = SvnPolling;
