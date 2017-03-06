import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';

import update from 'react-addons-update';
export default class Contact extends React.Component {
  constructor(props){
    super(props);
    this.state={
      selectedKey: -1,
      keyword: '',
      contactData:[
        {name: '11Abet', phone: '010-000-1001'},
        {name: 'Betty', phone: '010-000-2002'},
        {name: 'Charlie', phone: '010-000-3003'},
        {name: 'David', phone: '010-000-4004'},
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }


  handleClick(key) {
    console.log(key);
    this.setState({
      selectedKey: key
    });
  }

  handleCreate(contact){
    this.setState({
      contactData: update(this.state.contactData, {$push:[contact]})
    });
  }

  handleRemove(){
    if(this.state.selectedKey < 0){
      return;
    }
    this.setState({
      contactData: update(this.state.contactData,
        { $splice:[[this.state.selectedKey,1]] }
      ),
      selectedKey: -1
    });
  }

  handleEdit(name, form) {
    this.setState({
      contactData: update(this.state.contactData,
        {
          [this.state.selectedKey]: {
            name:{ $set: name },
            phone:{ $set: phone }
          }
        }
      )
    });
  }

  render(){
    const mapToComponents = (data) => {
      data.sort();
      data = data.filter((contact)=>{
        return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
      });

      return data.map((contact, i) => {
        return (<ContactInfo
          contact={contact}
          key={i}
          onClick={() => this.handleClick(i)}
          />);
      });
    };

    return (
      <div>
        <h1>Contacts</h1>
        <input
          name="keyword"
          placeholder="Search"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        <div>{mapToComponents(this.state.contactData)}</div>
        <ContactDetails
          isSelected={this.state.selectedKey != -1}
          contact = {this.state.contactData[this.state.selectedKey]}
          onRemove={this.handleRemove}
        />
        <ContactCreate
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}
