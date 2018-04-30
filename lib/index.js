module.exports = Object.assign(
	{
		Attachment: require('./Attachment'),
		SoundSpace: require('./SoundSpace'),
		Separator: require('./Separator'),
		SndFile: require('./SndFile'),
		Coords: require('./Coords')
	},
	require('./Events'),
	require('./VehParts'),
	require('./Spaces'),
	require('./Conditions'),
	require('./helpers')
);