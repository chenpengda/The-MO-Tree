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
        exp = new Decimal(1)
        if (hasUpgrade('t', 22)) exp = exp.times(upgradeEffect('t', 22))
        return exp
    },
    upgrades: {
        11: {
            title: "起点",
            description: "每秒钟多获得1点灵感。",
            cost: new Decimal(1),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            tooltip: "起点",
        },
        12: {
            title: "准备",
            description: "每秒钟多获得3点灵感。",
            cost: new Decimal(3),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            tooltip: "准备",
        },
        13: {
            title: "尝试",
            description: "每秒钟获得的灵感数翻2倍",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('t', 12) }, // The upgrade is only visible when this is true
            tooltip: "尝试",
        },
        14: {
            title: "更多的尝试",
            description: "每秒钟获得的灵感数再翻1.8倍",
            cost: new Decimal(8),
            unlocked() { return hasUpgrade('t', 12) }, // The upgrade is only visible when this is true
            tooltip: "更多的尝试",
        },
        21: {
            title: "积累",
            description: "每秒钟获得的灵感数随思路增加",
            cost: new Decimal(20),
            unlocked() { return hasUpgrade('t', 14) }, // The upgrade is only visible when this is true
            tooltip: "积累",
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player[this.layer].points.add(1).pow(0.15) 
                if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        22: {
            title: "跃进",
            description: "重置获得的思路数随灵感增加",
            cost: new Decimal(50),
            unlocked() { return hasUpgrade('t', 21) }, // The upgrade is only visible when this is true
            tooltip: "跃进",
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player[this.layer].points.add(1).pow(0.05) 
                if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        23: {
            title: "入门",
            description: "解锁“一试”层",
            cost: new Decimal(80),
            unlocked() { return hasUpgrade('t', 22) }, // The upgrade is only visible when this is true
            tooltip: "入门",
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: 重置思路", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
addLayer("y", {
    name: "一试", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Y", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches:['t'],
    requires: ()=>{return !hasAchievement('a',31)&&hasMilestone('c',0)&&!hasMilestone('r',1)?new Decimal(1e5):new Decimal(2000)},
    color: "#2f4f2f",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "完成的题目", // Name of prestige currency
    baseResource: "思路", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    upgrades: {
        11: {
            title: "起点",
            description: "每秒钟多获得1点灵感。",
            cost: new Decimal(1),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            tooltip: "起点",
        },
        
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: 重置思路", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})