// CONFIGURATION
var config = {
    margin: 4,
    fontFamily: 'Helvetica',
    header: { height: 80, fontFamily: 'Helvetica', fontSize: [24, 14]},
    period: { height: 60, fontFamily: 'Open Sans Condensed', fontSize: [18, 9.5], fontWeight: 'bold', color: ['#F48E1F', '#DA5050', '#A0C1C4', '#89B4D6'] },
    months : { height: 42, fontFamily: 'Helvetica'},
    years: { height: 30, fontSize: 12, fontWeight: 'bold'},
    footer: { height: 30, fontSize: 12},
    bubble: {duration: 10, effect: 3 } // effect 1: fade, 2: scale, 3: fade and scale
};

// TIMELINE DATA
var TimeLine = {
	start: '03/2013',
	end: '12/2015',
	title: 'A Timeline of the FY 2015 Federal Budget Process',
	description: 'The budget cycle, from start to finish, lasts four years',
	footnote: 'Note: A Fiscal Year (FY) begins on October 1st and runs through September 30th of the following year.',
	periods: [
		{
			start: '03/2013',
			end: '12/2013', //'03/2014', 
			title: 'EXECUTIVE BUDGET FORMULATION',
            subtitle: 'Mar\'13 - Mar\'14',
			events: [
				{
					start: '03/2013',
                    end: '03/2013',
                    title: 'Beginning in Mar\'13:',
					description: 'Federal agencies prepare budget\nproposals for the FY 2015 Budget.'
				},
				{
					start: '05/2013',
					end: '05/2013',
                    title: 'May\'13:',
					description: 'The Administration\'s budget office,\nthe Office of Management and Budget (OMB)\nreleases instructions to federal agencies\nin preparing, submitting and executing the budget.'
				},
				{
					start: '09/2013',
					end: '03/2014',
                    title: 'Sep\'13 to Mar\'14:',
					description: 'OMB manages the executive decision\n making process, and creates\n the President’s Budget,\n which is released the following February.'
				}

			]
		},
		{
			start: '01/2014',
			end: '09/2014',
			title: 'CONGRESSIONAL BUDGET',
			events: [
				{
					start: '01/2014',
					end: '01/2014',
                    title: 'Jan 28th, ’14:',
					description: 'State of the Union Address'
				},
				{
					start: '02/2014',
					end: '02/2014',
                    title: 'Feb 4th, ‘14:',
					description: 'The non-partisan Congressional Budget Office (CBO)\n releases The Budget and Economic Outlook,\n setting the stage for Congress \nwith 10-year budget projections.'
				},
				{
					start: '03/2014',
					end: '03/2014',
                    title: 'Mar 4th ‘14:',
					description: 'The President\'s FY 2015 budget sent to Congress. \nThe Budget Committees begin work on the FY 2015 \nBudget Resolution.'
				},
				{
					start: '03/2014',
					end: '03/2014',
                    title: 'Mar 31st ’14:',
					description: 'Medicare physician payment fix expires.'
				},
				{
					start: '04/2014',
					end: '05/2014',
                    title: 'April to May ‘14:',
					description: 'Congressional Budget Office (CBO) releases \nAn Analysis of the President’s \nBudgetary Proposals for Fiscal Year 2015.'
				},
				{
					start: '05/2014',
					end: '05/2014',
                    title: 'May 15th, ‘14:',
					description: 'The House appropriations committee can begin \nconsideration of bills even without an \nadopted congressional budget resolution.'
				},
				{
					start: '07/2014',
					end: '08/2014',
                    title: 'Jul to Aug ‘14:',
					description: 'Office of Management and Budget (OMB) \nand Congressional Budget Office (CBO) \nprovide updated budget projections.'
				},
				{
					start: '09/2014',
					end: '09/2015',
                    title: 'Sep 30th, ‘14: \nEnd of FY 2014.',
					description: 'Deadline for enacting appropriation bills \nfor FY 2015—otherwise federal agencies \nwill have no funds to pay staff \nand operate programs and will shut down. \nPrograms that don’t need annual appropriations \n(e.g. Social Security, Medicare) continue.'
				}
			]
		},
		{
			start: '10/2014',
			end: '09/2015',
			title: 'BUDGET EXECUTION',
			events: [
				{
					start: '10/2014',
					end: '09/2015',
                    title: 'Oct ‘14 to Sep ‘15:',
					description: 'Federal agencies use enacted FY 2015 \nfunding for activities and programs.'
				}
			]
		},
		{
			start: '10/2015',
			end: '09/2016',
			title: 'AUDIT',
			events: [
				{
					start: '10/2015',
					end: '12/2015',
                    title: 'Beginning in Fall ‘15:',
					description: 'Agency financial officers, Inspectors General, \nand the Government Accountability Office (GAO) \nbegin executing audits of federal agencies \nfor FY 2015 spending.'
				}
			]
		}
	]
};

