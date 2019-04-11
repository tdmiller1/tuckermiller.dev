import React, {Component} from 'react';
// import "../assets/dashboard.css";
import moment from "moment";

export default class CustomerCard extends Component {

    state = {
        selected: false
    }

    selectedChange = _ => {
        var customer = {Name: this.props.name, Email: this.props.email, Location: this.props.location, EInsurance: this.props.einsurance, Phone_Number: this.props.phone, TIME: this.props.time}

        this.props.onSelectCustomer(customer);
    }

    parseDate(){
        var date = moment(this.props.time).format('DD-MMM-YYYY HH:mm');
        return date
    }

    formatNumber = function (number) {
        var splitNum;
        number = Math.abs(number);
        number = number.toFixed(2);
        splitNum = number.split('.');
        splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return "$" + splitNum.join(".");
    }

    formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
    }

    render() {
        return(
            <div className="client_card">
            {/* <button onClick={this.selectedChange}>"checkbox placeholder"</button> */}
                <div id="card-header">
                    <h4 id="name-field">Name: <span>{this.props.name}</span></h4>
                    <div id="card-header-right">
                        <input onClick={this.selectedChange} id="card-checkbox" type="checkbox"/>
                    </div>
                </div>
                <div id="floatLeft">
                    <p id="gray_row">Email: <span>{this.props.email}</span></p>
                    <p>Location: <span>{this.props.location}</span></p>
                    <p id="gray_row">Insurance Needs: <span>{this.formatNumber(this.props.einsurance)}</span></p>
                    <p>Phone: <span>{this.formatPhoneNumber(this.props.phone)}</span></p>
                    <p id="timestamp"><i>Timestamp: <strong>{this.parseDate()}</strong></i></p>
                </div>
            </div>
        )
    }
}