

const snowInit = function () {

	let snow = {};
	snow.img = "http://img111.xooimage.com/files/2/c/8/hearth-570c282.png";
	snow.nb = 30;

	if ( typeof( window.pageYOffset ) == "number") {
		
		snow.browser_width = window.innerWidth;
		snow.browser_height = window.innerHeight;
		
	} else if ( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
		
		snow.browser_width = document.body.offsetWidth;
		snow.browser_height = document.body.offsetHeight;
		
	} else if ( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
		
		snow.browser_width = document.documentElement.offsetWidth;
		snow.browser_height = document.documentElement.offsetHeight;
		
	} else {
		
		snow.browser_width = 500;
		snow.browser_height = 500;	
		
	}

	snow.dx = {};
	snow.xp = {};
	snow.yp = {};
	snow.am = {};
	snow.stx = {};
	snow.sty = {};

	for ( let i = 0; i < snow.nb; i++ ) {
		
		snow.dx[i] = 0; 
		snow.xp[i] = Math.random() * ( snow.browser_width - 50 );
		snow.yp[i] = Math.random() * snow.browser_height;
		snow.am[i] = Math.random() * 20; 
		snow.stx[i] = 0.02 + Math.random() / 10;
		snow.sty[i] = 0.7 + Math.random();
		
		const snowSize = Math.random() * ( 1 - 0.3 ) + 0.3;
		const snowFlake = document.createElement('div');
		snowFlake.id = 'snow_flake' + i;
		snowFlake.className = 'snow';
		snowFlake.style.setProperty("position", "fixed");
		snowFlake.style.setProperty("z-index", "10");
		snowFlake.style.setProperty("pointer-events", "none");
		snowFlake.innerHTML = '<\img src="' + snow.img + '" border="0" style="transform: scale(' + snowSize + ')">';
		document.documentElement.appendChild(snowFlake);

	}

	return snow;
	
};

const snowMove = function (snow) { 
	
	for ( let i = 0; i < snow.nb; i++ ) { 
	
		snow.yp[i] += snow.sty[i];
		
		if ( snow.yp[i] > snow.browser_height - 50 ) {
			
			snow.xp[i] = Math.random() * ( snow.browser_width - snow.am[i] - 30 );
			snow.yp[i] = 0;
			snow.stx[i] = 0.02 + Math.random() / 10;
			snow.sty[i] = 0.7 + Math.random();
			
		}
		
		snow.dx[i] += snow.stx[i];
		document.getElementById("snow_flake" + i).style.top = snow.yp[i] + "px";
		document.getElementById("snow_flake" + i).style.left = snow.xp[i] + snow.am[i] * Math.sin( snow.dx[i] ) + "px";
		
	}
	
};

const applyMediQueries = function () {
	
	const snowFlakes = document.getElementsByClassName('snow');
	
	if ( window.matchMedia("(orientation: portrait)").matches) {
		
		const newScale = '.6';
		resizeSnowFlakes(snowFlakes, newScale);
		
	} else if ( window.matchMedia("(max-height: 420px)").matches) {
		
		const newScale = '.5';
		resizeSnowFlakes(snowFlakes, newScale);
		
	} else {
		
		const newScale = '1';
		resizeSnowFlakes(snowFlakes, newScale);
		
	}
	
};

const resizeSnowFlakes = function (snowFlakes, newScale) {

	for ( let i = 0; i < snowFlakes.length; i++ ) snowFlakes[i].style.setProperty('transform', 'scale(' + newScale + ')');

};

const snowStart = function () {
  
	snowPass = snowInit();
	snowTimer = setInterval(snowMove.bind(null,snowPass), 20);
	applyMediQueries();
  
};

const snowStop = function () {

	clearInterval(snowTimer);

	for ( let i = 0; i < snowPass.nb; i++ ) {
		
		const snowToDelete = document.getElementById('snow_flake' + i);
		document.documentElement.removeChild(snowToDelete);
		
	}

};

document.addEventListener('DOMContentLoaded', function () { snowStart(); });

window.addEventListener('resize', function () {
	
	snowStop();
	snowStart();

});

let snowPass = null;
let snowTimer = null;



