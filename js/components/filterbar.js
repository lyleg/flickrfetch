//simple filterbar, due to time contraint is coupled to photo title, only supports local sorting and filtering
import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavItem, Input, NavBrand } from 'react-bootstrap'

class FilterBar extends Component{
    constructor(props){
        super(props);
        this.state = {title: '', sort: false};
    }
    onChange(event){
        const filter = event.target.value;
        const photos = this.props.photo.filter((photo)=>{
            if(photo.title.substr(0,filter.length) === filter){
                return true;
            }
        });
        this.props.onChange({
            filter: filter,
            renderedPhotos: photos
        });
    }
    render(){
        return (
            <Navbar fluid>
                <NavBrand><a href="#">Flickr Fetch</a></NavBrand>
                <Nav right style = {{marginRight: '10', marginTop: '10'}}>
                        <Input type = "text" placeholder = "Filter by title" onChange = {this.onChange.bind(this)} value = {this.props.filter} /> 
                </Nav>
            </Navbar>
         );
    }

}

FilterBar.PropTypes = {
    photos: React.PropTypes.object.isRequired,
    onFilterChange: React.PropTypes.func.isRequired
};

export default FilterBar
