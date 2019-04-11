import React, {Component} from 'react'
import CustomerCard from "./CustomerCard";
import CustomerRow from "./CustomerRow";
import "../assets/dashboard.css";
import Filter from "./Filter";
import searchIcon from "../assets/images/oa-search-bar.svg";
import filterIcon from "../assets/images/oneamerica-filter.svg";
import Loader from "react-loader-spinner";
import Moment from 'moment';

import axios from 'axios';

export default class Dashboard extends Component {
    // isMobile = window.innerWidth <= 500;

    constructor(props){
        super(props)
            this.state = {
            customers:[],
            search:"",
            filterPopup: false,
            filter:{
                location:false,
                insurance:false,
                time:false
            },
            locationFilter:{
                northeast:false,
                south:false,
                midwest:false,
                west:false
            },
            insuranceNeedsFilter:{
                tier1:false,
                tier2:false,
                tier3:false,
                tier4:false,
                tier5:false
            },
            timestampFilter:{
                day:false,
                week:false,
                month:false,
                year:false
            },
            selected:[],
            isAuthenticated:true,
            width:window.innerWidth,
            date:new Date(),
            host:null,
            isLoading:false
        }
    }

    async pullCustomers(){
        var url = this.state.host + '/customers'
        this.setState({isLoading:true})
        const response = await axios.get(url)
        if(response){this.setState({isLoading:false})}
        this.setState({ customers: response.data.data })

    }

    // =========================== Sort ASC and DESC ============================ //
    sortCustomersName = (order) =>{
        var data = this.state.customers
        data.sort(function (a,b){
            //resolve tiebreakers by timestamp
            if (a.Name === b.Name) {
                return new Moment(b.Time).format('YYYYMMDDhhmm') - new Moment(a.Time).format('YYYYMMDDhhmm')
            }
            else {
                return a.Name.localeCompare(b.Name);
            }
        })
        if (order === "ASC") {
            this.setState({customers: data})
        }
        else {
            var temp = data.reverse()
            this.setState({customers: temp})
        }
    }

    sortCustomersDate = (order) =>{
        var data = this.state.customers
        data.sort(function (a,b){
            return new Moment(b.Time).format('YYYYMMDDhhmm') - new Moment(a.Time).format('YYYYMMDDhhmm')
        })
        if (order === "ASC") {
            this.setState({customers: data})
        }
        else {
            var temp = data.reverse()
            this.setState({customers: temp})
        }
    }

    sortCustomersPhone = (order) =>{
        //clean the phone numbers
        var data = this.state.customers
        data.forEach(function(d) {
            d.Phone_Number.replace(/-/g, "")
        })
        //sort
        data.sort(function(a,b){
            //resolve same-location ties by comparing names
            if (a.Phone_Number === b.Phone_Number) {
                return a.Name.localeCompare(b.Name)
            }
            else {
                return a.Phone_Number.localeCompare(b.Phone_Number);
            }

        })
        if (order === "ASC") {
            var temp = data.reverse()
            this.setState({customers: temp})
        }
        else {
            this.setState({customers: data})
        }
    }


    sortCustomersEmail = (order) =>{
        var data = this.state.customers
        data.sort(function (a,b){
            //because a same email most probably means the same person, check timestamp for a tiebreaker
            if (a.Email === b.Email) {
                return new Moment(b.Time).format('YYYYMMDDhhmm') - new Moment(a.Time).format('YYYYMMDDhhmm')
            }
            else {
                return a.Email.localeCompare(b.Email);
            }
        })
        if (order === "ASC") {
            this.setState({customers: data})
        }
        else {
            var temp = data.reverse()
            this.setState({customers: temp})
        }
    }

