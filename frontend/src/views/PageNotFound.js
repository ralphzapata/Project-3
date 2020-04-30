import React from 'react';
import fourofour from '../assets/fourofour.png';



class PageNotFound extends React.Component {
    render() {       
        return (
            <div className="container container-login">
                <center>
                    <img src={fourofour} alt=""/>
                </center>
            </div>
        );
    }
}
export default PageNotFound;