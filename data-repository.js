class DataRepository {
	getDepartmentsQuery = 'SELECT * FROM Departments';
	getPenises = 'SELECT * FROM Penises';
	getOrders = 'SELECT * FROM Orders';
	
	getQuery(prompt) {
	const firstElement = prompt[0];
	let query;
	
	if (firstElement === 'View all Departments'){
	query = this.getDepartmentsQuery;
	} else if (firstElement === 'View all Penises'){
	query = this.getPenises;
	} else if (firstElement === 'Get all orders') {
	query = this.getOrders;
	}
	
	return query;
	}
	
	executeQuery(prompt, callback) {
	const query = this.getQuery(prompt);
	//create connection
	const connection;
	
	connection.runQuery(query, callback);
	}
	}
	
	
	///////////////
	var dataRepository = new DataRepository();
	dataRepository.executeQuery(promptData, results => {
	
	});