    sortCustomersLocation = (order) =>{
        //reformat the Location of each customer to be ST, City to make it sort by State -> City
        var data = this.state.customers 
        data.forEach(function(d) {
            var loc = d.Location.substr(d.Location.indexOf(',') + 1, d.Location.length) + ", " + d.Location.substr(0, d.Location.indexOf(','))
            d.Location = loc
        })
        data.sort(function (a,b){
            //resolve same-location ties by comparing names
            if (a.Location === b.Location) {
                return a.Name.localeCompare(b.Name)
            }
            else {
                return a.Location.localeCompare(b.Location)
            }
        })
        //return Location to print format
        data.forEach(function(d) {
            var loc = d.Location.substr(d.Location.indexOf(',') + 1, d.Location.length) + ", " + d.Location.substr(0, d.Location.indexOf(','))
            d.Location = loc
        })
        if (order === "ASC") {
            this.setState({customers: data})
        }
        else {
            var temp = data.reverse()
            this.setState({customers: temp})
        }
    }

    sortCustomersInsurance = (order) => {
        var data = this.state.customers
        data.sort(function (a,b){
            if (a.EInsurance === b.EInsurance) {
                return a.Name.localeCompare(b.Name)
            }
            else {
                return b.EInsurance - a.EInsurance
            }
        })
        if (order === "ASC") { //Highest Insurance needs at the top
            this.setState({customers: data})
        }
        else { //Lowest Insurance needs at the top
            var temp = data.reverse()
            this.setState({customers: temp})
        }
    }
    // =========================== End of Sort ASC and DESC ============================ //
    

    searchCustomers = (search) =>{
        var url = this.state.host + '/customers/search'
        axios.get(url,{
            params:{
                name:search
            }
        }).then(response => this.compare(response.data.data))
    }

    saveData = _ => {
        sessionStorage.setItem('customers', JSON.stringify(this.state.customers))
    }

    selectCustomer = (customer) => {
        var selectedCustomers = this.state.selected;
        var newSelectedCustomers = []
        var isInList = false
        if(selectedCustomers.length > 0){
            selectedCustomers.forEach(function(element){
                if(element.Email.toLowerCase() === customer.Email.toLowerCase()){
                    isInList = true;
                }else{
                    newSelectedCustomers.push(element)
                }
            })
            if(!isInList){
                newSelectedCustomers.push(customer)
            }
        }else{
            newSelectedCustomers.push(customer)
        }

        this.setState({selected: newSelectedCustomers})
    }

    renderCustomers = ({ Name, Email, Phone_Number, Location, EInsurance, Time}) => 
        <CustomerCard key={Time}
            name={Name}
            email={Email} 
            phone={Phone_Number} 
            location={Location} 
            einsurance={EInsurance}
            time={Time}
            onSelectCustomer={this.selectCustomer}>
        </CustomerCard>

        
    renderRows = ({ Name, Email, Phone_Number, Location, EInsurance, Time}) => 
    <CustomerRow key={Time}
        name={Name}
        email={Email} 
        phone={Phone_Number} 
        location={Location} 
        einsurance={EInsurance}
        time={Time}
        onSelectCustomer={this.selectCustomer}>
    </CustomerRow>

    handleWindowSizeChange = () => {
        this.setState({width:window.innerWidth})
    }

    componentDidMount(){
        this.pullCustomers();
    }

    componentWillMount(){
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            this.setState({host: "https://oneamerica-nodemon.herokuapp.com"})
        } else {
            this.setState({host: "https://oneamerica-nodemon.herokuapp.com"})
        }
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount(){
        this.setState({width:window.innerWidth});
    }

    toggleFilter(){
        this.setState({
            filterPopup: !this.state.filterPopup
        })
    }

    async deleteSelected(){

        for(var element in this.state.selected){
            var url = this.state.host + '/customers'
            await axios.delete(url,{
                data: {
                    email: this.state.selected[element].Email
                }
            })
        }
        this.clearSelected();
    }

