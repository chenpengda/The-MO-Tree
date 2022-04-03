addLayer("t", {
    name: "思路", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#66ccff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "思路", // Name of prestige currency
    baseResource: "灵感", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.8, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {
            title: "起点",
            description: "每秒钟多获得1点灵感。",
            cost: new Decimal(5),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            tooltip: "起点",
        },
        12: {
            title: "准备",
            description: "每秒钟多获得3点灵感。",
            cost: new Decimal(20),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            tooltip: "准备",
        },
        13: {
            title: "尝试",
            description: "每秒钟获得的灵感数翻1.2倍",
            cost: new Decimal(50),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            tooltip: "尝试",
        },
        14: {
            title: "更多的尝试",
            description: "每秒钟获得的灵感数再翻1.5倍",
            cost: new Decimal(90),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            tooltip: "更多的尝试",
        },
        14: {
            title: "积累",
            description: "每秒钟获得的灵感数随思路增加",
            cost: new Decimal(90),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            tooltip: "积累",
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: 重置思路", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})