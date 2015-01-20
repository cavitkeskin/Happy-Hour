/*

	Pray Time
	
	ToDo
	
		+ 12:xx pm arasi saatleri gostermede problem var
		
	History
		
		Nov 26 2014, one night was snowing I started to write it
*/

function gmod(n,m){
	return ((n%m)+m)%m;
}

function hijricalendar(adjust){
	var today = new Date();
	if(adjust) {
		adjustmili = 1000*60*60*24*adjust; 
		todaymili = today.getTime()+adjustmili;
		today = new Date(todaymili);
	}
	day = today.getDate();
	month = today.getMonth();
	year = today.getFullYear();
	m = month+1;
	y = year;
	if(m<3) {
		y -= 1;
		m += 12;
	}

	a = Math.floor(y/100.);
	b = 2-a+Math.floor(a/4.);
	if(y<1583) b = 0;
	if(y==1582) {
		if(m>10)  b = -10;
		if(m==10) {
			b = 0;
			if(day>4) b = -10;
		}
	}

	jd = Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+day+b-1524;

	b = 0;
	if(jd>2299160){
		a = Math.floor((jd-1867216.25)/36524.25);
		b = 1+a-Math.floor(a/4.);
	}
	bb = jd+b+1524;
	cc = Math.floor((bb-122.1)/365.25);
	dd = Math.floor(365.25*cc);
	ee = Math.floor((bb-dd)/30.6001);
	day =(bb-dd)-Math.floor(30.6001*ee);
	month = ee-1;
	if(ee>13) {
		cc += 1;
		month = ee-13;
	}
	year = cc-4716;

	if(adjust) {
		wd = gmod(jd+1-adjust,7)+1;
	} else {
		wd = gmod(jd+1,7)+1;
	}

	iyear = 10631./30.;
	epochastro = 1948084;
	epochcivil = 1948085;

	shift1 = 8.01/60.;
	
	z = jd-epochastro;
	cyc = Math.floor(z/10631.);
	z = z-10631*cyc;
	j = Math.floor((z-shift1)/iyear);
	iy = 30*cyc+j;
	z = z-Math.floor(j*iyear+shift1);
	im = Math.floor((z+28.5001)/29.5);
	if(im==13) im = 12;
	id = z-Math.floor(29.5001*im-29);

	var myRes = new Array(8);

	myRes[0] = day; //calculated day (CE)
	myRes[1] = month-1; //calculated month (CE)
	myRes[2] = year; //calculated year (CE)
	myRes[3] = jd-1; //julian day number
	myRes[4] = wd-1; //weekday number
	myRes[5] = id; //islamic date
	myRes[6] = im-1; //islamic month
	myRes[7] = iy; //islamic year

	return myRes;
}

function easeInOutCubic (start, change, duration, time) 
{
	time /= duration / 2;
	if (time < 1) return change / 2 * time * time * time + start;
	time -= 2;
	return change / 2 * (time * time * time + 2) + start;
}

// paper.js extnded function
function write(s, opt) {
    'use strict';
	var option = {
            point: [0, 0],
            fillColor: '#000',
            fontFamily: 'Helvetica',
            fontWeight: 'normal',
            fontSize: '14px',
            justification: 'left',
            //rotation: 0
			gravity: ''
        },
        t;
	$.extend(option, opt, {content: s});
	t = new PointText(option);
	switch(option.gravity)
	{
		case 'center': 
			t.translate([-1 * t.bounds.width / 2, parseInt(t.fontSize) / 2 ]);
	}
	return t;
}

function title(s, rect, opt) {
    'use strict';
    var t = write(s, $.extend({
        point: rect.point,
        justification: 'center'
    }, opt));
//    t.position.x += rect.width / 2;
//    t.position.y += (rect.height + parseInt(t.fontSize)) / 2;
//    if (t.bounds.width > rect.width * 0.9) { t.scaling = [t.scaling.x * rect.width * 0.9 / t.bounds.width, 1]; }

	t.fitBounds(rect);
	return t;
}



// --- other funcs
function xy(angle, radius)
{
	return new Point( Math.cos(angle * Math.PI / 180) * radius, Math.sin(angle * Math.PI / 180) * radius);
}

