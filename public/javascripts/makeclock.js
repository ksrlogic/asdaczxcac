function addZero(str){
    if (str.length < 2){
        str = "0" + str
        
    }
    return str
}

function getPeriod(hour, minute){
    if (minute >= 0 && minute < 51){
        console.log(hour)
        
        if((hour >= 9 && hour <= 12) ||(hour >= 13 && hour <= 18) ){
            return `${hour - 8} 교시!`
        }else if(hour==12){
            return "점심시간"
        }else if(hour==18) {
            return "저녁시간"
        }else{
            return "나머지 공부시간"
        }
    } else{
        //break time
        return "Break Time!"
    }
}
setInterval(()=>{
let d = new Date()
let hour = d.getHours().toString()
let minutes = d.getMinutes().toString()
let seconds = d.getSeconds().toString()
let clock = `${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}`

document.getElementById("clock").innerHTML = clock
},1000)


var d = new Date();
var hour = d.getHours()
var minute = d.getMinutes()
document.getElementById("period").innerHTML = getPeriod(hour,minute)
setInterval(()=>{
    
    var d = new Date();
    var hour = d.getHours()
    var minute = d.getMinutes()
    document.getElementById("period").innerHTML = getPeriod(hour,minute)
},1000 * 60 * 10)