// ****************************
// DO NOT EDIT AFTER THIS LINE!
// ****************************

var mobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())),
    Months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    busy = true,
    startHere = null;

// SOME FUNCTIONS

function sin(deg) {
    'use strict';
    return Math.sin(deg * Math.PI / 180);
}

function at(a, i) {
    'use strict';
    return Array.isArray(a) ? a[i % a.length] : a;
}

function month2int(s) {
    'use strict';
	var p = s.match(/^([0-9]{2})\/([0-9]{4})$/);
	if (p === null) { return 0; }
	return p[2] * 12 + p[1] * 1 - 1;
}

function dateStr(s) {
    'use strict';
    var a = '',
        p = s.match(/^([0-9]{2})\/([0-9]{4})$/);
    
	if (p === null) { return 0; }
	a = p[1] * 1 - 1;
	return Months[a] + ' \'' + (p[2] % 100);
}

function write(s, opt) {
    'use strict';
	var option = {
            point: [0, 0],
            fillColor: '#000',
            fontFamily: 'Helvetica',
            fontWeight: 'normal',
            fontSize: '12px',
            justification: 'left',
            //rotation: 0
        },
        t;
	$.extend(option, opt, {content: s});
	t = new PointText(option);
	return t;
}

function title(s, rect, opt) {
    'use strict';
    var t = write(s, $.extend({
        point: rect.point,
        justification: 'center'
    }, opt));
    t.position.x += rect.width / 2;
    t.position.y += (rect.height + parseInt(t.fontSize)) / 2;
    if (t.bounds.width > rect.width * 0.9) { t.scaling = [t.scaling.x * rect.width * 0.9 / t.bounds.width, 1]; }
    return t;
}

