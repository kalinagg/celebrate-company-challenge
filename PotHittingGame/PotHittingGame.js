export default class PotHittingGame {
    constructor() {  
        this.pot = document.querySelector('.pot');
        this.hint = document.querySelector('.hint');
        this.playground = document.querySelector('.playground');
        this.counter = document.querySelector('.counter');
        this.success = document.querySelector('.success');
        this.message = document.querySelector('.message');
        
        this.potWidth = this.pot.clientWidth;
        this.xPot = Math.floor(Math.random() * (500 - this.potWidth));
        this.yPot = Math.floor(Math.random() * (600 - this.potWidth));
        this.prevDistance = 0;
        this.count = 0;
        this.isPotHit = false;
    }

    init() {
        this.positionPot();                
        this.playground.addEventListener('click', event => this.handleClicks(event));        
    }

    handleClicks(event) {
        if (this.isPotHit) return;

        const clickCoords = this.getClickCoordinates(event);
        this.count++;
        
        if (this.isHit(clickCoords)) {
            this.isPotHit = true;
            this.showSuccessMessage();
            return;        
        }

        this.showClicks();
    
        if (this.count < 2) {
            this.prevDistance = this.getDistanceToPot(clickCoords);
            return;
        }

        const currDistance = this.getDistanceToPot(clickCoords);

        this.showHintMessage(currDistance, clickCoords);
    
        if (this.isHit(clickCoords)) {
            this.isPotHit = true;
            this.showSuccessMessage();
            return;  
        }
    
        this.prevDistance = currDistance;
    }

    positionPot(pot) {
        this.pot.style.top = `${this.yPot}px`;
        this.pot.style.left = `${this.xPot}px`;
    }    

    getClickCoordinates(event) {
        return {
            x: event.clientX - Math.floor(this.playground.getBoundingClientRect().left),
            y: event.clientY - Math.floor(this.playground.getBoundingClientRect().top)
        }
    }

    getDistanceToPot({x, y}) {
        const xDist = this.xPot - x;
        const yDist = this.yPot - y;
    
        return Math.floor(Math.sqrt((xDist * xDist) + (yDist * yDist)));
    }

    isHit({x, y}) {
        const isHitX = x >= this.xPot && x <= this.xPot + this.potWidth;
        const isHitY = y >= this.yPot && y <= this.yPot + this.potWidth;
    
        return isHitX && isHitY;
    }

    showClicks() {        
        this.counter.innerHTML = this.count;
    }

    showHintMessage(currDistance, {x, y}) {
        if (this.prevDistance <= currDistance) {
            this.hint.innerHTML = '<strong>Cold!</strong>';
        } else {
            this.hint.innerHTML = '<strong>Hot!</strong>';
        }

        this.hint.style.left = `${x + 20}px`;
        this.hint.style.top = `${y + 20}px`;
    }

    showSuccessMessage() {
        this.success.innerHTML = `You won the game with <strong>${this.count}</strong> clicks!`;
        this.message.style.display = 'none';
        this.playground.style.pointerEvents = 'none';
        this.hint.style.display = 'none';
        this.pot.style.visibility = 'visible';
    }    
}