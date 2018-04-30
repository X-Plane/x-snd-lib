#!/usr/bin/env node

const { Event, Snapshot } = require('./Events');
const { Engine, Tire, Cockpit, VehXYZ } = require('./VehParts');
const Attachment = require('./Attachment');
const Section = require('./Section');
const SndFile = require('./SndFile');
const Coords = require('./Coords');
const {
	CondAlways,
	CondStart,
	CondStartDelta,
	CondStartAbsDelta,
	CondEnd,
	CondEndDelta,
	CondEndAbsDelta,
	CondCommandUp,
	CondCommandDown,
	CondCommandHoldStop,
	CondCommandHoldCue
} = require('./Conditions');

const Engine0 = new Engine(0);

let propEvent = new Attachment({
	obj: new Event('/da62/engines/prop'),
	location: Engine0,
	allowAI: true,
	idx: Engine0.getIndex(),
	conditions: [
		new CondStartDelta('sim/bla', '==', 0),
		new CondEnd('sim/bla', '>=', 1)
	],
	remark: 'Engine!'
});

let snapshotEvent = new Attachment({
	obj: new Snapshot('/in_cockpit'),
	location: new VehXYZ(new Coords(-0.2699, 0.31676, -20.8278)),
	conditions: [
		new CondCommandDown('sim/bla'),
	],
	remark: 'Bla!'
});

let mySection = new Section({
	remark: 'MY COOL SECTION',
	attachments: [
		propEvent,
		snapshotEvent
		]
	},
);

let myFile = new SndFile({
	name: 'My Cool Aircraft sound bank',
	version: '1.0.0-alpha-1',
	author: "Daniela Rodriguez <dcareri@gmail.com>",
	company: 'Bla bla design',
	contents: [
		mySection,
	]
	},
);


console.log(myFile.toString());

