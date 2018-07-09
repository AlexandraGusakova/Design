function OrderFormController($scope){

	$scope.Pizza = [
		{
			name: 'Italian',
			price: 17.9,
            description: 'pizza sauce, pepperoni, fresh champignons, brisket (pork), olives, mozzarella cheese, basil',
            photo: 'images/italian.jpg',
            wishes: '',
			active:false
		},{
			name: 'Peperoni',
			price: 23.5,
            description: 'pizza sauce, pepperoni, mozzarella cheese, basil',
            photo: 'images/peperoni.jpg',
            wishes: '',
			active:false
		},{
			name: 'Mushroom',
			price: 14,
            description: 'Garlic sauce, ham, fresh champignons, mozzarella cheese, basil',
            photo: 'images/mushroom.jpg',
            wishes: '',
			active:false
		},{
			name: 'Bavarian',
			price: 16.4,
            description: '(new recipe) sweet mustard sauce, hunting sausages, fresh champignons, fresh onions, fresh tomatoes, mozzarella cheese, basil',
            photo: 'images/bavarian.jpg',
            wishes: '',
			active:false
		}
	];
    
    	$scope.Sushi = [
		{
			name: 'Бонито маки',
			price: 17.9,
            description: 'pizza sauce, pepperoni, fresh champignons, brisket (pork), olives, mozzarella cheese, basil',
            photo: 'images/italian.jpg',
            wishes: '',
			active:false
		},{
			name: 'Филадельфия маки',
			price: 23.5,
            description: 'pizza sauce, pepperoni, fresh champignons, brisket (pork), olives, mozzarella cheese, basil',
            photo: 'images/italian.jpg',
            wishes: '',
			active:false
		},{
			name: 'Унаги маки',
			price: 14,
            description: 'pizza sauce, pepperoni, fresh champignons, brisket (pork), olives, mozzarella cheese, basil',
            photo: 'images/italian.jpg',
            wishes: '',
			active:false
		},{
			name: 'Дракон маки',
			price: 16.4,
            description: 'pizza sauce, pepperoni, fresh champignons, brisket (pork), olives, mozzarella cheese, basil',
            photo: 'images/italian.jpg',
            wishes: '',
			active:false
		}
	];
    
    	$scope.Lapsha = [
		{
			name: 'Лапша с креветками',
			price: 17.9,
            description: 'pizza sauce, pepperoni, fresh champignons, brisket (pork), olives, mozzarella cheese, basil',
            photo: 'images/italian.jpg',
            wishes: '',
			active:false
		},{
			name: 'Лапша с японским омлетом',
			price: 23.5,
            description: 'pizza sauce, pepperoni, fresh champignons, brisket (pork), olives, mozzarella cheese, basil',
            photo: 'images/italian.jpg',
            wishes: '',
			active:false
		},{
			name: 'Лапша с угрём',
			price: 14,
            description: 'pizza sauce, pepperoni, fresh champignons, brisket (pork), olives, mozzarella cheese, basil',
            photo: 'images/italian.jpg',
            wishes: '',
			active:false
		},{
			name: 'Лапша c мокрским окунем',
			price: 16.4,
            description: 'pizza sauce, pepperoni, fresh champignons, brisket (pork), olives, mozzarella cheese, basil',
            photo: 'images/italian.jpg',
            wishes: '',
			active:false
		}
	];

	$scope.toggleActive = function(s){
		s.active = !s.active;
	};

	$scope.total = function(){

		var total = 0;
		angular.forEach($scope.Pizza, function(s){
			if (s.active){
				total+= s.price;
			}
		});
        
        angular.forEach($scope.Sushi, function(s){
			if (s.active){
				total+= s.price;
			}
		});
        
        angular.forEach($scope.Lapsha, function(s){
			if (s.active){
				total+= s.price;
			}
		});

		return total;
	};
}