function angle(time)
{
	if(typeof time === 'undefined')
	{
		var d = new Date();
		time = d.getHours() + d.getMinutes() / 60;
	}
	if(typeof time === 'string')
	{
		var t = time.match(/^([0-9]{1,2}):([0-9]{2}) (am|pm)$/);
		var h = parseInt(t[1]) + (t[3] == 'am' ? 0 : 12);
		time = h + parseInt(t[2]) / 60;
	}
	return Math.round(360 * time / 24);
}

function middle(starttime, endtime)
{
	var a = angle(starttime);
	var b = angle(endtime);
	return (a + b) / 2 - (a < b ? 0 : 180);
}

function float2time(time)
{
	var h = Math.floor(time);
	var m = Math.round(time * 60 % 60);
	return ((h % 12)==0?12:h%12) + ':' + (m<10?'0':'') + m + (h<12?' am':' pm');
}

// ----
/*
function timeAngle(time)
{
	var t = time.match(/^([0-9]{1,2}):([0-9]{2}) (am|pm)$/);
	var h = (t[1] % 12) + (t[3] == 'am' ? 0 : 12);
	var m = h * 60 + parseInt(t[2]);
	var a = 360 * m / 24 / 60 + 90; 
	return a;
}

function time2int(time)
{
	var t = time.match(/^([0-9]{1,2}):([0-9]{2}) (am|pm)$/);
	var h = (t[1] % 12) + (t[3] == 'am' ? 0 : 12);
	var m = h * 60 + parseInt(t[2]);
	return m;
}

function int2time(i)
{
	var h = Math.floor(i / 60);
	var m = i % 60;
	return ((h % 12)==0?12:h%12) + ':' + (i<10?'0':'') + i + (h<12?' am':' pm');
}

function time2deg(time)
{
	if(typeof time !== 'undefined')
		var m = time2int(time);
	else {
		var d = new Date();
		var m = d.getHours() * 60 + d.getMinutes();
	}
	var a = 360 * m / 24 / 60; 
	return a;
}


function middleAngles(a, b)
{  
	var c = (a + b) / 2 - (a < b ? 0 : 180);
	//console.log([a, b, c]);
	return c;
}
*/
var C_R1 = '#f0f0f0', // Big circle color
	C_T1 = '#999', // color of clock hour's numbers
	C_L1 = '#666', // color of clock hour's mark line
	C_L2 = '#ffd10e', // pray time mark line's color
	C_T2 = '#ddd', // Pray time text color
	C_L3 = '#c00', // Time pointer line color
	BOGUS = 1; 


var testDay = 0;
var initialized = false;
var times = ['5:13 am', '6:50 am', '11:51 am', '2:18 pm', '4:40 pm', '6:06 pm'];

var r = Math.floor( view.size.width / 2 * 4 / 5);

var h = view.size.height;
var w = view.size.width;
var u1 = h / 100, u2 = 2 * u1, u3 = 3 * u1, u4 = 4 * u1, u5 = 5 * u1, u6 = 6 * u1, u7 = 7 * u1, u8 = 8 * u1, u10 = 10 * u1;
var clock = new Group();
//var timeArrow = null;
var Baloon = null;

function baloon(which)
{
	if(Baloon == null)
	{ 
		var b = new Path();
		b.fillColor = 'rgba(255, 255, 255, 0.68)';
		b.strokeWidth = 1;
		b.strokeColor = '#888';
		b.add(new Point(0, r - u6));
		b.lineTo(new Point(u2, 2*r/3));
		b.arcTo(
			new Point(0, -2*r/3),
			new Point(-u2, 2*r/3)	
		);
		b.lineTo(new Point(0, r - u6));
		b.closed = true;
		
		var t = title('\nImsak\n05:12 am\n\n', new Rectangle(xy(225, 2*r/3), xy(45, 2*r/3)), {});
		
		Baloon = new Group(b, t);
		Baloon.data.type = 'baloon';
		Baloon.on('mousedown', function(){ baloon(this)});
		Baloon.position += [view.size.width/2, view.size.height/2];

	}
	
	switch(which.data.type)
	{
		case 'baloon':
			which.visible = false;
			break;
		case 'time':
			var d = new Date();
			Baloon.children[1].content = '\n'+(d.getHours()%12)+':'+(d.getMinutes()<10?'0':'')+d.getMinutes()+'\n\n';
			Baloon.visible = true;
			break;
		default:
			Baloon.children[1].content = '\n'+which.data.type+'\n'+float2time(times[which.data.type]);
			Baloon.visible = true;
	}
}

