let newsSlide = document.querySelectorAll(".slide");
let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");

let slidePos = 0;

nextBtn.addEventListener("click", () => {changeValue("1")})
prevBtn.addEventListener("click", () => {changeValue("-1")})

slideChanger();

function changeValue(value){
	slidePos = slidePos + parseInt(value);	
	if (slidePos > newsSlide.length-1){ 
		slidePos = 0;
	}
	if (slidePos < 0){ 
		slidePos = newsSlide.length-1;
	}
slideChanger();

}

function slideChanger(){
	newsSlide.forEach(function(item, index) {
	if (index != slidePos){
		item.style.display = "none";
	} else {
		item.style.display = "block";
	}
});
}
	