function makeBubble(m) {
    var conf = config.bubble,
        chart = config.months,
        evs = hasNewEvent(m),
        margin = 12,
        pc = ( m - chart.start ) / chart.size; 
    
    var text = new Group; 
    $.each(evs, function(i, ev){
        // title
        var t = write(ev.title, {fontFamily: at(conf.fontFamily, 0), fontSize: conf.fontSize, fontWeight: 'bold'});
        t.position.y += text.bounds.bottom + parseInt(t.fontSize) * (text.bounds.bottom > 0 ? 3/2 : 1);
        text.addChild(t);
        // description
        var t = write(ev.description, {fontFamily: at(conf.fontFamily, 1), fontSize: conf.fontSize});
        t.position.y += text.bounds.bottom + parseInt(t.fontSize);
        text.addChild(t);
    });
    text.position.x += (chart.width - text.bounds.width) * pc + chart.left + chart.step/2;
    var minx = chart.left + 2 * margin;
    if (text.bounds.x < minx) { text.bounds.x = minx; };
    var maxx = view.size.width - 2 * margin;
    if (text.bounds.right > maxx) { text.bounds.x = maxx - text.bounds.width; }

    text.bounds.y = config.period.top + (config.years.top - config.period.top - text.bounds.height) / 2;
    var maxy = chart.top - chart.height ;
    if(text.bounds.bottom > maxy) text.bounds.y = maxy - text.bounds.height;

    // bubble 
    var r = text.bounds;
    var d = sin(45) * margin;
    var x1 = r.width * pc - margin/2; if(x1 < 0) x1 = 0;
    var x2 = x1 + margin; if(x2 > r.width) { x2 = r.width; x1 = x2 - margin; }
    
    var rect= new Path();
    rect.strokeColor = '#fc0';
    rect.fillColor = 'white';
    rect.add(new Point(r.left + x1, r.bottom + margin));
    rect.lineTo(new Point(r.left, r.bottom + margin));
    rect.arcTo(new Point(r.left - d, r.bottom + d), new Point(r.left - margin, r.bottom));
    rect.lineTo(new Point(r.left - margin, r.y));
    rect.arcTo(new Point(r.left - d, r.y - d), new Point(r.left, r.y - margin));
    rect.lineTo(new Point(r.right, r.y - margin));
    rect.arcTo(new Point(r.right + d, r.y - d), new Point(r.right + margin, r.y));
    rect.lineTo(new Point(r.right + margin, r.bottom));
    rect.arcTo(new Point(r.right + d, r.bottom + d), new Point(r.right, r.bottom + margin));
    rect.lineTo(new Point(r.left + x2, r.bottom + margin));
    rect.lineTo(new Point( (m - chart.start) * chart.step + chart.step/2 + chart.left, chart.top));
    rect.closed = true;
    
    var bubble = new Group([rect, text]);
    bubble.opacity = 0;
    return bubble;
}

function getPeriod(month) {	
	var m = typeof(month)=='number' ? month : month2int(month);

	for(var n = 0; n < TimeLine.periods.length; n++)
	{
		var p = TimeLine.periods[n];
        
		if(month2int(p.start) <= m && month2int(p.end) >= m) return p;
	}
	return null;
}

function hasNewEvent(month) {
	var m = typeof(month)=='number' ? month : month2int(month);
	var p = getPeriod(m);
	var found = [];
	for(var n = 0; n < p.events.length; n++)
	{
		var e = p.events[n];
		if(month2int(e.start) == m) found.push(e); //return e;
	}
	return found;
}

function workingArea(rect, opt) {
    var rect = new Shape.Rectangle( $.extend({ 
        point: rect.point,
        size: rect.size,
        fillColor: '#f00',
        opacity: .1
    }, opt));
    
}

// EFFECT & ANIMATIONS
function onMouseDownEvent(event)
{
    startHere.remove();
    var curr = this.data.month,
        first = config.months.start,
        items = config.months.items,
        spanto = this.data.spanto;
    for (var i = 0; i < items.length; i++)
    {
        var item = items[i];
        item.data.hover = item.data.month == curr;
        if(item.data.month >= curr && item.data.month <= spanto  ) {
            item.children[0].fillColor = '#000';
            item.children[1].fillColor = '#fff';
        } else {
            item.children[0].fillColor = item.data.color;
            item.children[1].fillColor = '#000';
        }
    }
}

function onMouseEnterEvent(event)
{
    startHere.remove();
    this.data.hover = true;
    var first = config.months.start,
        items = config.months.items;
    for(var m = this.data.month; m <= this.data.spanto; m++)
    {
        var i = m - first;
        items[i].children[0].fillColor = '#000';
        items[i].children[1].fillColor = '#fff';
    }
}

function onMouseLeaveEvent(event)
{
    this.data.hover = false;
    var items = config.months.items;
    for(var j = 0; j < items.length; j++)
    {
        items[j].children[0].fillColor = items[j].data.color;
        items[j].children[1].fillColor = '#000';
    }
}

