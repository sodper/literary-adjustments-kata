/* jshint expr:true, multistr:true */

'use strict';

var ilab = require('../lib/literary-adjustments.js').ilab;
var expect = require('chai').expect;

describe('ILAB', function() {
	it('should have function sortHeaders', function() {
		expect(ilab.sortHeaders).to.exist;
	});

	it('should have function stripHeaders', function() {
		expect(ilab.stripHeaders).to.exist;
	});

	it('should have function getHeaders', function() {
		expect(ilab.getHeaders).to.exist;
	});

	it('should have function getLines', function() {
		expect(ilab.getLines).to.exist;
	});

	describe('getLines', function() {
		it('should return array with empty string on empty input', function() {
			expect(ilab.getLines('')).to.eql(['']);
		});

		it('should return all lines in string as array', function() {
			expect(ilab.getLines('a\nb')).to.eql(['a','b']);
		});
	});

	describe('getHeaders', function() {
		it('should return empty string with empty message', function() {
			expect(ilab.getHeaders('')).to.be.empty;
		});

		it('should return only headers', function() {
			expect(ilab.getHeaders(
'SIGNED:1st Colony Manager\n\
TO:President of Earth\n\
FROM:1st Human Colony on Venus\n\
...')).to.eql([
			'SIGNED:1st Colony Manager',
			'TO:President of Earth',
			'FROM:1st Human Colony on Venus'
			]);
		});
	});

	describe('stripHeaders', function() {
		it('should return empty string with empty message', function() {
			expect(ilab.stripHeaders('')).to.be.empty;
		});

		it('should return message without headers', function() {
			expect(ilab.stripHeaders(
'SIGNED:1st Colony Manager\n\
TO:President of Earth\n\
FROM:1st Human Colony on Venus\n\
...')).to.equal('...');
		});
	});

	describe('sortHeaders', function() {
		it('should return empty string with no input', function() {
			expect(ilab.sortHeaders('')).to.be.empty;
		});

		it('should sort headers in order FROM, TO, SIGNED', function() {
			expect(ilab.sortHeaders(
'SIGNED:1st Colony Manager\n\
TO:President of Earth\n\
FROM:1st Human Colony on Venus\n\
...')).to.equal(
'FROM:1st Human Colony on Venus\n\
TO:President of Earth\n\
SIGNED:1st Colony Manager\n\
...');
			expect(ilab.sortHeaders(
'TO:President of Earth\n\
SIGNED:1st Colony Manager\n\
FROM:1st Human Colony on Venus\n\
...')).to.equal(
'FROM:1st Human Colony on Venus\n\
TO:President of Earth\n\
SIGNED:1st Colony Manager\n\
...');
			expect(ilab.sortHeaders(
'SIGNED:1st Colony Manager\n\
FROM:1st Human Colony on Venus\n\
TO:President of Earth\n\
...')).to.equal(
'FROM:1st Human Colony on Venus\n\
TO:President of Earth\n\
SIGNED:1st Colony Manager\n\
...');
		});

		it('should capitalize first letter after newlines for messages to MegaHard InStare', function() {
				expect(ilab.sortHeaders(
'FROM:Lunix Fun-dation\n\
TO:Megahard InStare\n\
SIGNED:Master of Fun-emony\n\
We have our annual fun-day\n\
the 24th of November. We \n\
hope you can come over.\n\
This would be most graceful.')).to.equal(
'FROM:Lunix Fun-dation\n\
TO:Megahard InStare\n\
SIGNED:Master of Fun-emony\n\
We have our annual fun-day\n\
The 24th of November. We \n\
Hope you can come over.\n\
This would be most graceful.');
				expect(ilab.sortHeaders(
'FROM:Lunix Fun-dation\n\
TO:megahard instare\n\
SIGNED:Master of Fun-emony\n\
We have our annual fun-day\n\
the 24th of November. We \n\
hope you can come over.\n\
This would be most graceful.')).to.equal(
'FROM:Lunix Fun-dation\n\
TO:megahard instare\n\
SIGNED:Master of Fun-emony\n\
We have our annual fun-day\n\
The 24th of November. We \n\
Hope you can come over.\n\
This would be most graceful.');
				expect(ilab.sortHeaders(
'FROM:Lunix Fun-dation\n\
TO:Megahard instare\n\
SIGNED:Master of Fun-emony\n\
We have our annual fun-day\n\
the 24th of November. We \n\
hope you can come over.\n\
This would be most graceful.')).to.equal(
'FROM:Lunix Fun-dation\n\
TO:Megahard instare\n\
SIGNED:Master of Fun-emony\n\
We have our annual fun-day\n\
The 24th of November. We \n\
Hope you can come over.\n\
This would be most graceful.');
		});

		it('should indent newlines for messages to MegaHard InStare', function() {
			expect(ilab.sortHeaders(
'FROM:Lunix Fun-dation\n\
TO:Megahard InStare\n\
SIGNED:Master of Fun-emony\n\
We have our annual fun-day\n\
the 24th of November. We \n\
hope you can come over.\n\
This would be most graceful.')).to.equal(
'FROM:Lunix Fun-dation\n\
TO:Megahard InStare\n\
SIGNED:Master of Fun-emony\n\
We have our annual fun-day\n\
The 24th of November. We \n\
Hope you can come over.\n\
  This would be most graceful.');
		});
	});
});
