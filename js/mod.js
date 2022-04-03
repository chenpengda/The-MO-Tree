let modInfo = {
	name: "The MO tree",
	id: "343434666",
	author: "xks",
	pointsName: "灵感",
	modFiles: ["layers.js", "tree.js"],

	discordName: "luogu",
	discordLink: "https://www.luogu.com.cn/",
	initialStartPoints: new Decimal (11.4), // Used for hard resets and new players 硬重置时获得的点数
	offlineLimit: 3.4,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "啥都不是",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- xks akioi<br>
		- Added stuff.`

let winText = `恭喜您完成了整个游戏，但是现在……`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if(hasUpgrade('t',11)) gain=gain.add(1)
	if(hasUpgrade('t',12)) gain=gain.add(3)
	if(hasUpgrade('t',13)) gain=gain.times(2)
	if(hasUpgrade('t',14)) gain=gain.times(1.8)
	if(hasUpgrade('t',21)) gain=gain.times(upgradeEffect('t',21))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"The MO tree"
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}