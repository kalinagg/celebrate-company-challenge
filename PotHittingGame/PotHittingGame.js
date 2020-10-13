export default class PotHittingGame {
    constructor() {  
        this.pot = document.querySelector('.pot');
        this.hint = document.querySelector('.hint');
        this.playground = document.querySelector('.playground');
        
        this.potWidth = this.pot.clientWidth;
        this.xPot = Math.floor(Math.random() * (500 - this.potWidth));
        this.yPot = Math.floor(Math.random() * (600 - this.potWidth));
        this.prevDistance = 0;
        this.count = 0;
    }

    init() {
        this.positionPot();        
        this.playground.addEventListener('click', event => this.handleClicks(event));        
    }

    handleClicks(event) {
        const xClick = this.getXClick(event);
        const yClick = this.getYClick(event);
        this.count++;
        
        if (this.isHit(xClick, yClick)) {
            this.showSuccessMessage();
            return;        
        }

        this.showClicks();
    
        if (this.count < 2) {
            this.prevDistance = this.getDistanceToPot(xClick, yClick);
            return;
        }

        const currDistance = this.getDistanceToPot(xClick, yClick);

        this.showHintMessage(currDistance, xClick, yClick);
    
        if (this.isHit(xClick, yClick)) {
            this.showSuccessMessage();
            return;        
        }
    
        this.prevDistance = currDistance;
    }

    positionPot(pot) {
        this.pot.style.top = `${this.yPot}px`;
        this.pot.style.left = `${this.xPot}px`;
    }

    getXClick(event) {
        return event.clientX - Math.floor(this.playground.getBoundingClientRect().left);
    }
    
    getYClick(event) {
        return event.clientY - Math.floor(this.playground.getBoundingClientRect().top);
    }

    getDistanceToPot(xClick, yClick) {
        const xDist = this.xPot - xClick;
        const yDist = this.yPot - yClick;
    
        return Math.floor(Math.sqrt((xDist * xDist) + (yDist * yDist)));
    }

    isHit(xClick, yClick) {
        const isHitX = xClick >= this.xPot && xClick <= this.xPot + this.potWidth;
        const isHitY = yClick >= this.yPot && yClick <= this.yPot + this.potWidth;
    
        return isHitX && isHitY;
    }

    showClicks() {        
        document.querySelector('.counter').innerHTML = this.count;
    }

    showHintMessage(currDistance, xClick, yClick) {
        if (this.prevDistance <= currDistance) {
            this.hint.innerHTML = '<strong>Cold!</strong>';
        } else {
            this.hint.innerHTML = '<strong>Hot!</strong>';
        }

        this.hint.style.left = `${xClick + 20}px`;
        this.hint.style.top = `${yClick + 20}px`;
    }

    showSuccessMessage() {
        document.querySelector('.success').innerHTML = `You won the game with <strong>${this.count}</strong> clicks!`;
        document.querySelector('.message').style.display = 'none';
        this.hint.style.display = 'none';
        this.playground.style.pointerEvents = 'none';
        this.pot.style.visibility = 'visible';
    }    
}