/*

    road max length
        2.PI.r + 2.PI.r + 2r = w
        4pr + 2r = w
        (4p+2).r = w
        r = w / (4p+2)
        

*/

var r = Math.floor(view.size.width / (4 * Math.PI + 3)); 
if(3*r > view.size.height) r = Math.floor(view.size.height/3);
var h = 2*r;
var w = 4 * Math.floor(Math.PI * r + 1);
var offset = new Point(3*r/2, r/2); //Math.floor((view.size.width - w) / 2);

var e = new Path({
    segments: [[0, h], [w, h]]
});

var g = new Group([e]);
for(var x = 0; x < w; x = x + 90/180*Math.PI*h/2){
    var e = new Path({segments: [[x, h-2],[x, h+4]]});
    g.addChild(e);
}

g.strokeColor = 'gray';
g.position += offset;

var c = new Group([
    new Path.Circle({ center: [h/2, h/2], radius: h/2}),
    new Path.Line([0, h/2], [h, h/2]),
    new Path.Line([h/2, 0], [h/2, h]),
    new Path.Circle({ center: [h/2, h/2], radius: h/20})
]);

c.strokeColor = 'gray';
c.strokeWidth = 3;

c.position += offset;
c.data.deg =  0;

function onFrame(e)
{
    c.position.x = offset.x + w/2 + w/2 * Math.sin(e.count * Math.PI / 180);
    var x = c.position.x - offset.x;
    var d = x * 180 / (Math.PI * h/2);
    c.rotate(d - c.data.deg);
    c.data.deg = d ;

} 