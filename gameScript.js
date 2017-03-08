
var player={
	name:"player",
	//emojis:undefined,
	score:0,
};

var pc={
	name:"pc",
	//emojis:undefined,
	score:0,
};

var emojisArray=['😍','😚','😄','⛄','😋'];
//console.log("your array",emojisArray);
var RandomEmojis=function(){
	return emojisArray[Math.round(Math.random()*(emojisArray.length-1))];
};
var winningScore=5;
var joker='⛄';
var round=0;
var count=4;
var firstEmojis=undefined;
var secondEmojis=undefined;
var flag=false;
var pcCallTimer=undefined;
var nextRoundTimer=undefined;
var countDownTimer=undefined;
var pcSnapCallInterval=800;
var countDownInterval=1000;
var callNextRoundInterval=2000;

var gamewon=function(){
	document.getElementById('Match').classList.add("hide");

}
var reset=function(){
	//reset all the variables and activate all the buttons
	document.getElementById("message-id").className="message hide";
	pc.score=0;
	player.score=0;
	round=0;
	document.getElementById("currentRound").innerText=0;
	document.getElementById("playerEmoji").innerHTML="❔";
	document.getElementById("pcEmoji").innerHTML="❔";
	document.getElementById("pc-score").innerText=0;
	document.getElementById("player-score").innerText=0;
	document.getElementById('Match').classList.remove("hide");
	document.getElementById('start').classList.remove("hide");
	
	//document.getElementById('re-set').classList.remove("hide");
}

var start=function(){
	document.getElementById('start').classList.add("hide");
	//document.getElementById('re-set').classList.add("hide");
	countdown();
};

var currentCount=count;
var countdown=function(){
	document.getElementById('Round').classList.add("hide");
	document.getElementById('countdown').classList.remove("hide");
	currentCount--;
	//console.clear();
	//console.log("The currents count is:",currentCount);
	document.getElementById('countdown').innerText=currentCount;
	if(currentCount==0){
		document.getElementById('countdown').classList.add("hide");
		round++;
		document.getElementById('Round').classList.remove("hide");
		document.getElementById("currentRound").innerText=round;
		nextRound();
		currentCount=count;
		//console.log("back from next round");
	}
	else{		
		//console.log("in countdown : in else");		
		countDownTimer=setTimeout(function(){countdown();},countDownInterval);
	}
};


//var check=true;
var nextRound=function(){
	//console.log("round",++round);		
		//console.log("hii");
		//check=false;
	firstEmojis = RandomEmojis();
	secondEmojis= RandomEmojis();
	document.getElementById("playerEmoji").innerHTML=firstEmojis;
	document.getElementById("pcEmoji").innerHTML=secondEmojis;
	console.log(firstEmojis,"vs",secondEmojis);
		if(isMatch()){
		pcCallTimer=setTimeout(function(){
			snap(true);},pcSnapCallInterval);
		//console.log("hello");
		}		
		nextRoundTimer=setTimeout(function(){countdown();},callNextRoundInterval);
};

var isMatch=function(){	
	if(firstEmojis==joker || secondEmojis==joker)
		return true;
	else
		return firstEmojis==secondEmojis;
}

//console.log("your array",emojisArray);
var snap=function(calledByPc){

	if(firstEmojis==undefined || secondEmojis==undefined){
		//console.log("here in undefined");
		return false;
	}	

	clearTimeout(nextRoundTimer);

		if(calledByPc){
			if(isMatch()){
				pc.score++;
				document.getElementById("pc-score").innerText=pc.score;
				//console.log("pc score",pc.score);
			}
		}
		else{
			clearTimeout(pcCallTimer);
			if(isMatch()){
				player.score++;
				document.getElementById("player-score").innerText=player.score;
				//console.log("player score",player.score);
			}
			else{
				pc.score++;
				document.getElementById("pc-score").innerText=pc.score;
				//console.log("pc score",pc.score);
			}
		}
		//console.log("here in snap");
		if(pc.score==winningScore){
			document.getElementById("message-id").className="message";
			document.getElementById("message-id").innerText="You Lose";
			gamewon();
			//console.log("pc won");
			//console.log("game over");

		}else if(player.score==winningScore){
			document.getElementById("message-id").className="message";
			document.getElementById("message-id").innerText="You Won";
			gamewon();
			//console.log("player won");
			//console.log("game over");

		}else{	
			countDownTimer=setTimeout(function(){countdown();},countDownInterval);
		}
		
	firstEmojis=undefined;
	secondEmojis=undefined;
};
