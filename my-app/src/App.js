import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Data from './weather.json'


class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      display_name: "",
      lat: "",
      lon: "",
      error: "soory something went wrong",
      errorFlag: false,
      correctFlag: false,
      cardFlag: false,
      trueData: false,
      winddir: 0, //Data.json
      cloudshi: 0,
      precip: 0,
      lowtemp: 0,
      maxtemp: 0,
      moonsetts: 0,
      datetime: "",
      temp: 0,
      mintemp: 0,
      cloudsmid: 0,
      cloudslow: 0,
      describtion:""

    }
  }

  getLocationData = async (event) =>{
    event.preventDefault();
    //send request to the third party
    const cityName = event.target.city.value;
    const key = 'pk.d63f789567346be0d16e65b136ea44aa';
    const URL = `https://us1.locationiq.com/v1/search?key=${key}&q=${cityName}&format=json`;
    
    try
    {
      let resultResponce = await axios.get(URL);
    // console.log(resultResponce.data[0].lat);

    this.setState({
      display_name: resultResponce.data[0].display_name,
      lat: resultResponce.data[0].lat,
      lon: resultResponce.data[0].lon,
      correctFlag:true,
      cardFlag:true,
      errorFlag: false
    })
    this.checkData(resultResponce.data[0].lat,resultResponce.data[0].lon);
    
    } 
    catch
    {
      this.setState({
        errorFlag: true,
        correctFlag:false,
      cardFlag:false
      })
    }
    // console.log(Data)

   

    //ahmad 
    
  
  }

  c = (d) =>{
    console.log(d)
  }

  checkData= (lat,lon) =>{
     Data.map(item => {
      if(lat === item.lat && lon === item.lon){
        console.log("true")
        return(
          this.setState({
            trueData:true,
            winddir: item.data[0].wind_dir,
            cloudshi: item.data[0].clouds_hi,
            precip: item.data[0].precip,
            lowtemp: item.data[0].low_temp,
            maxtemp: item.data[0].max_temp,
            moonsetts: item.data[0].moonset_ts,
            datetime: item.data[0].datetime,
            temp: item.data[0].temp,
            mintemp: item.data[0].min_temp,
            cloudsmid: item.data[0].clouds_mid,
            cloudslow: item.data[0].clouds_low,
            describtion:item.data[0].weather.description,
          })
        )
          
      }
      }
     
    )

  }


  render(){
    return(
      <div>
        <h1>location Application</h1>

    <Form onSubmit={this.getLocationData}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>City Name</Form.Label>
        <Form.Control type="text" name="city" placeholder='please enter a city name...' />
      </Form.Group>


      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>


    <br></br>
    {this.state.cardFlag && <Card style={{ width: '30rem' }}>
    {this.state.correctFlag && <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=pk.d63f789567346be0d16e65b136ea44aa&center=${this.state.lat},${this.state.lon}`} />}
      <Card.Body>
        
        <Card.Text>
        {this.state.correctFlag && <h3>Display Name: {this.state.display_name}</h3>}
        {this.state.correctFlag &&  <p>Longitude: {this.state.lon}</p>}
        {this.state.correctFlag && <p>Latitude: {this.state.lat}</p>}
        
        </Card.Text>
      </Card.Body>
    </Card>}
    {this.state.errorFlag && <h4>Error: {this.state.error}</h4>}

    <br></br>
    {this.state.trueData && <Card style={{ width: '100rem' }}>
      <Card.Body>
        <Card.Title>Forcast for: {this.state.display_name}</Card.Title>
        <Card.Text>"wind_dir":{this.state.winddir}</Card.Text>
        
        <Card.Text>cloudshi: {this.state.cloudshi}</Card.Text>
        <Card.Text>precip: {this.state.precip}</Card.Text>
        <Card.Text>lowtemp: {this.state.lowtemp}</Card.Text>
        <Card.Text>maxtemp: {this.state.maxtemp}</Card.Text>
        <Card.Text>moonsetts: {this.state.moonsetts}</Card.Text>
        <Card.Text>datetime: {this.state.datetime}</Card.Text>
        <Card.Text>temp: {this.state.temp}</Card.Text>
        <Card.Text>mintemp: {this.state.mintemp}</Card.Text>
        <Card.Text>cloudsmid: {this.state.cloudsmid}</Card.Text>
        <Card.Text>cloudslow: {this.state.cloudslow}</Card.Text>
        <Card.Text>describtion:{this.state.describtion}</Card.Text> 
      </Card.Body>
    </Card>}
    <h1>{this.state.time}</h1>
    
      </div>
    )
  }
}

export default App;