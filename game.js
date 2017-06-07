// the game itself
var game;
// the spinning wheel
var wheel;
// can the wheel spin?
var canSpin;
// slices (prizes) placed in the wheel
var slices = 4;
// prize names, starting from 12 o'clock going clockwise
//var slicePrizes = ["A KEY!!!", "50 STARS", "500 STARS", "BAD LUCK!!!", "200 STARS", "100 STARS", "150 STARS", "BAD LUCK!!!"];
var slicePrizes = ["P","D","C","A"];




// the prize you are about to win
var prize;
// text field where to show the prize
var prizeText;

window.onload = function() {
	// creation of a 458x488 game
	//858, 858
	game = new Phaser.Game(412, 412, Phaser.AUTO, "gameArea");
	// adding "PlayGame" state
	game.state.add("PlayGame",playGame);
	// launching "PlayGame" state
	game.state.start("PlayGame");
}

// PLAYGAME STATE

var playGame = function(game){};

playGame.prototype = {
	// function to be executed once the state preloads
	preload: function(){
		// preloading graphic assets
		game.load.image("wheel", "wheel.png");
		game.load.image("pin", "pin.png");
	},
	// funtion to be executed when the state is created
	create: function(){
		// giving some color to background
		game.stage.backgroundColor = "#fff";
		// adding the wheel in the middle of the canvas
		//wheel.he

		wheel = game.add.sprite(game.width / 2, game.width / 2, "wheel");
		// setting wheel registration point in its center
		wheel.anchor.set(0.5);
		wheel.width = 380;
		wheel.height = 380;

		// adding the pin in the middle of the canvas
		var pin = game.add.sprite(game.width / 2, game.width / 2, "pin");

		// setting pin registration point in its center
		pin.anchor.set(0.5);
		// adding the text field
		prizeText = game.add.text(game.world.centerX, 480, "");
		// setting text field registration point in its center
		prizeText.anchor.set(0.5);
		// aligning the text to center
		prizeText.align = "center";
		// the game has just started = we can spin the wheel
		canSpin = true;
		// waiting for your input, then calling "spin" function
		game.input.onDown.add(this.spin, this);
	},
	// function to spin the wheel
	spin(){
		// can we spin the wheel?
		if(canSpin){
			// resetting text field
			prizeText.text = "";
			// the wheel will spin round from 2 to 4 times. This is just coreography
			var rounds = game.rnd.between(1, 2);
			console.log(rounds);
			// then will rotate by a random number from 0 to 360 degrees. This is the actual spin
			var degrees = game.rnd.between(0, 360);
			// before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
			prize = slices - 1 - Math.floor(degrees / (360 / slices));
			console.log(prize);
			// now the wheel cannot spin because it's already spinning
			canSpin = false;
			// animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
			// the quadratic easing will simulate friction
			var spinTween = game.add.tween(wheel).to({
				angle: 360 * rounds + degrees
			}, 3000, Phaser.Easing.Quadratic.Out, true);
			// once the tween is completed, call winPrize function
			spinTween.onComplete.add(this.winPrize, this);
		}
	},
	// function to assign the prize
	winPrize(){
		// now we can spin the wheel again
		canSpin = true;
		// writing the prize you just won
		//prizeText.text = slicePrizes[prize];
		console.log("AQUI");
		console.log(wheel);
		//alert(window.screen.availWidth);
		//alert(window.screen.availHeight);
		console.log(prize);
		//var test1 = window.screen.availWidth;
		//var test2 = window.screen.availHeight;
		//document.getElementById('conteudo').innerHTML = test1+" por "+test2;
		//document.getElementById('conteudo').innerHTML = 'Qual é o problema/processo a ser trabalhado?</br></br>[A] Testando...</br>[A] Testando...</br>[A] Testando...</br>[A] Testando...';

		switch(prize) {
			case 0:
			document.getElementById('conteudo').innerHTML = plan_array[1]['ask'];
			document.getElementById('QA').innerHTML = plan_array[1]['a'];
			break;
			case 1:
			document.getElementById('conteudo').innerHTML = do_array[1]['ask'];
			document.getElementById('QA').innerHTML = do_array[1]['a'];
			break;
			case 2:
			document.getElementById('conteudo').innerHTML = check_array[1]['ask'];
			document.getElementById('QA').innerHTML = check_array[1]['a'];
			break;
			case 3:
			document.getElementById('conteudo').innerHTML = action_array[1]['ask'];
			document.getElementById('QA').innerHTML = action_array[1]['a'];
			break;
		}



		//document.getElementById('conteudo').innerHTML = askingArray[1]['ask'];
		//document.getElementById('QA').innerHTML = askingArray[1]['a'];
		setTimeout(function(){$("#myModal").modal();}, 3000);


	}
}
