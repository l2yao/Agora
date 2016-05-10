'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ListView,
} = React;

var Contact = require('./Contact');
var ContactsData = require('react-native-contacts');

var ContactList = React.createClass({
	
  getInitialState: function() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return {
      dataSource: ds.cloneWithRows([])
    };
  },

  componentDidMount: function() {
    this.getContacts();
  },

  renderRow: function(rowData) {
    return (<Contact
              givenName={rowData.givenName}
							familyName={rowData.familyName}
              phoneNumbers={rowData.phoneNumbers}
              emailAddresses={rowData.emailAddresses}/>
						);
  },

  getContacts: function() {
		var contactList = [];
		// prefetch contact list
		ContactsData.getAll((err, contacts) => {
			if(err && err.type === 'permissionDenied'){
				// x.x
				console.log("error fetching contacts");
			} else {
				contactList = contacts;
			}
		});

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(contactList)
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          contentContainerStyle={styles.listContent}
          style={styles.list}
          />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 24
  },
  list: {
    flex: 1,
    flexDirection: 'row'
  },
  listContent: {
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    flex: 1,
    fontSize: 24,
    padding: 42,
    borderWidth: 1,
    borderColor: '#DDDDDD'
  }
});

module.exports = ContactList;
