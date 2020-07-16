//=============================================================================
// Clocklendar.js
//=============================================================================

/*:
 * @plugindesc Relógio para saber o tempo do dia
 * @author Guilherme Pagliarini
 *
 * @param MinutesInDay
 * @desc Define quantos minutos tem um dia
 * @type numeric
 * @default 15
 * 
 * @param NightTimeStart
 * @desc Define o horario que a noite começa
 * @default 18:00
 * 
 * @param NightTimeEnd
 * @desc Define o horario que a noite começa
 * @default 06:00
 * 
 * @param StartingDayHour
 * @desc Define o dia inicial
 * @default 2020-01-01 00:00
 */

class Clock{
    
    constructor(parameters){
        this.minutesInDay = parameters.MinutesInDay;
        
        this.nightTimeStart = parameters.NightTimeStart;
        this.nightTimeEnd = parameters.NightTimeEnd;
        this.currentDay = new Date(parameters.StartingDayHour);
        
        this.isRunning = false;
        
        this.maxTicker = this.minutesInDay * 60;
        this.tickSize =  86400 / (this.minutesInDay * 60);
        
        this.tick = function(){
            this.currentDay.setSeconds(this.currentDay.getSeconds() + this.tickSize);
        }
    }
    
    start(){
        var self = this;
        
        if(!this.isRunning){
            this.isRunning = true;        
            this.ticker = setInterval(function(){ self.tick(); } , 1000);
        }
    }
    
    reset(){
        this.isRunning = false;
        this.currentDay = new Date();
    }
    
    pause(){
        if(this.isRunning){
            this.isRunning = false;
            clearInterval(this.ticker); 
        }
    }
    
    hour(){
        return this.currentDay.getHours();
    }
    
    minute(){
        return this.currentDay.getMinutes();
    }
    
    getToday(pattern){
        return this.currentDay.getDate() + "/" + (this.currentDay.getMonth() + 1) + "/" + this.currentDay.getFullYear();
    }
    
    setCurrentDay(currentDay){
        this.currentDay = new Date(currentDay);
    }
    
    nextDay(){
        this.currentDay.setDate(this.currentDay.getDate() + 1);
    }
    
    goFowardsInDays(number){
        this.currentDay.setDate(this.currentDay.getDate() + number);
    }
    
    goBackwardsInDays(number){
        this.currentDay.setDate(this.currentDay.getDate() - number);
    }
}

var clocklendar = new Clock(PluginManager.parameters("Clocklendar"));