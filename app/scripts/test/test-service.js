appModul.factory('testService', function(QUESTION_TYPE, COUNT_ASNWERS) {

	var service = {};

	var data = [
	{
		id: 1,
		name: 'Test mock',
		timeSeconds: 3600,
		questions: [
			{
				text: 'Ktera z techto moznosti je spravna?',
				type: QUESTION_TYPE.TEST,
				answerType: COUNT_ASNWERS.SINGLE,
				timeSeconds: 3600,
				answers: [{id: 1, text: 'Tahle prvni', correct: true, marked: false}, {
					id: 2,
					text: 'Tahle druha',
					correct: false,
					marked: false
				}]
			},
			{
				text: 'Ktera z techto moznosti je spravna2?',
				type: QUESTION_TYPE.TEST,
				answerType: COUNT_ASNWERS.MULTIPLE,
				timeSeconds: 3600,
				answers: [{text: 'Tahle prvni', correct: true, marked: false}, {
					text: 'Tahle druha',
					correct: false,
					marked: false
				}]
			}
		]
	},
	{
		id: 1,
		name: 'Test mock2',
		timeSeconds: '2',
		questions: [
		{text: 'Ktera z techto moznosti je spravna?', answers: [{text: 'Tahle prvni'}, {text: 'Tahle druha'}]}
		]
	}
	];

	service.getTests = function() {
		return data;
	}

	service.getTest = function() {
		return data[2];
	}

	service.createTest = function(template) {
		data.push(template);
	}

	return service;

});