    clearSelected(){
        this.setState({
            locationFilter:{
                northeast:false,
                south:false,
                midwest:false,
                west:false
            },
            insuranceNeedsFilter:{
                tier1:false,
                tier2:false,
                tier3:false,
                tier4:false,
                tier5:false
            },
            timestampFilter:{
                day:false,
                week:false,
                month:false,
                year:false
            },
            selected:[]
        })
        this.filterFunction();
    }

    timestampFilter(time){
        var newTimestampFilter = this.state.timestampFilter
        switch(time){
            case "day":
                newTimestampFilter["day"] = !this.state.timestampFilter.day
                break;
            case "week":
                newTimestampFilter["week"] = !this.state.timestampFilter.week
                break;
            case "month":
                newTimestampFilter["month"] = !this.state.timestampFilter.month
                break;
            case "year":
                newTimestampFilter["year"] = !this.state.timestampFilter.year
                break;
            default:
                break;
        }

        this.setState({timestampFilter: newTimestampFilter})
        this.filterFunction();
    }

    insuranceNeedsFilter(tier){
        var newInsuranceNeedsFilter = this.state.insuranceNeedsFilter
        switch(tier){
            case "tier1":
                newInsuranceNeedsFilter["tier1"] = !this.state.insuranceNeedsFilter.tier1
                break;
            case "tier2":
                newInsuranceNeedsFilter["tier2"] = !this.state.insuranceNeedsFilter.tier2
                break;
            case "tier3":
                newInsuranceNeedsFilter["tier3"] = !this.state.insuranceNeedsFilter.tier3
                break;
            case "tier4":
                newInsuranceNeedsFilter["tier4"] = !this.state.insuranceNeedsFilter.tier4
                break;
            case "tier5":
                newInsuranceNeedsFilter["tier5"] = !this.state.insuranceNeedsFilter.tier5
                break;
            default:
                break;
        }

        this.setState({insuranceNeedsFilter: newInsuranceNeedsFilter})
        this.filterFunction();
    }

    locationFilter(region){
        var newLocationFilter = this.state.locationFilter
        switch(region){
            case "northeast":
                newLocationFilter["northeast"] = !this.state.locationFilter.northeast
                break;
            case "south":
                newLocationFilter["south"] = !this.state.locationFilter.south
                break;
            case "midwest":
                newLocationFilter["midwest"] = !this.state.locationFilter.midwest
                break;
            case "west":
                newLocationFilter["west"] = !this.state.locationFilter.west
                break;
            default:
                break;
        }

        this.setState({locationFilter: newLocationFilter})
        this.filterFunction();
    }

    compare(list){
        var tempList = {}
        var customers = this.state.customers
        if(list.length > 0 ){
            for(var customer in customers){
                for(var index in list){
                    if(customers[customer].Email === list[index].Email){
                        tempList[list[index].Email] = list[index]
                    }
                }
            }   
        }
        var arr = []
        for(var i in tempList){
            arr.push(tempList[i])
        }
        this.setState({customers: arr})
        this.setState({isLoading:false})
    }

