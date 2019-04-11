import React, {Component} from 'react';
// import "../assets/dashboard.css"
import moment from "moment";

export default class CustomerRow extends Component {

    selectedChange = _ => {
        var customer = {Name: this.props.name, Email: this.props.email, 
        Location: this.props.location, EInsurance: this.props.einsurance, 
    Phone_Number: this.props.phone, TIME: this.props.time}
        this.props.onSelectCustomer(customer)
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
            <tr>
                <td><input id="checkbox" onClick={this.selectedChange} type="checkbox"/></td>
                <td>{this.props.name}</td>
                <td>{this.props.email}</td>
                <td>{this.formatPhoneNumber(this.props.phone)}</td>
                <td>{this.props.location}</td>
                <td>{this.formatNumber(this.props.einsurance)}</td>
                <td className="customer-date">{this.parseDate()}</td>
            </tr>
        )
    }
}