import React, { Component, PropTypes} from 'react';
import  RestWrapper from 'restwrapper';
import { Grid, Row, Col } from 'react-bootstrap';
import FilterBar from '../components/filterbar';
import FlickrImage from '../components/flickrimage';

const flickrAPI = new RestWrapper('https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key={API_KEY}&user_id={USER_ID}&format=json&nojsoncallback=1');

//Component responsible for loading flick api, mantaining photo data, rendering filter bar and photos
class App extends Component{
    constructor(props){
        super(props);
        this.state = {photos: {
            photo: []
        },
        renderedPhotos:[],
        filter: ''};
    }
    /**
     *fire API request on the mounting of component, in proper flux, we would fire an action here
     * App component is now responsible for owning photo data, in proper flux this would go in a store
     * going to keep an original copy of photo array in here for when filter contraints are removed, again, this would normally be owned by a store
     */
    componentWillMount(){
             flickrAPI.get({API_KEY: this.props.API_KEY, USER_ID: this.props.USER_ID}).then((response)=>{
            this.setState({
               photos: response.body.photos,
               renderedPhotos: response.body.photos.photo
            });
        });
    }
    //take results from filter and apply to app state, important to note that this component owns the actual filter data
    onFilterChange(newState){
        this.setState(newState); 
    }
    render(){
        return (
            <Grid>
                <FilterBar photo = {this.state.photos.photo} filter = {this.state.filter} onChange = {this.onFilterChange.bind(this)}/>
                {this.state.renderedPhotos.map((photo, i)=>{
                    return (
                        <Row>
                            <Col mdOffset = {2} md = {8}>
                                <FlickrImage photo = {photo} key = {i} />
                            </Col>
                        </Row>);
                })}
            </Grid>
        );
    
    }

}

App.defaultProps = {
    USER_ID: '132365033@N08',
    API_KEY: 'a5e95177da353f58113fd60296e1d250'
};

export default App
