import React from 'react';
// import logo from '../assets/logo.png';

import { apiGet } from '../utils';
import { Redirect } from 'react-router-dom';

import core from '../core';

import star from '../assets/star.png';
// import loading from '../assets/loading.gif';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            news: [],
            weather: [],
            lat: null,
            lon: null,
            places: [],
            loading: null
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.updateWeather = this.updateWeather.bind(this);
        this.updateNews = this.updateNews.bind(this);
        this.updatePlaces = this.updatePlaces.bind(this);
    }

    handleSearchChange(event) {
        this.setState({
            search: event.target.value
        });
    }

    async updateWeather() {
        this.setState({
            loading: '0'
        });

        try {
            const newsResult = await apiGet(process.env.REACT_APP_API_URL + '/weather/' + this.state.search, {});

            var newItem = [];
            var itemHeader = (
                <div className="col-12" key={0}>
                    <h4>WEATHER:</h4>
                </div>
            );
            newItem.push(itemHeader)
            for (const [index, value] of newsResult.data.body.entries()) {
                this.setState({
                    lat: value.city_info.coord.lat,
                    lon: value.city_info.coord.lon
                })
                // console.log(value);
                var jsxval = (
                    <div className="col-12" key={index + 1}>
                        <div className="card card-weather border-0 rounded-0">
                            <div className="card-body">
                                <h5>{value.city_info.name}</h5>
                                <b>Wind Speed:</b> {value.current[0].wind.speed} <br />
                                <b>Humidity:</b> {value.current[0].main.humidity}% <br />
                                <b>Current Temperature:</b> {parseInt((value.current[0].main.temp - 273.15) * 1.8 + 32)} F° <br />

                            </div>
                        </div>
                    </div>

                )
                newItem.push(jsxval)
            }
            for (const [index, value] of newsResult.data.body[0].current.entries()) {
                if (index > 0 && index < 4) {
                    var jsxval2 = (
                        <div className="col-sm-4" key={index + 2}>
                            <div className="card card-weather-2 border-0 rounded-0">
                                <div className="card-body">
                                    <b>Date:</b> {value.dt_txt} <br />
                                    <b>Humidity:</b> {value.main.humidity}% <br />
                                    <b>Current Temperature:</b> {parseInt((value.main.temp - 273.15) * 1.8 + 32)} F° <br />

                                </div>
                            </div>
                        </div>

                    )
                    newItem.push(jsxval2)
                }
                else if (index > 3) {
                    var jsxval3 = (
                        <div className="col-sm-6" key={index + 2}>
                            <div className="card card-weather-2 border-0 rounded-0">
                                <div className="card-body">
                                    <b>Wind Speed:</b> {value.dt_txt} <br />
                                    <b>Humidity:</b> {value.main.humidity}% <br />
                                    <b>Current Temperature:</b> {parseInt((value.main.temp - 273.15) * 1.8 + 32)} F° <br />

                                </div>
                            </div>
                        </div>

                    )
                    newItem.push(jsxval3)
                }
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

                    <div className="col-sm-4" key={index + 1}>
                        <div className="card">
                            <img className="card-img-top" alt="" src={value.urlToImage} />
                            <div className="card-body">
                                {/* eslint-disable-next-line */}
                                <a href={value.url} target="_blank"> {value.title} </a> <br />
                                <b>Description:</b> {value.description} <br />
                                <b>Source:</b> {value.author} <br />

                            </div>
                        </div>
                    </div>

                )
                newItem.push(jsxval)
            }
            

            setTimeout(() => {
                this.updatePlaces();
            }, 2000);
            // var x = newsResult.data.body;

            this.setState({
                news: newItem
            })

        }
        catch (error) {
            console.log(error);
        }
    }


    async updatePlaces() {
        try {
            const newsResult = await apiGet(process.env.REACT_APP_API_URL + '/gmaps?lat=' + this.state.lat + '&lon=' + this.state.lon, {});
            console.log(newsResult);

            var newItem = [];
            var itemHeader = (
                <div className="col-12" key={0}>
                    <h4>PLACES:</h4>
                </div>
            );
            newItem.push(itemHeader)
            for (const [index, value] of newsResult.data.body.entries()) {
                var startImg = [];
                for (var xxx = 0; xxx < value.rate; xxx++) {
                    startImg.push(<img src={star} alt="" />)
                }
                var jsxval = (

                    <div className="col-sm-4" key={index + 1}>
                        <div className="card">
                            <div className="card-body">
                                {/* eslint-disable-next-line */}
                                <b>Name:</b> {value.name} <br />
                                <b>Kinds:</b> {value.kinds} <br />
                                <b>Ratings:</b> {startImg} <br />
                            </div>
                        </div>
                    </div>

                )
                newItem.push(jsxval)
            }

            this.setState({
                places: newItem
            })
            this.setState({
                loading: '1'
            });
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
        var home_body;
        // eslint-disable-next-line
        if (this.state.loading == '1')
            home_body = (
                <div>
                    <div className="row row-places">
                        {this.state.places}
                    </div>

                    <div className="row">
                        {this.state.weather}
                    </div>
                    <div className="row">
                        {this.state.news}
                    </div>
                </div>
            );
        // eslint-disable-next-line
        else if (this.state.loading == '0')
            home_body = (
                <div className="row">
                    <div className="col-md-6 offset-md-3 row-loading"></div>
                </div>

            )

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

                                {home_body}


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default (Home)
    ;