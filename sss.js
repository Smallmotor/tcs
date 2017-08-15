var box = document.getElementById("box"); 
var oul = document.getElementById("oul"); 
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var bgaudio = document.getElementById("bgaudio");
var si = document.getElementById("go");
var chi = document.getElementById("chi");
var dqcd = document.getElementById("dqcd");
var ls = document.getElementById("ls");
var level = document.getElementById("level");


var wid = box.offsetWidth;
box.style.height=wid+"px";

var ox = document.createDocumentFragment();
var snk = [];
var ll = [];
for(var i=0;i<5;i++){
    ll.push({pos:i,color:co()})
}
var food = [{pos:0,color:"red"}];
var fxg = 39;
// 39：右  1：40  2：37  3：38

var geshu = 20;

var ddd = null;
var sudu = 300;
dqcd.innerHTML = ll.length-5;
var score = localStorage.getItem("score")||0;
ls.innerHTML = score;
function ab (){
    for(var i = 0 ; i<400 ; i++){
        var oli = document.createElement("li")
        ox.appendChild(oli)
    }
}
ab();
oul.appendChild(ox);
function co (){
    return "rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")"
}
// 随机颜色
snk = oul.children

function cd (){
    for(var j=0,l=ll.length;j<l;j++){  
        snk[ll[j].pos].style.background=ll[j].color;   
    }      
}
cd();
// 初始化蛇
function isin (index){
    for(var j=0,l=ll.length;j<l;j++){
        if(ll[j].pos==index){
                return true;
            break;
        }    
    }
    return false;    
};

function snkfood (){
    var index = Math.floor(Math.random()*400);
    while(isin(index)){
        index = Math.floor(Math.random()*400);
    }
    food = {pos:index,color:co()}
    snk[index].style.background=food.color;
}
snkfood();
// 建造食物
function sile(){
    var l = ll.length-5;
    var score = localStorage.getItem("score")
    if(l>score){
        localStorage.setItem("score",l)
    }
    si.play();
    alert("GameOver");
    location.reload();
    return false; 
}
// 死后处理
function fzhs (){
    var snkh = ll.slice(-1)[0].pos; 
    // 蛇头位置
    if((snkh+1)%geshu==0&&fxg==39){    
        sile();  
    }
    else if(snkh>=400-geshu&&fxg==40){    
        sile();   
    }
    else if(snkh%geshu==0&&fxg==37){
        sile();  
    }
    else if(snkh<geshu&&fxg==38){  
        sile();  
    }
// 碰壁处理
    var snkw = ll.slice(0,1)[0].pos;
    // 蛇尾位置
    snk[snkw].style.background=0;
    // 控制前进,改变蛇尾颜色
    for(var k=0,l=ll.length;k<l-1;k++){
        ll[k].pos=ll[k+1].pos;
    }
    // 前进

    if(fxg==40){
        ll[l-1].pos=ll[l-1].pos+20;  
    }else if(fxg==37){
        ll[l-1].pos=ll[l-1].pos-1;
    }
    else if(fxg==38){
        ll[l-1].pos=ll[l-1].pos-20;
    }
    else if(fxg==39){
        ll[l-1].pos=ll[l-1].pos+1;
    }
    // 改变方向

    snkh = ll[l-1].pos;
    if(snkh==food.pos){
        ll.unshift({pos:snkw,color:food.color});
        snkfood();
        chi.play();
        var llcd = ll.length-5;
        dqcd.innerText=llcd;   
    }
    // 吃食物并改变分数
    for(var i =0,l=ll.length;i<l-1;i++){
        if(ll[i].pos==snkh){
            sile(); 
        }
    }
    cd();
}
// 碰撞自己
btn1.onclick=function(){
    sudu = level.value
    clearInterval(ddd)
    ddd=setInterval(function(){
        fzhs ();
    },sudu) 
    bgaudio.play();  
}
// 点击开始
btn2.onclick=function(){
    clearInterval(ddd);
    bgaudio.pause();
}




// var hammertime = new Hammer(oul);
// hammertime.on('swipeleft', function(ev) {
//       
// });
// hammertime.on('swiperight', function(ev) {   
//     
// });
// hammertime.on('swipeup', function(ev) {
//     
// });
// hammertime.on('swipedown', function(ev) {
//     
// });

oul.touch({
    swipeLeft:function(){
        kkk(37)
    },
    swipeRight:function(){
        kkk(39)
    },
    swipeUp:function(){
        kkk(38)
    },
    swipeDown:function(){
        kkk(40)
    },
});


function kkk (e){
      switch(e){
        case 37:{
            //  left
            if(fxg==39)return false;
            fxg=e;
            break;
        }
        case 38:{
            if(fxg==40)return false;
            fxg=e;
            break;
            // up 
        }
        case 39:{
            if(fxg==37)return false;
            fxg=e;
            break;
            // right   
        }
        case 40:{
            if(fxg==38)return false;
            fxg=e;
            break;
            // down
        }
    }
}
// 39：右  1：40  2：37  3：38
    