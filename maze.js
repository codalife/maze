class Tree {
	constructor (x, y) {
		this.x = x;
		this.y = y;
		this.children = {};
		this.directions = [];
	}
}

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const shuffle = function (array) {

	for (let i = 0; i < array.length; i ++) {
		let random = Math.floor(Math.random() * (array.length - i));

		let temp = array[i];
		array[i] = array[random + i];
		array[random + i] = temp;
	}

	return array.slice();
}

class Maze {
	constructor (length, height) {
		this.length = length;
		this.height = height;
		this.enemy = new Tree(0, 0);
		this.graph = {};

		this.createMaze(this.enemy);
	}
	// where to put a player ? for later
	createMaze (tree) {
		this.graph[tree.x + ',' + tree.y] = tree;

		tree.directions = shuffle(directions);

		while (tree.directions.length > 0) {
			let move = tree.directions.pop();
			let next = {};
			next.x = tree.x + move[0];
			next.y = tree.y + move[1];

			if (next.x >= 0 && next.x < this.length
                && next.y >= 0 && next.y < this.height
                && !this.graph.hasOwnProperty(next.x + ',' + next.y) ) {

				let nextTree = new Tree(next.x, next.y);
				nextTree.children[tree.x + ',' + tree.y] = tree;
				tree.children[next.x + ',' + next.y] = nextTree;

				this.createMaze(nextTree);
			}
		}
	}
}

// const t = new Maze(4, 4);
// console.log(Object.keys(t.graph).length)
// Object.keys(t.graph).forEach(n => console.log(t.graph[n]))