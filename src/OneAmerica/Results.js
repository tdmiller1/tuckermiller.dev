import React, {Component} from 'react'
import '../assets/style.css';
import Success from "./Success";
import Failure from "./Failure";
import axios from "axios";


export default class Results extends Component {

    state = {
        customer: {
            full_name: undefined,
            email: undefined,
            phone_number: undefined,
            location: undefined,
            abbreviation: undefined,
            einsurance: this.props.location.state ? this.props.location.state.amount : 0
        },
        success:false,
        failure:false,
        host:null
    }

    componentWillMount(){
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            this.setState({host: "https://oneamerica-nodemon.herokuapp.com"})
        } else {
            this.setState({host: "https://oneamerica-nodemon.herokuapp.com"})
        }
    }

    addCustomer = _ =>{
        const { customer } = this.state;
        var url = this.state.host + '/customers/add'
        axios.post(url,{
            name: customer.full_name,
            email: customer.email,
            phone_number: customer.phone_number,
            location: customer.location + ", " + customer.abbreviation,
            einsurance: customer.einsurance,
            time:null
        }).then(response => {
            switch(response.status){
                case 200:
                    this.setState({success: true})
                    break;
                default:
                    this.setState({failure: true})
            }
        })
        .catch(err => {
            this.setState({failure: true})
        })
      }

    render() {
        var margin= {
            marginLeft:'10px'
        }
        console.log(this.state);
        const { customer } = this.state;
        return (
            <div className="temporary-site-wrapper">
            <div id="results-page">
                <h3 id="calculator-title">LIFE INSURANCE CALCULATOR</h3>

                <div className="overview-text">
                    <h1>OneAmerica Insurance Calculator</h1>
                    <p>Below is just a small amount of information that should help you to know more about your current insurance needs. Not sure what these numbers mean, or do they seem intimidating? Please fill out your information in the form below, and we will connect you with one of our fantasitc representatives who can explain more, and help you get started in achieving your insurance needs.</p>
                </div>
            
                <form className="component" onSubmit={(e) => {
                    console.log(this.state.customer);
                    e.preventDefault();
                     return this.addCustomer();
                }}>


                    <div className="results-information overview-text results-margin">
                        <h1>Generic Information You May Need</h1>

                        <div className="results-info-list">
                            {
                                this.props.location.state &&
                                <ol>
                                    <li>Type of insurance: {this.props.location.state.type}</li>
                                    <li>Amount of insurance: {this.props.location.state.amount}</li>
                                    <li>Cost of insurance per month: {this.props.location.state.cost}</li>
                                    <li>Type of plan: {this.props.location.state.plan}</li>
                                </ol>
                            }
                            {
                                !this.props.location.state &&
                                <div>
                                    <h3>Oops!</h3>
                                    <p>It looks like you made it to this page without fillout out our form.
                                        Go back to the OneAmerica Life Insurance Calculator form to see more.</p>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="contact-us">
                        <div className="contact-us-wrapper results">
                                <div className="input-wrapper">
                                    <div className="label-input">
                                        <label htmlFor="full-name">Full Name</label>
                                        <input required name="full_name" placeholder="Jane Doe" type="text"  onChange={(e) => {
                                            this.setState({customer: {...customer, full_name: e.target.value }})
                                        }}/>
                                    </div>

                                    <div className="label-input">
                                        <label htmlFor="email">Email</label>
                                        <input name="email" placeholder="JaneDoe@email.com" type="email"  onChange={(e) => {
                                            this.setState({customer: {...customer, email: e.target.value }})
                                        }}/>
                                    </div>
                                </div>

                                <div className="input-wrapper">
                                    <div className="label-input">
                                        <label htmlFor="phone">Phone</label>
                                        <input required name="phone_number" placeholder="555-555-5555" type="text"  onChange={(e) => {
                                            this.setState({customer: {...customer, phone_number: e.target.value }})
                                        }}/>
                                    </div>
                                    <div style={margin} className="label-input" id="results-label-input-location">
                                        <label htmlFor="location">City</label>
                                        <div className="city-state">
                                        <input id="results-location-input" required name="location" placeholder="Indianapolis" type="text"  onChange={(e) => {
                                            this.setState({customer: {...customer, location: e.target.value }})
                                        }}/>
                                        <label htmlFor="location" id="results-label-input-state">State</label>
                                        <select id="results-location-select" defaultValue={"Select"} name="locationAbreviation" required onChange={(e) => {
                                            this.setState({
                                                customer: {...customer, abbreviation: e.target.value}
                                            })
                                        }}>
                                            <option value="AL">AL</option>
                                            <option value="AK">AK</option>
                                            <option value="AZ">AZ</option>
                                            <option value="AR">AR</option>
                                            <option value="CA">CA</option>
                                            <option value="CO">CO</option>
                                            <option value="CT">CT</option>
                                            <option value="DE">DE</option>
                                            <option value="DC">DC</option>
                                            <option value="FL">FL</option>
                                            <option value="GA">GA</option>
                                            <option value="HI">HI</option>
                                            <option value="ID">ID</option>
                                            <option value="IL">IL</option>
                                            <option value="IN">IN</option>
                                            <option value="IA">IA</option>
                                            <option value="KS">KS</option>
                                            <option value="KY">KY</option>
                                            <option value="LA">LA</option>
                                            <option value="ME">ME</option>
                                            <option value="MD">MD</option>
                                            <option value="MA">MA</option>
                                            <option value="MI">MI</option>
                                            <option value="MN">MN</option>
                                            <option value="MS">MS</option>
                                            <option value="MO">MO</option>
                                            <option value="MT">MT</option>
                                            <option value="NE">NE</option>
                                            <option value="NV">NV</option>
                                            <option value="NH">NH</option>
                                            <option value="NJ">NJ</option>
                                            <option value="NM">NM</option>
                                            <option value="NY">NY</option>
                                            <option value="NC">NC</option>
                                            <option value="ND">ND</option>
                                            <option value="OH">OH</option>
                                            <option value="OK">OK</option>
                                            <option value="OR">OR</option>
                                            <option value="PA">PA</option>
                                            <option value="RI">RI</option>
                                            <option value="SC">SC</option>
                                            <option value="SD">SD</option>
                                            <option value="TN">TN</option>
                                            <option value="TX">TX</option>
                                            <option value="UT">UT</option>
                                            <option value="VT">VT</option>
                                            <option value="VA">VA</option>
                                            <option value="WA">WA</option>
                                            <option value="WV">WV</option>
                                            <option value="WI">WI</option>
                                            <option value="WY">WY</option>
                                        </select>
                                        </div>

                                    </div>

                                </div>
                        </div>
                    </div>
                    <button className="contact-us-button" disabled={this.state.success} type="submit">Contact Us</button>
                        {
                            this.state.success &&
                            <Success />
                        }
                        {
                            this.state.failure &&
                            <Failure />
                        }
                    </form>
            </div>
            </div>
        )
    }

}