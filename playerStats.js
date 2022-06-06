//TODO : refactor, using enums of skills , without strings.
//TODO : reset skills button, that gives you your money back. 
//TODO : bosses, have a life bar, gives  a lot of money. can kill you.
var playerStats = {};
let skills = { speed: 'speed', missileSpeed: 'missileSpeed', dash: 'dash', missiles: 'missiles' };
let gapsBySkills = { speed: 1, missileSpeed: 5, dash: 0.2, missiles: 1 };
let moneyElement = document.getElementById('money');
let defaultPlayerStats = {
    speed: 5, missileSpeed: 10, missiles: 1, money: 0, dash: 1,
    moneyToUpgrade: { speed: 10, missileSpeed: 10, missiles: 10, dash: 10 },
    moneySpent: 0
};
function evaluatePlayerStats() {
    let result = getLocalStorage('data');
    if (!result) {
        setLocalStorage('data', JSON.stringify(defaultPlayerStats));
        result = defaultPlayerStats;
    }
    playerStats = result;
    renderMoneyStatus();
}
function renderMoneyStatus() {
    moneyElement.textContent = playerStats.money;
}
function renderSkillDisplay(skill) {
    if (!skill) {
        buildSkillBar('speed-skill', playerStats.speed, gapsBySkills.speed);
        buildMoneyToUpgradeInit(skills.speed, 'money-upgrade-speed-skill');
        buildSkillBar('missile-speed-skill', playerStats.missileSpeed, gapsBySkills.missileSpeed);
        buildMoneyToUpgradeInit(skills.missileSpeed, 'money-upgrade-missile-speed-skill');
        buildSkillBar('dash-skill', playerStats.dash * 10, gapsBySkills.dash * 10);
        buildMoneyToUpgradeInit(skills.dash, 'money-upgrade-dash-skill');
        buildSkillBar('missile-skill', playerStats.missiles, gapsBySkills.missiles);
        buildMoneyToUpgradeInit(skills.missiles, 'money-upgrade-missile-skill');
        return;
    }
    switch (skill) {
        case 'speed':
            buildSkillBar('speed-skill', playerStats.speed, gapsBySkills.speed);
            buildMoneyToUpgrade('speed', 'money-upgrade-speed-skill', 1.5);
            break;
        case 'missileSpeed':
            buildSkillBar('missile-speed-skill', playerStats.missileSpeed, gapsBySkills.missileSpeed);
            buildMoneyToUpgrade('missileSpeed', 'money-upgrade-missile-speed-skill', 1.5);
            break;
        case 'dash':
            buildSkillBar('dash-skill', playerStats.dash * 10, gapsBySkills.dash * 10);
            buildMoneyToUpgrade('dash', 'money-upgrade-dash-skill', 1.5);
            break;
        case 'missiles':
            buildSkillBar('missile-skill', playerStats.missiles, gapsBySkills.missiles);
            buildMoneyToUpgrade('missiles', 'money-upgrade-missile-skill', 4);
            break;
    }
}
function buildMoneyToUpgradeInit(skill, id) {
    let element = document.getElementById(id);
    let data = getLocalStorage('data');
    let result = data.moneyToUpgrade[skill];
    element.textContent = result;
}
function buildMoneyToUpgrade(skill, id, factor) {
    let element = document.getElementById(id);
    let data = getLocalStorage('data');
    let result = Math.floor(data.moneyToUpgrade[skill] * factor);
    data.moneyToUpgrade[skill] = result;
    element.textContent = result;
    registerData(data);
}
function registerData(data) {
    setLocalStorage('data', JSON.stringify(data));
    evaluatePlayerStats();
}
function addSumLocalStorage(name, sum) {
    let data = getLocalStorage('data');
    data[name] += sum;
    registerData(data);
}
function upgradeSkill(skillName) {
    let data = getLocalStorage('data');
    data[skillName] += gapsBySkills[skillName];
    registerData(data);
    renderSkillDisplay(skillName);
}
function spendMoney(spent) {
    spent = parseInt(spent);
    let sum = playerStats.money - spent;
    if (sum < 0)
        return false;
    playerStats.money = sum;
    let data = getLocalStorage('data');
    data.money = playerStats.money;
    data.moneySpent = data.moneySpent +  spent;
    registerData(data);
    return true;
}
function resetSkills() {
    //TODO: return money invested in skills.
    debugger;
    let data = getLocalStorage('data');
    let currentMoney= data.money;
    resetLocalStorage();
    let moneySpent = data.moneySpent;
    data = defaultPlayerStats;
    data.money = currentMoney +moneySpent;
    registerData(data);
    window.location.reload();
}
