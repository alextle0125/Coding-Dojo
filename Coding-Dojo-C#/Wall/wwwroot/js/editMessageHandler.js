$(document).ready(function(){
	Date.prototype.toDatetimeLocal = function toDatetimeLocal(){
		var date = this,
			ten = function(i){
				return (i < 10 ? '0' : '') + i;
			},
			YYYY = date.getFullYear(),
			MM = ten(date.getMonth()+1),
			DD = ten(date.getDate()),
			HH = ten(date.getHours()),
			II = ten(date.getMinutes()),
			SS = ten(date.getSeconds());

			return YYYY + '-' + MM + '-' + DD + 'T' + HH + ':' + II + ':' + SS;
	}

	$(".edit-button").click(function(e){
		e.preventDefault();

		var messageId = e.target.id.match(/\w+-(\d+)/)[1];

		$("div#" + e.target.id).html();

		var messageCriteria = $("#" + e.target.id + " .message-criteria"),
			messageFrom = $(messageCriteria[0]).text(),
			messageCreatedAt = $(messageCriteria[1]).text(),
			messageContent = $(messageCriteria[2]).text();

		$("div#" + e.target.id).html("<form action='Message/" + messageId + "/Update' method='POST'><h3>" + messageFrom + "</h3><br><h5>" + messageCreatedAt + "</h5><br><textarea name='content'>" + messageContent + "</textarea><br><input value='Update' type='submit'></form>");
	});
});