    async filterFunction(){
        this.setState({isLoading:true})
        await this.pullCustomers();

        var locationList = []
        var locationPromises = []
        for(var region in this.state.locationFilter){
            if(this.state.locationFilter[region]){
                var url = this.state.host + '/filters/location'
                const promise = axios.get(url,{
                    params:{
                        region:region
                    }
                })
                .then(response => {
                    response.data.data.forEach(function(customer){
                        locationList.push(customer)
                    })
                })
                
                locationPromises.push(promise)
            }
        }

        if(locationPromises.length > 0){
            Promise.all(locationPromises).then(response => {
                this.compare(locationList)
            })
        }

        var insuranceList = []
        const tierValues = {
            tier1:[0,40000],
            tier2:[40001,60000],
            tier3:[60001,80000],
            tier4:[80001,90000],
            tier5:[90001,1000000]
        }

        var insurancePromises = []
        for(var tier in this.state.insuranceNeedsFilter){
            if(this.state.insuranceNeedsFilter[tier]){
                var urlInsurance = this.state.host + '/filters/einsurance'
                const promise = axios.get(urlInsurance,{
                    params:{
                        lower:tierValues[tier][0],
                        upper:tierValues[tier][1]
                    }
                })
                .then(response => {
                    response.data.data.forEach(function(element){
                        insuranceList.push(element)
                    })
                })
                insurancePromises.push(promise)
            }
        }
        if(insurancePromises.length > 0){
            Promise.all(insurancePromises).then(response => {
                this.compare(insuranceList);
            })
        }


        // TODO Needs Refactored
        var timeList = []
        var tempDate = new Date();
        var today = tempDate.toISOString();
        tempDate.setDate(tempDate.getDate() - 1)

        var dayAgo = tempDate.toISOString();
        tempDate = new Date();
        tempDate.setDate(tempDate.getDate() - 7)

        var weekAgo = tempDate.toISOString();
        tempDate = new Date();
        tempDate.setMonth(tempDate.getMonth() - 1)

        var monthAgo = tempDate.toISOString();
        tempDate = new Date();
        tempDate.setFullYear(tempDate.getFullYear() - 1)
        var yearAgo = tempDate.toISOString();
        const timeTierValues = {
            day:[dayAgo,today],
            week:[weekAgo,today],
            month:[monthAgo,today],
            year:[yearAgo,today]
        }

        var timePromises = []
        for(var timeTier in this.state.timestampFilter){
            if(this.state.timestampFilter[timeTier]){
                console.log(timeTierValues[timeTier])
                var urlTimestamp = this.state.host + '/filters/timestamp'
                const promise =  axios.get(urlTimestamp,{
                    params:{
                        lower: timeTierValues[timeTier][0],
                        upper: timeTierValues[timeTier][1]
                    }
                })
                .then(response => {
                    response.data.data.forEach(function(element){
                        timeList.push(element)
                    })
                })
                timePromises.push(promise)
            }
        }

        if(timePromises.length > 0){
            Promise.all(timePromises).then(response => {
                this.compare(timeList);
            })
        }
    }

    mobileFilter(filter){
        if (filter === "day" || filter==="week" || filter==="year" || filter==="month"){this.timestampFilter(filter);}
        if (filter === "midwest" || filter==="west" || filter==="south" || filter==="north"){this.locationFilter(filter);}
        if (filter === "tier1" || filter==="tier2" || filter==="tier3" || filter==="tier4" || filter==="tier5"){this.insuranceNeedsFilter(filter);}
        // switch(filter){
        //     case "day": 
        //     case "week":
        //     case "year" :
        //     case "month":
        //         this.timestampFilter(filter);
        //         break;
        //     case "midwest":
        //     case "northeast":
        //     case "west":
        //     case "south":
        //         this.locationFilter(filter);
        //         break;
        //     case "tier1":
        //     case "tier2":
        //     case "tier3":
        //     case "tier4":
        //     case "tier5":
        //         this.insuranceNeedsFilter(filter);
        //         break;
        //     default:
        //         break;
        // }
    }

