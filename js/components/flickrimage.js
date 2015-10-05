//responsible for building flickr url and displaying image, would be a good place to add logic for a lightbox to display large photo version
import React, { Component, PropTypes} from 'react';
import { Panel } from 'react-bootstrap';

class FlickrImage extends Component{
    render(){
        const { photo } = this.props;
        const url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
        return (
            <Panel header = {photo.title}>
                <img title = {photo.title} src = {url} />
            </Panel>
        );   
    }

}

FlickrImage.PropTypes = {
    photo: React.PropTypes.object.isRequired
};

export default FlickrImage;
