/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, { 
	Component,
} from 'react';

import {
	AppRegistry, 
	ListView, 
	StyleSheet, 
	Text, 
	View, 
} from 'react-native';

var ContactsData = require('react-native-contacts');

var FAKE_DATA = [
	{
		recordID : 1,
		familyName : "Smith",
		givenName : "John",
		phoneNumbers : [
			{
				label : "mobile",
				number : "111-222-3333"
			}
		],
		emailAddresses : [
			{
				label : "work",
				email : "john.smith@work.com"
			}
		]
	},
	{
		recordID : 2,
		familyName : "Doe",
		givenName : "Jane",
		phoneNumbers : [
			{
				label : "mobile",
				number : "222-333-4444"
			}
		],
		emailAddresses : [
			{
				label : "personal",
				email : "jane.doe@me.com"
			}
		]
	},
	{
		recordID : 3,
		familyName : "Johansson",
		givenName : "Scarlett",
		phoneNumbers : [
			{
				label : "mobile",
				number : "666-777-8888"
			}
		],
		emailAddresses : [
			{
				label : "work",
				email : "scarlett.johansson@hollywood.com"
			}
		]
	}
];

var styles = StyleSheet.create({
	container : {
		flex : 1,
		justifyContent : "center"
	},
	listView : {
		backgroundColor : "#EEEEEE"
	},
	listItem : {
		paddingTop : 10,
		paddingBottom : 10,
		borderBottomWidth : 1
	},
	name : {
		color : "#6699AA",
		fontWeight : "bold"
	},
	phone : {
		fontSize : 12
	},
	email : {
		fontSize : 12
	}
})

class Agora extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			error : {
				message : "something went wrong"
			},
			dataSource : new ListView.DataSource({ 
				rowHasChanged: (row1, row2) => row1 !== row2, 
			}),
			loaded : false
		};
	}
	
	componentDidMount() {
		this.getContacts();
	}
	
	getContacts() {
		// prefetch contact list
		ContactsData.getAll((err, contacts) => {
			if(err && err.type === 'permissionDenied'){
				this.setState({
					error : {
						message : "error fetching contacts"
					}
				});
			} else {
				console.log("*** contacts=", contacts);
				
				this.setState({
					dataSource : this.state.dataSource.cloneWithRows(contacts),
					loaded : true
				});
			}
		});
		/*
		this.setState({
			dataSource : this.state.dataSource.cloneWithRows(FAKE_DATA),
			loaded : true
		});
		*/
	}
	
	renderFailedView(error) {
		return (
			<View style={styles.container}>
				<Text>{error.message}</Text>
			</View>
		)
	}
	
	renderContact(contact) {
		var fullName = contact.givenName + " " + contact.familyName;
		var phoneNumber = contact.phoneNumbers[0] ? contact.phoneNumbers[0].number : "n/a";
		var emailAddress = contact.emailAddresses[0] ? contact.emailAddresses[0].email : "n/a";
		
		return (
			<View style={styles.listItem}>
				<Text style={styles.name}>Name: {fullName}</Text>
				<Text style={styles.phone}>Phone: {phoneNumber}</Text>
				<Text style={styles.email}>Email: {emailAddress}</Text>
			</View>
		)
	}
	
	renderContactList() {
		return (
			<View style={styles.container}>
				<ListView 
					dataSource={this.state.dataSource} 
					renderRow={this.renderContact} 
					style={styles.listView} 
				/>
			</View>
		)
	}
	
	render() {
		if (!this.state.loaded) {
			console.log("failed");
			return this.renderFailedView(this.state.error);
		}		
		else {
			console.log("success");
			return this.renderContactList();
		}
	}
};

AppRegistry.registerComponent('agora', () => Agora);