function pad(p, r, data)
{
	var pad = new Path.Circle({ center: p, radius: r, fillColor: new Color(255, 255, 255, 0.0)});
	pad.data = data;
	pad.onMouseDown = function(event){
		baloon(this);
	};
	return pad;
}

function baseClock ()
{
	var g = new Group();
	
	g.addChildren([
		new Path.Circle({ center: [0, 0], radius: r + u6/2, strokeColor: '#333', strokeWidth: 2}),
		new Path.Circle({ center: [0, 0], radius: r - u6/2, strokeColor: '#666', strokeWidth: 2}),
		new Path.Circle({ center: [0, 0], radius: r, strokeColor: C_R1, strokeWidth: u6})
	]);
	
	for(var i = 0; i < 24; i++)
	{
		g.addChildren([
			new Path({ 
				segments: [xy(i * 360 / 24, r - u2/2), xy(i * 360 / 24, r + u2/2)], 
				strokeColor: C_L1, 
				strokeWidth: 1
			}),
			write(i%12 + 1, {point: xy( i * 360 / 24 + 105, 7*r/9), fontSize: '14px', fillColor: C_T1, gravity: 'center'}),
		]);
	}
	return g;
}

function coloredSpace()
{
	var g = new Group([
		new Path.Circle({center: [0, 0], radius: r, fillColor: '#1DCBF7'})
	]);
	g.name = 'spaces';
	return g;
}

function sun()
{
	var sun = new Path.Star([0, 0], 48, u3, u6); 
	sun.fillColor = '#ffd';
	sun.position += xy( middle(times.sunrise, times.asr) + 90, 3 * r / 5 );
	return sun;
}	

function stars()
{
	var g = new Group();
	var a = middle(times.isha, times.fajr);

	var star = new Path.Star([0, 0], 5, 2, 5);
	star.fillColor = '#fff';
	
	var star2 = star.clone(); star2.position = xy(a-20+90, 4*r/7);
	var star3 = star.clone(); star3.position = xy(a+40+90, 3*r/7);
	star.position += xy(a-36+90, r/3);
	
	g.addChildren([star, star2, star3]);
	return g;
}
	
function moon()
{
	var mr = u4;
	var a = middle(times.isha, times.fajr);
	var h = hijricalendar();
	var d = h[5] > 28 ? 28 : h[5]; // 28 gunden uzun aylari dikkate alma
	var moon = new Path.Circle({center: [0, 0], radius: mr, strokeColor: '#777;'});
	var p = moon.getBounds();
	var light = new Path();
	light.fillColor = 'white';
	light.add( new Point(p.x + mr, p.y) );

	light.arcTo(
		new Point(p.x + ( d > 14 ? 0 : (14 - d) / 14 * 2 * mr), p.y + mr),
		new Point(p.x + mr, p.y + 2 * mr)
	);
	light.arcTo(
		new Point(p.x + 2 * mr + (d < 14 ? 0 : (14 - d) / 14 * 2 * mr) , p.y + mr),
		new Point(p.x + mr, p.y)
	);
	light.closed = true;
	
	moon.position += xy(a+90, r/3);
	light.position += xy(a+90, r/3);

	return new Group([
		moon,
		light
	]);
}

function prayTimesArrow()
{
	var a;
	var g = new Group();
	_.each(['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'], function(key, i){
		var m = new Group([
			new Path({ segments: [[0, 0], [0, r]], strokeColor: C_L2, strokeWidth: u1/2}),
			new Path({ segments: [[0, r - u2], [0, r+u2]], strokeColor: '#ffd10e', strokeWidth: u3/2}),
			pad([0, r], u8, {type: key})
		]);
		var a = angle(times[key]);
		m.data.movement = {start: 0, end: a > 180 ? a - 360 : a, duration: 30, time: 0, current: 0};
		if(key == 'isha') m.data.movement.afterUpdate = updateSpaces;
		m.name = key;
		g.addChild(m);
	});
	g.name = 'praytimes';
	return g;	
}

function timeArrow()
{
	var g = new Group([
		new Path({ segments: [[0, -u5], [0, r+u2]], strokeColor: C_L3, strokeWidth: u1/2}),
		new Path.Circle({ center: [0, 0], radius: u3, fillColor: C_L3}),
		pad([0,0], u8, {type: 'time'})
	]);
	g.name = 'time-arrow';
	g.data.movement = {start: 0, end: angle(), duration: 40, time: 0, current: 0};
	return g;
}
	
