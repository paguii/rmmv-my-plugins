//=============================================================================
// GP_Clocklendar.js
//=============================================================================

/*:
 * @plugindesc Relógio para saber o tempo do dia
 * @author Guilherme Pagliarini
 *
 * @param MinutesInDay
 * @desc Define quantos minutos tem um dia
 * @type numeric
 * @default 20
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

class GP_Clocklendar{
    
    constructor(parameters){
        this.minutesInDay = parameters.MinutesInDay;
        this.nightTimeStart = parameters.NightTimeStart;
        this.nightTimeEnd = parameters.NightTimeEnd;
        this.currentDay = new Date(parameters.StartingDayHour);
        this.isRunning = false;
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
        let hour = "";
        if(this.currentDay.getHours() < 10){
            hour += "0" + this.currentDay.getHours();
        }else{
            hour = this.currentDay.getHours();
        }
        
        return hour;
    }
    
    minute(){
        let minute = "";
        if(this.currentDay.getMinutes() < 10){
            minute += "0" + this.currentDay.getMinutes();
        }else{
            minute = this.currentDay.getMinutes();
        }
        
        return minute;
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
    
    showClock(x, y){
        
    }
}

var clocklendar = new GP_Clocklendar(PluginManager.parameters("GP_Clocklendar"));
// document.addEventListener ('keypress', (event) => {
//     const keyName = event.key;
//     alert ('keypress event \ n \ n' + 'chave:' + nome da chave);
// });

function GP_Clocklendar_Window(){
    this.initialize.apply(this, arguments);
}

GP_Clocklendar_Window.prototype = Object.create(Window_Base.prototype);
GP_Clocklendar_Window.constructor = GP_Clocklendar_Window;

GP_Clocklendar_Window.prototype.initialize = function() {
    let width = 155;
    let height = 70;
    
    Window_Base.prototype.initialize.call(this, Graphics.boxWidth - width, Graphics.boxHeight - height, width, height);
}

GP_Clocklendar_Window.prototype.update = function() {
    this.contents.clear();
    this.drawIcon(2, Graphics.boxWidth - 100, Graphics.boxWidth - 100);
    this.drawText(clocklendar.hour() + ":" + clocklendar.minute(), 0, 0);
}

var hawaii = PIXI.Sprite.fromImage('https://i.pinimg.com/236x/af/27/ba/af27ba67e61bcc16f6f8d65f52781934.jpg');
 
// center the sprite anchor point
hawaii.anchor.x = 0;
hawaii.anchor.y = 0;
 
// move the sprite to the center of the canvas
hawaii.position.x = 200;
hawaii.position.y = 200;

var scene_map = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    scene_map.apply(this, arguments);
    this.clocklendar = new GP_Clocklendar_Window();
    this.addChild(this.clocklendar);
    this.addChild(hawaii);
}




