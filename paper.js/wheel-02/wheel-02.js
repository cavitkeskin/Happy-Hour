
var r = 30;
var w = view.size.width;

var road = new Path.Arc([2*r, 6*r], [w/2, 10*r], [w-2*r, 6*r]);
road.strokeColor = 'black';

new Path.Line({from: [2*r, 6*r], to: [w/2, 10*r], strokeColor: '#f88'});
new Path.Line({from: [w-2*r, 6*r], to: [w/2, 10*r], strokeColor: '#f88'});



function makeWheel (r)
{
    var c = new Group([
        new Path.Circle({ center: [r, r], radius: r, strokeWidth: r/10}),
        new Path.Line([0, r], [2*r, r]),
        new Path.Line([0, r], [2*r, r]).rotate(45),
        new Path.Line([0, r], [2*r, r]).rotate(90),
        new Path.Line([0, r], [2*r, r]).rotate(135),
        new Path.Circle({ center: [r, r], radius: r/5, fillColor: 'white', strokeWidth: r/4})
    ]);
    c.strokeColor = 'gray';
    return c;
}

//var wheel = makeWheel(r);

