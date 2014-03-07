/*
 * literary-adjustments
 * https://github.com/sodper/literary-adjustments
 *
 * Copyright (c) 2013 Per Flitig
 * Licensed under the MIT license.
 */

'use strict';

var header_defs = ['FROM', 'TO', 'SIGNED'];

var getLines = function(message) {
		return message.split(/\n/g);
};

var isHeaderLine = function(line) {
	for (var i = 0; i < header_defs.length; i++) {
		var regex = new RegExp('^' +  header_defs[i]);
		if (regex.test(line)) {
			return true;
		}
	}
	return false;
};

var isNonHeaderLine = function(line) {
	return !isHeaderLine(line);
};

var stripHeaders = function(message) {
	if (!message) {
		return '';
	}
	var lines = getLines(message);
	var filtered_lines = lines.filter(isNonHeaderLine);
	return filtered_lines.join('\n');
};

var getHeaders = function(message) {
	if (!message) {
		return '';
	}
	var lines = getLines(message);
	var headers = lines.filter(isHeaderLine);
	return headers;
};

var sortAlgorithm = function(a, b) {
	a = a.split(':')[0];
	b = b.split(':')[0];

	if (a === b) {
		return 0;
	}

	if ((a === "FROM" && b === "TO") ||
			(a === "FROM" && b === "SIGNED") ||
			(a === "TO" && b === "SIGNED")) {
		return -1;
	}

	return 1;
};

var toUpperCase = function(str) {
	return str[0].toUpperCase() + str.substring(1);
};

var capitalizeMessage = function(message) {
	if(/^TO:\s?(MegaHard Instare)/gim.test(message)) {
		var lines = getLines(message);
		return lines.map(function(line) {
			if(/^([a-z])/i.test(line)) {
				line = toUpperCase(line);
			}
			return line;
		}).join('\n');
	}
	return message;
};

var indentMessage = function(message) {
	if(/^TO:\s?(MegaHard Instare)/gim.test(message)) {
		
	}
	return message;
};

var sortHeaders = function(input) {
	if (!input) {
		return '';
	}

	var message = capitalizeMessage(input);
	var headers = getHeaders(message);
	var body = stripHeaders(message);

	return headers
		.sort(sortAlgorithm)
		.join('\n') + '\n' + body;
};

exports.ilab = {
	sortHeaders: sortHeaders,
	stripHeaders: stripHeaders,
	getHeaders: getHeaders,
	getLines: getLines,
	isHeaderLine: isHeaderLine,
	isNonHeaderLine: isNonHeaderLine
};