    render() {
        const {customers} = this.state;
        const { width } = this.state;
        const isMobile = width <= 1023;
        const SearchButton = ({search, changeSearch}) => {
            return (
                
                <div className="parent">
                    {
                        this.state.isLoading && (
                            <div className="loading">
                            <Loader type="ThreeDots" color="#somecolor" height={80} width={80}></Loader>
                            <h3>Loading</h3>
                        </div>)  
                    }
                    <input className="child" id="search-bar" type="search"
                        onChange={(e) => {
                            search = e.target.value
                        }}
                        onKeyPress={(e) => { 
                            if(e.key === 'Enter'){
                                changeSearch(search);
                                this.setState({search:""})
                            }}}
                        placeholder="John Doe"
                        name="search"
                        />
                    <button className="child" id="search-button"
                    onClick={(e) => {changeSearch(search);
                        this.setState({search:""})}}>
                            <img src={searchIcon} alt="Search-Icon"></img>
                        </button>
                </div>
            )
        }
        if(isMobile){
            return (
                <div>
                    {this.state.filterPopup && 
                        <Filter
                        locationFilter={this.state.locationFilter}
                        timestampFilter={this.state.timestampFilter}
                        insuranceNeedsFilter={this.state.insuranceNeedsFilter}
                        closePopup={this.toggleFilter.bind(this)}
                        clearSelected={this.clearSelected.bind(this)}
                        mobileFilter={this.mobileFilter.bind(this)} 
                    />
                    }
                    
                    <div id="dashboard-header">
                        <h1 id="dashboard-user-data">User Data</h1>
                        <div id="header-right">
                            <button id="filter-button" onClick={this.toggleFilter.bind(this)}>
                                <img id="filter-button" alt="filer_button" src={filterIcon}/>
                            </button>
                        </div>
                    </div>
                    <div id="search-area">
                        <hr id="line"></hr>
                        <p id="dashboard-time">{(this.state.date.getMonth()+1) + "/" + this.state.date.getDate() + "/" + this.state.date.getFullYear()}</p>
                        <div className="floatCenter">
                            <h3 id="textButton" onClick={() => this.deleteSelected()}>Delete Selected</h3>
                            <h3 id="textButton" onClick={() => this.clearSelected()}>Clear Selected</h3>
                        </div>
                        { this.state.search }
                        <SearchButton 
                            search={this.state.search}
                            changeSearch={(search) => {
                                this.setState({search:search})
                                this.searchCustomers(search)} }
                        />
                    </div>

                    <div>
                        <div>
                        {
                            this.state.customers.length ? (
                            customers.map(this.renderCustomers)) : (<div>No Customers to show for the filter</div>)
                        }
                        </div>
                    </div>
                </div>
            )
        }else{
                return(
                    <div id="dashboard-desktop">
                        <div id="dashboard-sidepanel">
                            <h1>Search</h1>
                            <hr id="line"></hr>
                            <p>Find individual user</p>
                            <div>
                                { this.state.search }
                                <SearchButton search={this.state.search} changeSearch={(search) => {
                                    this.setState({search: search})
                                    this.searchCustomers(search)
                            } }/>
                            </div>
                            <h1>Sort By</h1>
                            <hr id="line"></hr>
                            <p>Select how data is sorted</p>

                            <div className="column">
                                <h3>Location</h3>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.locationFilter["northeast"]} onChange={(e) => this.locationFilter("northeast")} type="checkbox"/>
                                    <label id="label">Northeast</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.locationFilter["midwest"]} onChange={(e) => this.locationFilter("midwest")} type="checkbox"/>
                                    <label id="label">Midwest</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.locationFilter["west"]} onChange={(e) => this.locationFilter("west")} type="checkbox"/>
                                    <label id="label">West</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.locationFilter["south"]} onChange={(e) => this.locationFilter("south")} type="checkbox"/>
                                    <label id="label">South</label>
                                </div>
                            </div>

                            <div className="column">
                                <h3>Insurance Needs</h3>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.insuranceNeedsFilter["tier1"]} onChange={(e) => this.insuranceNeedsFilter("tier1")} type="checkbox"/>
                                    <label id="label">$20,000 - $40,000</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.insuranceNeedsFilter["tier2"]} onChange={(e) => this.insuranceNeedsFilter("tier2")} type="checkbox"/>
                                    <label id="label">$40,000 - $60,000</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.insuranceNeedsFilter["tier3"]} onChange={(e) => this.insuranceNeedsFilter("tier3")} type="checkbox"/>
                                    <label id="label">$60,000 - $80,000</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.insuranceNeedsFilter["tier4"]} onChange={(e) => this.insuranceNeedsFilter("tier4")} type="checkbox"/>
                                    <label id="label">$80,000 - $90,000</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.insuranceNeedsFilter["tier5"]} onChange={(e) => this.insuranceNeedsFilter("tier5")} type="checkbox"/>
                                    <label id="label">$90,000 - $100,000</label>
                                </div>
                            </div>

                            <div className="column">
                                <h3>Timestamp</h3>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.timestampFilter["day"]} onChange={(e) => this.timestampFilter("day")} type="checkbox"/>
                                    <label id="label">Last Day</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.timestampFilter["week"]} onChange={(e) => this.timestampFilter("week")} type="checkbox"/>
                                    <label id="label">Last Week</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.timestampFilter["month"]} onChange={(e) => this.timestampFilter("month")} type="checkbox"/>
                                    <label id="label">Last Month</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.timestampFilter["year"]} onChange={(e) => this.timestampFilter("year")} type="checkbox"/>
                                    <label id="label">Last Year</label>
                                </div>
                            </div>

                        </div>
                        
                        <div id="dashboard-content">
                            <h1>User Data</h1>
                            <hr id="line"></hr>
                            <div id="dashboard-data-header" className="floatLeft">
                                <h3 id="textButton" onClick={() => this.deleteSelected()}  className="child">Delete Selected</h3>
                                <h3 id="textButton" onClick={() => this.clearSelected()}  className="child">Clear Selected</h3>
                                <div className="floatRight">
                                    <p>Current Date: {(this.state.date.getMonth()+1) + "/" + this.state.date.getDate() + "/" + this.state.date.getFullYear()}</p>
                                </div>
                            </div>
                            <div id="table-wrapper">
                                <div id="table-scroll">
                                    {
                                        this.state.customers.length ? (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th className="table-heading">
                                                        <span className="text">Name
                                                            <div className="sorting-arrows">
                                                                <span onClick={() => this.sortCustomersName("ASC")}>&#9650;</span>
                                                                <span onClick={() => this.sortCustomersName("DESC")}>&#9660;</span>
                                                            </div>
                                                        </span>
                                                    </th>
                                                    <th className="table-heading">
                                                        <span className="text">Email
                                                            <div className="sorting-arrows">
                                                                <span onClick={() => this.sortCustomersEmail("ASC")}>&#9650;</span>
                                                                <span onClick={() => this.sortCustomersEmail("DESC")}>&#9660;</span>
                                                            </div>
                                                        </span>
                                                    </th>
                                                    <th className="table-heading">
                                                        <span className="text">Phone
                                                            <div className="sorting-arrows">
                                                                <span onClick={() => this.sortCustomersPhone("ASC")}>&#9650;</span>
                                                                <span onClick={() => this.sortCustomersPhone("DESC")}>&#9660;</span>
                                                            </div>
                                                        </span>
                                                    </th>
                                                    <th className="table-heading">
                                                        <span className="text">Location
                                                            <div className="sorting-arrows">
                                                                <span onClick={() => this.sortCustomersLocation("ASC")}>&#9650;</span>
                                                                <span onClick={() => this.sortCustomersLocation("DESC")}>&#9660;</span>
                                                            </div>
                                                        </span>
                                                    </th>
                                                    <th className="table-heading">
                                                        <span className="text">Insurance
                                                            <div className="sorting-arrows">
                                                                <span onClick={() => this.sortCustomersInsurance("ASC")}>&#9650;</span>
                                                                <span onClick={() => this.sortCustomersInsurance("DESC")}>&#9660;</span>
                                                            </div>
                                                        </span>
                                                    </th>
                                                    <th className="table-heading">
                                                        <span className="text">Time
                                                            <div className="sorting-arrows">
                                                                <span onClick={() => this.sortCustomersDate("ASC")}>&#9650;</span>
                                                                <span onClick={() => this.sortCustomersDate("DESC")}>&#9660;</span>
                                                            </div>
                                                        </span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    customers.map(this.renderRows)
                                                }
                                            </tbody>
                                        </table>) : (<div>No potential customers match the current filter</div>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
    }

    
}