function rotate(el, data)
{
	if(data.time >= data.duration ) return;
	var pos = Math.round( easeInOutCubic(data.start, data.end - data.start, data.duration, data.time+1) );
	el.rotate(pos - data.current, [view.size.width/2, view.size.height/2]);
	_.extend(el.data.movement, {time: data.time+1, current: pos});
	if(typeof data.afterUpdate === 'function')
		data.afterUpdate.call();
}
	
function updateCurrentTime()
{
	var el = clock.children['time-arrow'];
	var data = el.data.movement;
	
	// if movement not finished yet
	if(data.time < data.duration ) 
	{	
		rotate(el, data);
	} 
	else 
	{ 
		var curr = data.current % 360;
		var pos = Math.round(angle());
		if(curr > pos) pos+=360;
		if(pos != curr) {
			_.extend(el.data.movement, {start: curr, end: pos, time: 0, current: curr});
		}
	}
}

function updatePrayTimesArrow()
{
	var els = clock.children['praytimes'];
	_.each(els.children, function(el){
		var data = el.data.movement;
		rotate(el, data);
	})
}

function updateSpaces()
{
	var spaces, p1, p2;
	spaces = clock.children['spaces'];
	
	p1 = (clock.children['praytimes'].children['maghrib'].children[2].position - view.center)/2 + view.center;
	p2 = (clock.children['praytimes'].children['sunrise'].children[2].position - view.center)/2 + view.center;
	p3 = (clock.children['praytimes'].children['isha'].children[2].position - view.center)/2 + view.center;
	p4 = (clock.children['praytimes'].children['fajr'].children[2].position - view.center)/2 + view.center;
	
	spaces.removeChildren(1);
	spaces.addChildren([
		new Path.Arc({ from: p1, through: [view.size.width/2, view.size.height/2+r/2], to: p2, strokeWidth: r, strokeColor: '#32497A'}),
		new Path.Arc({ from: p3, through: [view.size.width/2, view.size.height/2+r/2], to: p4, strokeWidth: r, strokeColor: '#555'})
	]);
}
	
function setPosition(position)
{
	var dt = new Date();
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	//console.log([lat, lng]);
	
	//var tz = -1 * dt.getTimezoneOffset()/60;
	//window.prayTimes.tune({imsak: 4, sunrise:-7, dhuhr: 7, asr: 6, sunset: 9, isha: 4});

	// Tuned for Diyanet at  Dec 1 2014 for Clifton / New Jersey
	prayTimes.setMethod('MWL');
	prayTimes.tune({fajr: -5, sunrise: -5, dhuhr: 6, asr: 4, maghrib: 7, isha: 3});

	times = prayTimes.getTimes(dt, [lat, lng], 'auto', 'auto', 'Float'); //console.log(pt);
	//console.log(_.keys(times));
	//console.log(_.values(times));
	initialize();	

}
	
function initialize()
{
	var s = new Date();
	clock.removeChildren();	
	clock.position = new Point(0, 0);	
	clock.addChildren([
		coloredSpace(),
		baseClock(),	
		sun(),
		stars(),
		moon(),
		prayTimesArrow(),
		timeArrow()
	]);
	clock.position += new Point(w/2, h/2);
	var e = new Date();
	//console.log(['duration: ', e - s]);
	initialized = true;	
	/*
	var d = {start: 50, end: 51, duration: 10, time: 0};
	for (var i=0; i<10; i++) {
		d.time++;
		console.log([d.start, d.end - d.start, d.duration, d.time, easeInOutCubic(d.start, d.end - d.start, d.duration, d.time)]);
	}
	*/	
		
}

function onFrame(event)
{
	if(!initialized) return;
	updateCurrentTime();
	updatePrayTimesArrow();
	/*
	if(event.count % 60 == 0)
	{
		var el = clock.children['time-arrow'];
		el.rotate(-el.data.movement.current, [view.size.width/2, view.size.height/2]);
		el.data.movement = {start: 0, end: 300, duration: 30, time: 0, current: 0};
	}
	*/
}
	
if(navigator.geolocation)
	navigator.geolocation.getCurrentPosition(setPosition);	

	
