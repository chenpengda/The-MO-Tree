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
            cost: new Decimal(2),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            tooltip: "准备",
        },
        13: {
            title: "尝试",
            description: "每秒钟获得的灵感数翻1.5倍",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade('t', 12) }, // The upgrade is only visible when this is true
            tooltip: "尝试",
        },
        14: {
            title: "更多的尝试",
            description: "每秒钟获得的灵感数再翻1.5倍",
            cost: new Decimal(6),
            unlocked() { return hasUpgrade('t', 12) }, // The upgrade is only visible when this is true
            tooltip: "更多的尝试",
        },
        21: {
            title: "积累",
            description: "每秒钟获得的灵感数随思路增加",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade('t', 14) }, // The upgrade is only visible when this is true
            tooltip: "积累",
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player[this.layer].points.add(1).pow(0.05) 
                if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        22: {
            title: "跃进",
            description: "重置获得的思路数随灵感增加",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade('t', 21) }, // The upgrade is only visible when this is true
            tooltip: "跃进",
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player.points.add(1).pow(0.005) 
                if (ret.gte("1e20000000")) ret = ret.sqrt().times("1e10000000")
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        23: {
            title: "入门",
            description: "解锁“高考”层",
            cost: new Decimal(80),
            unlocked() { return hasUpgrade('t', 22) }, // The upgrade is only visible when this is true
            tooltip: "入门",
        },
    },
    doReset(resettingLayer){
        let keep=[];
        if (layers[resettingLayer].row > this.row) 
        {
            layerDataReset('t', keep);
            if(resettingLayer=='g')
            {
                if(hasMilestone('g',0)) player[this.layer].upgrades = player[this.layer].upgrades.concat([11,12,13,14]);
            }
        }
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "T: 重置思路", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
addLayer("g", {
    name: "高考", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    branches:['t'],
    color: "#2f4f2f",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "知识", // Name of prestige currency
    baseResource: "思路", // Name of resource prestige is based on
    baseAmount() {return player['t'].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
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
            title: "集合",
            description: "每秒钟多获得4点灵感。",
            cost: new Decimal(3),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            tooltip: "集合",
        },
    },
    milestones:{
        0: {
            requirementDescription: "5 知识",
            effectDescription: "在知识重置时保留第一行思路升级。",
            done() { return player.g.points.gte(1) }
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
    ],
    layerShown(){return hasUpgrade('t',23) }
})