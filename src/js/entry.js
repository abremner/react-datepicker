var React = require('react');
var ReactDOM = require('react-dom');
var DatePicker = require('react-datepicker');
var moment = require('moment');

// import css
import '../css/master.scss';

var Datepicker = React.createClass({

	// set inital state
	getInitialState: function() {
		
		var savedDate = [];

		if (localStorage.getItem('react-daterange') != null) {
			savedDate = JSON.parse(localStorage.getItem('react-daterange'));
		}

		return {
			startDate: moment(),
			endDate: moment().day(3),
			dateCollection: savedDate
		}

	},

	// handle start date
	handleStartDate: function(date) {

		this.setState({
			startDate: date
		})

	},

	// handle end date
	handleEndDate: function(date) {

		this.setState({
			endDate: date
		});
	
	},

	addDate: function() {

		// Add the start and end time to the dateCollection array
		this.state.dateCollection.unshift({start: this.state.startDate.format('Do MMM YYYY'), end: this.state.endDate.format('Do MMM YYYY')});
		
		// Store dates
		localStorage.setItem('react-daterange', JSON.stringify(this.state.dateCollection));

		// Update the state
		this.setState({
			dateCollection: this.state.dateCollection
		})

 	},

 	clearDates: function() {

		localStorage.removeItem('react-daterange');

 		this.setState({
			dateCollection: []
		})
 	},

 	// Render the page
	render: function() {

		return(
			<div>
				<div className="jumbotron">
		      		<div className="container text-center">
		        		<h1>Save the date!</h1>
		       			<p>The ultimate resource for putting those all important date ranges in a list.</p>
		       			<div className="row form-inline">
			       			<div className="col-sm-6 col-sm-offset-3">
			       				<div className="form-group start-date">
			       					<label>Start date:</label>
			        				<DatePicker className="form-control required" selected={this.state.startDate} onChange={this.handleStartDate} dateFormat="DD/MM/YYYY" />
								</div>
								<div className="form-group end-date">
									<label>End date:</label>
									<DatePicker className="form-control required" selected={this.state.endDate} onChange={this.handleEndDate} dateFormat="DD/MM/YYYY" />
								</div>
							</div>
						</div>
						<br />
						<button className="btn btn-primary" onClick={this.addDate}>Save Date</button>
						
		     		</div>
		    	</div>
		    	<div className="container text-center">
		    		{(this.state.dateCollection.length
		    			? <button className="btn btn-link" onClick={this.clearDates}>Clear Dates</button>
		    			: <i>No dates added.</i>
					)}
					<DateList items={this.state.dateCollection} />
				</div>
			</div>
		)
	}

})

// Seperate class to return the list of dates
var DateList = React.createClass({

	render: function() {
		var createItem = function(item, index) {
			return <li key={index}><strong>{item.start}</strong> <i>to</i> <strong>{item.end}</strong></li>;
		};
		return <ul>{this.props.items ? this.props.items.map(createItem) : null}</ul>;
	}

});

// Render to DOM
ReactDOM.render(
	<Datepicker />,
	document.getElementById('app')
)