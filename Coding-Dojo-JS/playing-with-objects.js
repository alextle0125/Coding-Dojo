var users = [{name: "Michael", age:37}, {name: "John", age:30}, {name: "David", age:27}];

console.log(users[1].age);
console.log(users[0].name);
var i = 0, len = users.length;
for(; i < len; i++){
	console.log(users[i].name +  " - " + users[i].age);
}