function onFrame(e)
{
    if(busy) return;
    busy = true;
    var max = config.bubble.duration,
        effect = config.bubble.effect,
        items = config.months.items;
    
    for(var i = 0; i < items.length; i++)
    {
        var g = items[i];
        if(g.children.length < 3) continue;
        if(g.data.hover)
        {
            if(g.data.frame < max) {
                g.data.frame += 1;
                if(effect & 2)
                {
                    var k = g.data.frame / max * g.data.width / g.children[3].bounds.width;
                    g.children[3].scale(k);
                };
                g.children[3].opacity = (effect & 1) ? g.data.frame/(max+.01) : 1;
            }
        }
        else
        {    
            if(g.data.frame > 0) {
                if (effect & 2)
                {
                    var k = g.data.frame / max * g.data.width / g.children[3].bounds.width;
                    g.children[3].scale(k);
                };
                g.data.frame -= 1;
                g.children[3].opacity = (effect & 1) ? g.data.frame/max : 0;
            }
        };
    }
    
    var cycle = 100;
    if(startHere) startHere.opacity = 1/2 + Math.cos( 2*(e.count % cycle) * Math.PI / cycle ) / 3;

    busy = false;
    
}

// INITIALIZE & BUILD CHART
function startHereArrow(){
    var p = config.period,
        m = config.months;
    
    // First Event
    var first = -1;
    for(var i = m.start; i < m.end; i++)
    {
        if(first > -1) continue;
        var evs = hasNewEvent(i);
        if(evs.length>0) first = i - m.start;
    }
    first = 0;

    // Draw Arrow
    var r = new Rectangle(new Point(p.left, p.top + p.height), new Point(p.left + 100, m.top) );

    var line1 = new Path.Line(
        new Point(r.x + r.width/2, r.y),
        new Point(r.x + r.width/2, r.bottom)
    );
        
    var line2 = new Path(
        new Point(r.x, r.bottom - r.width/2),
        new Point(r.x + r.width/2, r.bottom),
        new Point(r.right, r.bottom - r.width/2)
    );

    var g = new Group({
        children: [line1, line2],
        strokeWidth: first > 0 ? 10 : 6,
        strokeColor: '#666',
        strokeCap: 'round', // round, square, butt
        scaling: first > 0 ? [.4, .4] : [.2, .4]
    });


    g.position.x = config.margin + first * m.step + m.step/2;
    //if(g.position.x < g.bounds.width) g.position.x =  config.margin + g.bounds.width;

    
    
    
    
    
    if(evs.length>0)
    {
        var p1 = g.position;
        var p2 = new Point(config.margin + first * m.step + m.step/2, m.top);
        var v = p2 - p1;
        g.rotate(v.angle - 90);   
        //Path.Line({from: p1, to: p2, strokeColor: 'red'});
    }
    
    // global access
    startHere = g;
    
}

function initHeader()
{
    var conf = config.header;
        rect = new Rectangle(conf.left, conf.top, conf.width, conf.height - conf.padding.bottom);

    var fs1 = at(conf.fontSize, 0),
        fs2 = at(conf.fontSize, 1);
    
    var r = rect.clone(); r.height *= fs1 / (fs1+fs2); 

    var t = title(TimeLine.title, r, {
        fontSize: fs1+'px', 
        fontFamily: at(conf.fontFamily, 0), 
        fillColor: at(conf.color, 0),
        //strokeWidth: .3,
        //strokeColor: '#ccc'
    });
    
    Path.Line({
        from:[t.bounds.x, r.bottom ], 
        to:[t.bounds.right, r.bottom ], 
        strokeColor: at(conf.color, 2),
        strokeWidth: .1
    });

    var r = new Rectangle( conf.left, conf.top + r.height, conf.width, rect.height * fs2 / (fs1+fs2));

    var t = title(TimeLine.description, r, {
        fontSize: fs2+'px', 
        fontFamily: at(conf.fontFamily, 1), 
        fillColor: at(conf.color, 1),
        //scaling: [1, 1]
    });
}

