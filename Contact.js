'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View
} = React;

var styles = StyleSheet.create({
  contact: {
    flex: 1,
    flexDirection: 'row',
		height: 200,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 2,
    padding: 5
  },
  name: {
    fontSize: 18
  },
  phone: {
    fontSize: 18,
    fontWeight: 'bold'
  },
	email: {
		fontSize: 14
	}
});

var Contact = React.createClass({
  render: function() {
    return (
      <View style={styles.contact}>
				<Text style={styles.name}>{this.props.givenName} {this.props.familyName}</Text>
				<Text style={styles.phone}>{this.props.phoneNumbers[0].number}</Text>
				<Text style={styles.email}>{this.props.emailAddresses[0].email}</Text>
      </View>
      );
  }
});

module.exports = Contact;