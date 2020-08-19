
import React, { Component } from "react";
import './App.css';
import axios from 'axios';


class App extends Component {
  state = {
    apikey:"Type your API Key Here",
    forecast: [],
     searchInput: "Sydney",
     temp: "",
     weatherIcon: "",
     feels_like: "",
     temp_min: "",
     temp_max: "",
     humidity:"",
     pressure:"",
     cardinal:"",
     wind:"",
     clouds:"",
     sunrise:"",
     sunset: ""
  };

  async componentDidMount() {
   
    //Get the API Weather //
    var {data:forecast} = await axios.get("http://api.openweathermap.org/data/2.5/weather?q=Sydney,AU&appid="+this.state.apikey);
    this.setState({forecast});
    this.handleChange();
    
  }

  searchHandler = (event) => {
 
    const value = event.target.value;
    this.setState(state => ({...state, searchInput: value}));
  }

  handleChange= () => {
     axios({
        method: "GET",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${this.state.searchInput},AU&appid=${this.state.apikey}`,
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => {
            const forecast = response.data;
            this.setState({forecast})

            const mainData = this.state.forecast;
            this.setState({mainData});
          
            const weatherIcon = "http://openweathermap.org/img/w/" + this.state.forecast.weather[0].icon+ ".png";
            this.setState({weatherIcon});

            const temp = kelvinToCelsius(this.state.forecast.main.temp);
            this.setState({temp});
            const feels_like = kelvinToCelsius(this.state.forecast.main.feels_like);
            this.setState({feels_like});
            const temp_min = kelvinToCelsius(this.state.forecast.main.temp_min);
            this.setState({temp_min});
            const temp_max = kelvinToCelsius(this.state.forecast.main.temp_max);
            this.setState({temp_max});
            const humidity= this.state.forecast.main.humidity;
            this.setState({humidity});
            const pressure= this.state.forecast.main.pressure;
            this.setState({pressure});
            const cardinal= getWindDirection(this.state.forecast.wind.deg);
            this.setState({cardinal});
            const wind = this.state.forecast.wind.speed;
            this.setState({wind});
            const clouds= this.state.forecast.clouds.all;
            this.setState({clouds});
            const sunrise= getCurrentTimeFromStamp(this.state.forecast.sys.sunrise);
            this.setState({sunrise});
            const sunset= getCurrentTimeFromStamp(this.state.forecast.sys.sunset);
            this.setState({sunset});

            console.log( "Forecast is " + JSON.stringify(this.state.forecast));

            //Converting the temperatures from Kelvin to Celsius
            function kelvinToCelsius (temp) {
              temp = Math.round(temp - 273.15);
              return temp;
            };
            // Get wind direction converting angles in degrees to cardinal points
            function getWindDirection (degree) {
              if ( degree >= 0 && degree < 45) {
                degree = "N";
              } else if (degree >= 45 && degree < 90) {
                degree = "NE";
              } else if (degree >= 90 && degree < 135) {
                degree = "E";
              } else if (degree >= 135 && degree < 180) {
                degree = "SE";
              } else if (degree >= 180 && degree < 225) {
                degree = "S";
              } else if (degree >= 225 && degree < 270) {
                degree = "SW";
              } else if (degree >= 270 && degree < 315) {
                degree = "W";
              } else {
                degree = "NW";
              } return degree;   
             };
             //Converting timestamp data to readable hours
             function getCurrentTimeFromStamp(timestamp) {
              var d = new Date(timestamp*1000);
              var timeStampCon = d.getHours() + ':' + d.getMinutes();
              return timeStampCon;
            }

        })
        .catch(error => {   
          console.log(error);
        });
        
}
  render() {
    return (
      <React.Fragment>
          <div className="App">
          <div className="main-container container-fluid">
            <div className="container first pt-5">
              <div className="row">
                
                <div className="col-sm-12 offset-sm-0 col-md-6 offset-md-3 pt-5">
                    <div className="form-group">
                    <input type='text' onChange={this.searchHandler} placeholder="City,AU" className="search-field"/>
                    <button onClick={this.handleChange} className="search-btn" >Check Forecast</button>
                    </div>
                  </div>
                </div>
              <div className="row divisor">
                <div className="col-12 text-center">
                  <p> <strong> {this.state.forecast.name}</strong></p>
                  <p className="main-temp"> 

                  <img src={this.state.weatherIcon} alt=""/> 
                  {this.state.temp} <span className="small">&#176;</span>
                  </p>
                  <p className="mt-minus-25"> Feels like: <strong>{this.state.feels_like}<span>&#176;</span> </strong></p>
                </div>
            </div>
          </div>
          <div className="container second">
          <div className="row divisor">
            <div className="col-xs-6  offset-sm-0 col-md-2 offset-md-4">
              Min:<br/>
              <span className="result">{this.state.temp_min}&#176;</span>
            </div>
            <div className=" col-xs-6 col-sm-6 col-md-2">
              Max:<br/>
              <span className="result">{this.state.temp_max}&#176; </span> 
            </div>
            </div>
            <div className="row divisor">
              <div className=" col-xs-6 col-sm-6 offset-sm-0 col-md-2 offset-md-4">
              Humidity:<br/>
              <span className="result"> {this.state.humidity}</span>%
              </div>
              <div className="col-xs-6 col-sm-6 col-md-2">
              Pressure:<br/>
              <span className="result">{this.state.pressure}</span> hPa
              </div>
            </div>
            <div className="row divisor">
              <div className="col-xs-6 col-sm-6 offset-sm-0 col-md-2 offset-md-4">
              Wind:<br/>
              {this.state.cardinal}<span className="result"> {this.state.wind} </span>km/h
              </div>
              <div className="col-xs-6 col-sm-6 col-md-2">
              Clouds:<br/>
              <span className="result">{this.state.clouds}</span> %
              </div>
            </div>
            <div className="row divisor">
              <div className="col-xs-6 col-sm-6 offset-sm-0 col-md-2 offset-md-4">
              Sunrise:<br/>
              <span className="result">{this.state.sunrise}</span>AM
              </div>
              <div className="col-xs-6 col-sm-6 col-md-2">
              Sunset<br/>
              <span className="result">{this.state.sunset}</span> PM
              </div>
            </div>
          </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default App;




