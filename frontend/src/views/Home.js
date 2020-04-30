import React from 'react';
// import logo from '../assets/logo.png';

import { apiGet } from '../utils';
import { Redirect } from 'react-router-dom';

import core from '../core';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            news: [],
            weather: []
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.updateWeather = this.updateWeather.bind(this);
        this.updateNews = this.updateNews.bind(this);
    }

    handleSearchChange(event) {
        this.setState({
            search: event.target.value
        });
    }

    async updateWeather() {
        try {
            const newsResult = await apiGet(process.env.REACT_APP_API_URL + '/weather/' + this.state.search, {});
            
            var newItem = [];
            var itemHeader = (
                <div className="col-12" key={0}>
                    <h4>WEATHER:</h4>
                </div>
            );
            newItem.push(itemHeader)
            for (const [index, value] of newsResult.data.body.entries()){
                // console.log(value);
                var jsxval = (
                        <div className="col-12" key={index+1}>
                            <div className="card card-weather">
                                <div className="card-body">
                                    <h5>{value.city_info.name}</h5>
                                    <b>Wind Speed:</b> {value.current.wind.speed} <br/>
                                    <b>Humidity:</b> {value.current.main.humidity}% <br/>
                                    <b>Current Temperature:</b> {parseInt((value.current.main.temp - 273.15) * 1.8 + 32)} F° <br/>

                                </div>                                
                            </div>
                        </div>

                )
                newItem.push(jsxval)
            }

            // var x = newsResult.data.body;

            this.setState({
                weather: newItem
            })

        }
        catch (error) {
            console.log(error);
        }
    }


    async updateNews() {
        try {
            const newsResult = await apiGet(process.env.REACT_APP_API_URL + '/news/' + this.state.search, {});
            
            var newItem = [];
            var itemHeader = (
                <div className="col-12" key={0}>
                    <h4>NEWS:</h4>
                </div>
            );
            newItem.push(itemHeader)
            for (const [index, value] of newsResult.data.body.entries()) {
                var jsxval = (

                    <div className="col-4" key={index + 1}>
                        <div className="card">
                            <img className="card-img-top" alt="" src={value.urlToImage} />
                            <div className="card-body">
                                {/* eslint-disable-next-line */}
                                <a href={value.url} target="_blank"> {value.title} </a> <br />
                                <b>Description:</b> {value.description} <br />
                                <b>Author:</b> {value.author} <br />

                            </div>
                        </div>
                    </div>

                )
                newItem.push(jsxval)
            }

            // var x = newsResult.data.body;

            this.setState({
                news: newItem
            })

        }
        catch (error) {
            console.log(error);
        }
    }

    // updateAll(){
    //     this.updateWeather();
    //     this.updateNews();
    // }

    render() {
        if (!core.token)
            return <Redirect to="/login" />

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card border-0">
                            <div className="card-body">

                                <div className="form-row">
                                    <div className="form-group col-sm-10">
                                        <label>City Name</label>
                                        <input type="text" className="form-control" value={this.state.search} onChange={this.handleSearchChange} />
                                    </div>
                                    <div className="form-group col-sm-2">
                                        <label>Search</label>
                                        <button type="button" className="form-control" onClick={() => { this.updateWeather(); this.updateNews() }}>Go</button>
                                    </div>
                                </div>

                                <div className="row">
                                    {this.state.weather}
                                </div>
                                <div className="row">
                                    {this.state.news}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;