window.addEventListener("load",function(){init();});

var step = 0;
var slideimage;
var arrprev;
var arrnext;
var image = [];

function init(){
	image[0]=new Image();
	image[0].src = "./images/slider/1.jpg"
	image[1]=new Image();
	image[1].src = "./images/slider/2.jpg"
	image[2]=new Image();
	image[2].src = "./images/slider/3.jpg"
	image[3]=new Image();
	image[3].src = "./images/slider/4.jpg"
	image[4]=new Image();
	image[4].src = "./images/slider/5.jpg"

	slideimage = document.getElementById("sliderimg");
	arrnext = document.getElementById("arrright");
	arrprev = document.getElementById("arrleft");

	arrnext.addEventListener('click', function(){slideNext();});
	arrprev.addEventListener('click', function(){slidePrev();});
}


function slideNext(){
	if (step<image.length-1){
		step++;
	}
	else{
		step=0;
	}	
	slideimage.src=image[step].src;
}

function slidePrev(){
	if (step>0){
			step--;
		}
		else{
			step=image.length-1;
		}
	slideimage.src=image[step].src;
}