var React = require('react');
var ReactDOM = require('react-dom');
var DatePicker = require('react-datepicker');
var moment = require('moment');

var Datepicker = React.createClass({

	getInitialState: function() {
		return {
			startDate: moment(),
			endDate: moment().day(7),
			dateCollection: []
		}
	},

	handleStartDate: function(date) {
		this.setState({
			startDate: date
		})
	},

	handleEndDate: function(date) {
		this.setState({
			endDate: date
		});
	},

	addDate: function() {
 		this.setState({
 			dates: this.state.dateCollection.concat({start: this.state.startDate.format('DD-MM-YYYY'), end: this.state.endDate.format('DD-MM-YYYY')})
 		})
 	},

	render: function() {
		console.log(this.state.dateCollection)
		return(
			<div>
				<DatePicker selected={this.state.startDate} onChange={this.handleStartDate} />
				<DatePicker selected={this.state.endDate} onChange={this.handleEndDate} />
				<button onClick={this.addDate}>Save Date</button>
				<DateList items={this.state.dates} />
			</div>
		)
	}

})

var DateList = React.createClass({

	render: function() {

		var createItem = function(item, index) {
			return <li key={index}>{item.start} to {item.end}</li>;
		};

		return <ul>{this.props.items ? this.props.items.map(createItem) : null}</ul>;

	}
	
});

ReactDOM.render(
	<Datepicker />,
	document.getElementById('app')
)