appDirectives.directive('timeToSeconds', function() {
	return {
		restrict: 'A',
		require: '^ngModel',
		link: function(scope, element, attrs, modelCtrl) {

			if(attrs.type != "time") {
				console.error("time-duration directive can work only with a input of type time");
			}

			function formatter(value) {
				if(value){
					var t = new Date(1970,0,1);
					t.setSeconds(value);
					return t;
				}
			}

			function parser(value) {
				if(value) {
					return value.getHours() * 3600 + value.getMinutes() * 60 + value.getSeconds()
				}
				return value;
			}

			modelCtrl.$parsers.push(parser);
			modelCtrl.$formatters.push(formatter);
			
			modelCtrl.$validators.integer = function(modelValue, viewValue) {
				if (modelCtrl.$isEmpty(modelValue)) {
					return true;
				}
				return modelValue > 0;
			};

		}
	}
});