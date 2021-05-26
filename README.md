# X-SND-LIB

A library to programmatically generate X-Plane SND files from Javascript.

## Why

Because a) the [X-Plane SND format](https://developer.x-plane.com/article/sound-snd-file-format-specification/) is very verbose and b) while making sounds for an aircraft you will repeat yourself many, many times. This library aims to provide a chainable API so you can build sound files by leveraging the Javascript programming language to build macros, iterate thru arrays, repeat common constructs, etc.

Thus:

```javascript
// A "macro" for a pushbutton activated by a command
function genPushButtonCmd(name, cmd, x, y, z, remark) {
	return Event(`/${name}`, remark)
            .pos(x, y, z)
            .commandDown(`${cmd}`)
            .commandCue(`${cmd}`)
}

// A function that returns a series of sound attachments
function switchesGroup() {

	let directives = [

		Separator(`GCU478`),

		[].concat('direct|menu|fpl|proc|clr|ent|com|crs_sync|nav|xpdr|minus|bksp|dot|spc|fms'.split('|'))
			.concat('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
			.map(key => {
				return genPushButtonCmd('pushbutton_hold',
					`sim/GPS/gcu478/${key}`, pos.x, pos.y, pos.z, `CGU key ${key}`)
			}),

                ///...
	];

	return Group(directives.flat()).setNamespace(`my_aircraft/buttons`);
}

console.log(switchesGroup().toString());
```

Becomes:

```

# GCU478 
#############################################################################################

# -------------------- CGU key direct ---------------------
BEGIN_SOUND_ATTACHMENT
	EVENT_NAME /my_aircraft/buttons/pushbutton_hold
	VEH_XYZ -0.011 0.085 -2.535
	EVENT_CMND_HOLD_CUE sim/GPS/gcu478/direct
END_SOUND_ATTACHMENT

# -------------------- CGU key menu ---------------------
BEGIN_SOUND_ATTACHMENT
	EVENT_NAME /my_aircraft/buttons/pushbutton_hold
	VEH_XYZ -0.011 0.085 -2.535
	EVENT_CMND_HOLD_CUE sim/GPS/gcu478/menu
END_SOUND_ATTACHMENT

# -------------------- CGU key fpl ---------------------
BEGIN_SOUND_ATTACHMENT
	EVENT_NAME /my_aircraft/buttons/pushbutton_hold
	VEH_XYZ -0.011 0.085 -2.535
	EVENT_CMND_HOLD_CUE sim/GPS/gcu478/fpl
END_SOUND_ATTACHMENT

# -------------------- CGU key proc ---------------------
BEGIN_SOUND_ATTACHMENT
	EVENT_NAME /my_aircraft/buttons/pushbutton_hold
	VEH_XYZ -0.011 0.085 -2.535
	EVENT_CMND_HOLD_CUE sim/GPS/gcu478/proc
END_SOUND_ATTACHMENT

#... and about 300 lines more

```

## Install

`npm install X-Plane/x-snd-lib`

## Usage

(to-do)

