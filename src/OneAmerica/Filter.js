import React, {Component} from 'react'

export default class Filter extends Component {

    handleChange(e){
        const title = e.target.value;
        this.props.mobileFilter(title);
    }
   
    render() {
        return(
            <div id="filter-wrapper">
            <button className="floatRight" onClick={this.props.closePopup}>X</button>
                <div id="margin" className="column">
                    FILTERS
                    <h3>Location</h3>
                    <div className="row">
                        <input id="filter-checkbox" value="northeast" checked={this.props.locationFilter["northeast"]} onChange={this.handleChange.bind(this)} type="checkbox"/>
                        <label id="filter-label">Northeast</label>
                    </div>
                    <div className="row">
                        <input id="filter-checkbox" value="midwest" checked={this.props.locationFilter["midwest"]} onChange={this.handleChange.bind(this)} type="checkbox"/>
                        <label id="filter-label">Midwest</label>
                    </div>
                    <div className="row">
                        <input id="filter-checkbox" value="west" checked={this.props.locationFilter["west"]} onChange={this.handleChange.bind(this)} type="checkbox"/>
                        <label id="filter-label">West</label>
                    </div>
                    <div className="row">
                        <input id="filter-checkbox" value="south" checked={this.props.locationFilter["south"]} onChange={this.handleChange.bind(this)} type="checkbox"/>
                        <label id="filter-label">South</label>
                    </div>
                    <h3>Timestamp</h3>
                    <div className="row">
                        <input id="filter-checkbox" checked={this.props.timestampFilter["day"]} value="day" onChange={this.handleChange.bind(this)} type="checkbox"/>
                        {this.props.column}
                        <label id="filter-label">Last Day</label>
                    </div>
                    <div className="row">
                        <input id="filter-checkbox" checked={this.props.timestampFilter["week"]} value="week" onChange={this.handleChange.bind(this)} type="checkbox"/>
                        <label id="filter-label">Last Week</label>
                    </div>
                    <div className="row">
                        <input id="filter-checkbox" checked={this.props.timestampFilter["month"]} value="month" onChange={this.handleChange.bind(this)} type="checkbox"/>
                        <label id="filter-label">Last Month</label>
                    </div>
                    <div className="row">
                        <input id="filter-checkbox" checked={this.props.timestampFilter["year"]} value="year" onChange={this.handleChange.bind(this)} type="checkbox"/>
                        <label id="filter-label">Last Year</label>
                    </div>
                    <h3>Insurance Needs</h3>
                    <div className="row">
                        <input id="filter-checkbox" value="tier1" checked={this.props.insuranceNeedsFilter["tier1"]} onChange={this.handleChange.bind(this)} type="checkbox"/>
                        <label id="filter-label">$20,000 - $40,000</label>
                    </div>
                    <div className="row">
                        <input id="filter-checkbox" value="tier2" checked={this.props.insuranceNeedsFilter["tier2"]} onChange={this.handleChange.bind(this)} type="checkbox"/>
                        <label id="filter-label">$40,000 - $60,000</label>
                    </div>
                    <div className="row">
                        <input id="filter-checkbox" value="tier3" checked={this.props.insuranceNeedsFilter["tier3"]} onChange={this.handleChange.bind(this)} type="checkbox"/>
                        <label id="filter-label">$60,000 - $80,000</label>
                    </div>
                    <div className="row">
                        <input id="filter-checkbox" value="tier4" checked={this.props.insuranceNeedsFilter["tier4"]} onChange={this.handleChange.bind(this)} type="checkbox"/>
                        <label id="filter-label">$80,000 - $90,000</label>
                    </div>
                    <div className="row">
                        <input id="filter-checkbox" value="tier5" checked={this.props.insuranceNeedsFilter["tier5"]} onChange={this.handleChange.bind(this)} type="checkbox"/>
                        <label id="filter-label">$90,000 - $100,000</label>
                    </div>
                </div>
                <button className="dashboard-button" onClick={this.props.clearSelected}>Clear All Filters</button>
            </div>
        )
    }
}