function initPeriods()
{

    var chart = config.months,
        conf = config.period;

    workingArea(new Rectangle(conf.left, conf.top, conf.width, conf.height), {fillColor: '#666'}); //return;
    new Path.Line({
        from:[conf.left, conf.top + conf.height ], 
        to:[conf.left + conf.width, conf.top + conf.height ], 
        strokeColor: '#ccc'            
    });

    for(var i = 0; i < TimeLine.periods.length; i++)
    {
        //if(i != 1 ) continue;
        var p = TimeLine.periods[i];
        p._start = month2int(p.start);
        p._end = month2int(p.end) + 1;
        p.width = p._end - p._start;
        var rect = new Rectangle(
            new Point(
                chart.step * ((p._start < chart.start ? chart.start : p._start) - chart.start),    
                conf.top
            ),
            new Point(
                chart.step * ((p._end > chart.end ? chart.end : p._end) - chart.start),    
                conf.top + conf.height
            )
        );
        rect.x += conf.left;

        new Path.Rectangle({
            point: rect.point,
            size : [ rect.width, config.years.top - conf.top],
            strokeColor: '#666',
            strokeWidth: .2
        });

        rect.top += conf.padding.top; rect.height -= conf.padding.top + conf.padding.bottom;
        
        var fs1 = at(conf.fontSize, 0),
            fs2 = at(conf.fontSize, 1);
        
        var r = rect.clone(); r.height = rect.height * fs1 / (fs1 + fs2);
        var t = title(p.title, r, {fillColor: at(conf.color, i), fontFamily: at(conf.fontFamily, 0), fontSize: fs1+'px', fontWeight: at(conf.fontWeight, 0), scaling: at(conf.scale, 0)});
        t.fillColor.lightness = .45;
        
        r.top += r.height; r.height = rect.height * fs2 / (fs1 + fs2);
        var subtitle = ('subtitle' in p) ? p.subtitle : dateStr(p.start) + ' - ' + dateStr(p.end);
        title(subtitle, r, {fillColor: '#333', fontFamily: at(conf.fontFamily, 1), fontSize: fs2+'px', fontWeight: at(conf.fontWeight, 1)});
    }
}

function initMonth()
{
    var conf = config.months;
    for(var m = conf.start; m < conf.end; m++)
    { 
        var p = getPeriod(m),
            cont = p._end > conf.end ? conf.end - 1 : 0;
        
        var r = new Rectangle(
            (m - conf.start) * conf.step + conf.left,
            conf.top + conf.height * 3/7,
            Math.ceil(conf.step),
            conf.height * 4/7
        );
        
        if(cont == m) {
            var rect = new Path([
                [r.x, r.y - 6],
                [r.right, r.y + r.height/2],
                [r.x, r.bottom + 6],
            ]);  
            rect.closed;
            rect.fillColor = p.color;
            var text =  title('', r, {});   
        } else {
            var rect = new Path.Rectangle({
                    point: r.point, 
                    size: r.size,
                    fillColor: p.color
                    //opacity: 0
            });
            var text = title(Months[m % 12], r, {fontFamily: at(conf.fontFamily, 0), fontSize: '10px', fontColor: '#000', fontWeight: 'bold', scaling: [.7, 1]});
        };
        
        var group = new Group([rect, text]);
        var evs = hasNewEvent(m);
        group.data = {color: p.color, month: m, spanto: 0, hover: false, frame: 0};
        if(evs.length)
        {
            var arrow = new Path([
                [r.x + r.width/5, r.y], 
                [r.x + r.width/2, conf.top], 
                [r.x + r.width*4/5, r.y]
            ]);
            arrow.fillColor = p.color;
            //arrow.opacity = .8;
            arrow.closed = true;
            
            group.addChild(arrow);
            
            var spanto = 0;
            $.each(evs, function(i, ev){
                var end = month2int(ev.end);
                if(spanto < end) spanto = end;
            });
            
            group.data.spanto = spanto;

            var bubble = makeBubble(m); 
            group.addChild(bubble);
            group.data.width = bubble.bounds.width;
        }
        conf.items.push(group);
    }
}

