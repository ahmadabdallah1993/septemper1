import React from 'react';
import axios from 'axios';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      display_name: "",
      lat: "",
      lon: "",
      error: "sooryyyyyyyyyyyyyyyyyyyyy",
      errorFlag: false,
      trueFlag:false
    }
  }



  getCityName = async (event) =>{
    event.preventDefault();
    
    const cityName = event.target.city.value;
    const key = 'pk.d63f789567346be0d16e65b136ea44aa';
    const URL = `https://us1.locationiq.com/v1/search?key=${key}&q=${cityName}&format=json`
    
   


    try{
      const resp = await axios.get(URL);
      console.log(resp.data[0])
  
      this.setState({
        display_name: resp.data[0].display_name,
        lat: resp.data[0].lat,
        lon: resp.data[0].lon,
        errorFlag: false,
        trueFlag: true
      })

    } catch {
      this.setState({
        errorFlag: true,
        trueFlag:false
      })
    }



  }




  render(){
    return(

      <div>
        <h1>Welcome to the weather Website</h1>

        <form onSubmit={this.getCityName}>
          <input type="text" name="city" placeHolder="please enter a city name"/>
          <button type="submit">Submit</button>
        </form>

        {this.state.trueFlag && 
        <div>
        <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.d63f789567346be0d16e65b136ea44aa&center=${this.state.lat},${this.state.lon}`} alt="img"/>
        <h4>display_name: {this.state.display_name}</h4>
        <p>lat: {this.state.lat}</p>
        <p>lon: {this.state.lon}</p>
        </div>
        }

        
        {this.state.errorFlag && <p>ERROR: {this.state.error} </p>}
        
        
      </div>
    )
  }
}
export default App;