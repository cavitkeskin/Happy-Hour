var offset = 50;
var h = 60;
var w = 4 * Math.PI * h/2 + 1;

var e = new Path({
    segments: [[0, h], [w, h]]
});

var g = new Group([e]);
for(var x = 0; x < w; x = x + 90/180*Math.PI*h/2){
    var e = new Path({segments: [[x, h-2],[x, h+4]]});
    g.addChild(e);
}

g.strokeColor = 'gray';
g.position += [offset, offset];

var c = new Group([
    new Path.Circle({ center: [h/2, h/2], radius: h/2}),
    new Path.Line([0, h/2], [h, h/2]),
    new Path.Line([h/2, 0], [h/2, h]),
    new Path.Circle({ center: [h/2, h/2], radius: h/20})
]);

c.strokeColor = 'gray';
c.strokeWidth = 3;
c.position += [offset - h/2, offset];
c.data.deg =  0;

function onFrame(e)
{
    c.position.x = offset + w/2 + w/2 * Math.sin(e.count * Math.PI / 180);
    var x = c.position.x - offset;
    var d = x * 180 / (Math.PI * h/2);
    c.rotate(d - c.data.deg);
    c.data.deg = d ;

} 