function initYears()
{
    var chart = config.months,
        years = config.years;
    
    for(var year = Math.floor(chart.start / 12); year < Math.ceil(chart.end / 12); year++)
    {
        var start = year * 12  - chart.start;
        var end = (year + 1 ) * 12  - chart.start;
        var rect = new Rectangle(
            new Point(
                (start < 0 ? 0 : start) * chart.step,
                years.top
            ), 
            new Point(
                (end > chart.size ? chart.size : end) * chart.step,
                years.top + years.height
            )
        );
        rect.x += chart.left;
        
        Path.Rectangle({
            point: rect.point,
            size: rect.size,
            strokeColor: '#666',
            strokeWidth: .2
        });
        var t = title(year, rect, {fontFamily: years.fontFamily, fontSize: years.fontSize, fontWeight: years.fontWeight});
        if (t.scaling.x != 1) t.opacity = 0;
    }
}

function initFooter()
{
    var conf = config.footer;
    var r = new Rectangle(config.margin, view.size.height - config.margin - conf.height, view.size.width - 2 * config.margin, conf.height)
    title(TimeLine.footnote, r, {fontFamily: conf.fontFamily, fontSize: conf.fontSize, fillColor: conf.color });
}

function validateConfig()
{
    // Header
    config.header = $.extend(
        { height: 80, padding: {bottom: 10}, fontFamily: config.fontFamily, fontSize: [24, 16], color: ['#000', '#111', '#333']},
        config.header,
        {top: config.margin, left: config.margin, width: view.size.width - 2 * config.margin}
    );
    
    // Periods
    config.period = $.extend(
        {
            height: 60, padding: {top: 6, bottom: 6 }, 
            fontFamily: config.fontFamily, fontSize: [16, 10], fontWeight: 'bold',
            scale: [[.7, 1], [1, 1]], 
            color: ['#F48E1F', '#DA5050', '#A0C1C4', '#89B4D6']
        },
        config.period,
        {top: config.header.top + config.header.height, left: config.margin, width: view.size.width - 2 * config.margin  }
    );

    for(var i = 0; i < TimeLine.periods.length; i++)
        TimeLine.periods[i].color = at(config.period.color, i);
    
    // Footer
    config.footer = $.extend(
        { height: 30, fontFamily: config.fontFamily, fontSize: 12, color: '#333'}, 
        config.footer,
        {
            left: config.margin,
            width: view.size.width - 2 * config.margin
        }
    );
    config.footer.top = view.size.height - (config.margin + config.footer.height);
    
    // Years
    config.years = $.extend(
        { height: 30, fontFamily: config.fontFamily, fontSize: 12, fontWeight: 'bold', color: '#333'}, 
        config.years,
        {
            left: config.margin,
            width: view.size.width - 2 * config.margin
        }
    );
    config.years.top = config.footer.top - config.years.height,
    
    // Months
    config.months = $.extend(
        { height: 42, fontFamily: config.fontFamily},
        config.months,
        {
            start: month2int(TimeLine.start),
            end: month2int(TimeLine.end) + 1,
            left: config.margin,
            width: view.size.width - 2 * config.margin,
            items: []
        }
    )
    config.months.top = config.years.top - config.months.height,
    config.months.size = config.months.end - config.months.start;
    config.months.step = config.months.width / config.months.size;

    config.bubble = $.extend(
        {duration: 10, effect: 3, fontFamily: config.fontFamily, fontSize: 12 },
        config.bubble
    );

}

function initialize()
{
    validateConfig();
    startHereArrow();
    initHeader();
    initPeriods();
    initMonth();
    initYears();
    initFooter();
    
    for(var i = 0; i < config.months.items.length; i++)
    {
        if(mobile) {
            config.months.items[i].onMouseDown = onMouseDownEvent;
        } else {
            config.months.items[i].onMouseEnter = onMouseEnterEvent;
            config.months.items[i].onMouseLeave = onMouseLeaveEvent;
        }
            
    };    
    busy = false;
    
}

initialize();
