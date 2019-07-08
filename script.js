var draw = SVG("game").size(480, 360);
var background = draw.image("space.png", 480, 322)
var bird = draw.image("bird.png", 40, 30).move(30, 160)
var column_top = draw.image("column_top.png", 62, 120).move(480, -30)
var column_bottom = draw.image("column_bottom.png", 62, 120).move(480, 230)
var ground = draw.image("ground.png", 480, 84).move(0, 322)
var road = draw.image("road.png", 480, 14).move(0, 322)
var roadClone = road.clone().x(480)
var changeY = 0
var score = 0
var speed = -4
var text = draw.text("0").move(400, 20).fill(
	"white"
).font({
	size: 40
})

var group = draw.group().x(0)
group.add(column_top)
group.add(column_bottom)
for (var i = 1; i < 4; i++){
	var new_top = column_top.clone()
	new_top.dx(120 * i)
	var new_bottom = column_bottom.clone()
	new_bottom.dx(120 * i)
	group.add(new_top)
	group.add(new_bottom)
}

function update() {
	var columns = group.children()
	for (let i = 0; i < columns.length; i = i + 2) {
		let columnTop = columns[i];
		let columnBottom = columns[i + 1];
		columnTop.dx(speed);
		columnBottom.dx(speed);

		let collisionTop = bird.x() + bird.width() > columnTop.x() && bird.x() < columnTop.x() + columnTop.width() && bird.y() < columnTop.y() + columnTop.height();

		let collisionBottom = bird.x() + bird.width() > columnBottom.x() && bird.x() < columnBottom.x() + columnBottom.width() && bird.y() + bird.height() > columnBottom.y();


		if (collisionTop || collisionBottom) {
			alert("Пингвин пострадал");
			clearInterval(id_interval);
		}
		if (columnTop.x() <= 0) {
			columnTop.x(480)
			columnBottom.x(480)
			columnTop.y(getRandomInt(-70, -10))
			columnBottom.y(getRandomInt(220, 280))
			score++
			text.text("" + score)

			if (score == 10) {
				speed = -5
			}
		}
		/*columns[i].dx(speed)
		if (columns[i].x() <= 0) {
			columns[i].x(480)
		}
		if (bird.x() + bird.width() >= columns[i].x() + columns[i].width() && bird.y() + bird.height() >= columns[i].y() + columns[i].height()) {
		clearInterval(id_interval)
	}
		if (columns[i].height() + columns[i].y() >= bird.y() && columns[i].y() >= bird.y() + bird.height() && columns[i].width() + columns[i].x() <= bird.x() && columns[i].x() <= bird.x() + bird.width()) {
			clearInterval(id_interval)
		}*/
	}
	//column_top.dx(speed)
	//column_bottom.dx(speed)
	road.dx(speed)
	roadClone.dx(speed)

	if (roadClone.x() <= -480) {
		roadClone.x(480)
	}
	if (road.x() <= -480) {
		road.x(480)
	}




	bird.dy(changeY)
	changeY = changeY + 0.1
	if (bird.y() <= 0) {
		bird.y(0)
	}
	if (bird.y() + bird.height() >= 322) {
		alert("Game Over")
		clearInterval(id_interval)
	}


	//if (column_top.height() + column_top.y() >= bird.y() && column_top.width() + column_top.x() >= bird.x() && column_top.x() <= bird.x()) {
	//if (bird.y() + bird.height() >= column_top.y() && bird.x() + bird.width() > column_top.x() && bird.x() < column_top.x() + column_top.width()) {

}





var id_interval = setInterval(update, 10)
document.onkeydown = function (event) {
	if (event.keyCode == 32) {
		changeY = -3

	}



}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
