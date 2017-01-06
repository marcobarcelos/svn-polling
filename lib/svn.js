'use strict';

const pify = require('pify-proto');
const Client = require('svn-spawn');
const arrify = require('arrify');

class Svn {
	constructor(options) {
		this.path = options.cwd;
		this.client = pify(new Client(options));
	}

	getWorkingPath() {
		return this.path;
	}

	getRemoteUrl() {
		return this.client
			.getInfo()
			.then(info => info.url);
	}

	getLogs(options) {
		const args = processOptions(options);
		
		return this.client
			.getLog(args)
			.then(processLogs)
			.then(sortLogs)
			.then(excludeOlderLogsByRevision(options.revision));
	}

	getInfo() {
		return this.client.getInfo();
	}
}

function processOptions(options) {
	let args = [];
		
	if (options.limit) {
		args = args.concat(['--limit', options.limit]);
	}

	if (options.revision) {
		args = args.concat(['--revision', `${options.revision}:HEAD`]);
	}

	if (options.verbose) {
		args.push('--verbose');
	}

	if (options.remote) {
		args.push(options.remote);
	}

	return args;
}

function processChanges(changes) {
	return arrify(changes)
		.map(change => {
			return {
				action: change.$.action,
				path: change._
			};
		});
}

function processLogs(logs) {
	return arrify(logs[0])
		.map(log => {
			return {
				revision: log.$.revision,
				author: log.author,
				date: log.date,
				msg: log.msg,
				changes: processChanges(log.paths.path)
			};
		});
}

function excludeOlderLogsByRevision(revision) {
	return (logs) => revision ? 
		logs.filter(log => log.revision > revision) :
		logs;
}

function sortLogs(logs) {
	return logs.sort((a, b) => a.revision - b.revision);
}

module.exports = Svn;