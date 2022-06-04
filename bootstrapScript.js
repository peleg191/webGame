let myOffcanvas = document.getElementById('sideMenu');
initTooltips();
function initTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}
var menuOpen = false;
function menuClicked(e) {
    addSumLocalStorage('money', incomingMoneyTransaction);
    incomingMoneyTransaction = 0;
    menuOpen = true;
}
myOffcanvas.addEventListener('hidden.bs.offcanvas', event => {
    menuOpen = false;
})
function buildSkillBar(elementId, number, gap) {
    let element = document.getElementById(elementId);
    element.innerHTML='';
    element.chi
    for (let i = number; i > 0; i = i - gap) {
        let image = document.createElement('img');
        image.src = './assets/skillBar.svg';
        element.append(image);
    }
}
function onClickUpgradeSkill(skill, priceId){
    debugger;
    let spent = document.getElementById(priceId).textContent;
    let hasEnoughMoney = spendMoney(spent);
    if(!hasEnoughMoney)
        return;
    upgradeSkill(skill);
}