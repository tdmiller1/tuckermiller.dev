import React, {Component} from 'react';
import '../assets/style.css';
import questionMark from "../assets/images/oneamerica-question.svg"
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { createBrowserHistory, createHashHistory, createMemoryHistory } from "history"

export class Home extends Component {

    constructor(props){
        super(props)
        this.state = {

            //about you information
            age: 1,
            spouse_age: 1,
            income: -1,
            spouse_income: 1,
            gender: null,
            children: 1,

            //personal assets
            savings: 1,
            checkings: 1,
            retirement: 1,

            //current life insurance
            current_policy: 1,
            offered_through_company: false,

            //immediate needs
            medical: 1,
            mortgage: 1,
            student_loans: 1,
            car_loans: 1,
            credit_card: 1,
            other: 1,
            final_expenses: 1,
            total_expenses: 0,

            //long term needs
            spouse_working: false,
            spouse_length: 1,
            years_provide: 1,
            children_to_college: 1,
            type_of_college: null,

            total_insurance_needs: 1

        }
    }




    submitInformation(){

        this.setState({
            total_expenses: (this.state.medical + this.state.mortgage +
                this.state.student_loans + this.state.car_loans +
                this.state.credit_card + this.state.other)
        }, () => {
            console.log(this.state)

            if(this.validation()){
                this.calculate();
            }
            else {
                //this will eventually be some kind of form state
            }
        })

    }

    validation(){
        console.log("Begin form validation.");
        if(this.state.gender !== "Male" && this.state.gender !== "Female" && this.state.gender !== "Prefer not to answer"){
            alert("Please fill out the following information: Gender")
        }
        return ((this.state.income !== -1) && (this.state.gender !== null));
    }

    calculate(){
        console.log("Begin Calculation")

        this.setState({
            total_insurance_needs:  (this.state.savings + this.state.checkings +
                                    this.state.retirement + this.state.current_policy +
                                    this.state.total_expenses + this.state.final_expenses +
                                    (this.state.income * this.state.years_provide) +
                                    (this.state.children_to_college * 38000))
        }, () => {
            this.props.history.push({
                pathname: '/oneamerica/results',
                state: {
                    type: "Life Insurance",
                    cost: 200000,
                    amount: this.state.total_insurance_needs,
                    plan: "Plan C"
                }
            })
        })
        //this is where the oneAmerica algorithm will go
    }

    render() {
        return (
            <div className="temporary-site-wrapper">
            <div className="home-page">

                <h3 id="calculator-title">LIFE INSURANCE CALCULATOR</h3>

                <div className="overview-text">
                    <h1>Do You Know How Much Life Insurance YOU Need?</h1>
                    <p>Welcome to the OneAmerica life insurance Calculator. If you're curious about how much life insurance you might need, you've come to the right place. Below, please fill out as much information as you can about yourself. Not all information is required, but the more you can provide, the better our website can calculate just how much, and what type, insurance you and your family will need.</p><p>On the following page, you will be able, if you like, to submit some basic information to one of our representatives so that we can assist you in receiving just the right insurance plan for your specific needs! </p>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.submitInformation()
                }}>

                    {/* ABOUT YOU SECTION BEGINS */}

                    <section className="about-you">

                        <h1>About You<img alt="" src={questionMark} className="question-mark"/>
                            <p className="info-popup">Generic information about you and your spouse
                                (if applicable). Income and Gender are required elements.</p>
                        </h1>

                        <div className="about-you-wrapper">
                            <div className="input-wrapper">

                                <div className="label-input">
                                    <label htmlFor="spouse-age">Spouse Age</label>
                                    <input type="text" name="spouse-age" placeholder="43" onChange={(e) => {
                                        this.setState({
                                            spouse_age: parseInt(e.target.value,10)
                                        })
                                    }}/>
                                </div>

                                <div className="label-input">
                                    <label htmlFor="spouse-income">Spouse Income</label>
                                    <input type="text" name="spouse-income" placeholder="34000" onChange={(e) => {
                                        this.setState({
                                            spouse_income: parseInt(e.target.value,10)
                                        })
                                    }}/>
                                </div>

                                <div className="label-input">
                                    <label htmlFor="spouse-age">Num of Children</label>
                                    <input type="text" name="spouse-age" placeholder="3" onChange={(e) => {
                                        this.setState({
                                            children: parseInt(e.target.value,10)
                                        })
                                    }}/>
                                </div>


                            </div>


                            <div className="input-wrapper">

                                <div className="label-input">
                                    <label htmlFor="age">Your Age</label>
                                    <input type="text" name="age" placeholder="45" onChange={(e) => {
                                        this.setState({
                                            age: parseInt(e.target.value,10)
                                        })
                                    }}/>
                                </div>

                                <div className="label-input">
                                    <label htmlFor="income">Your Income</label>
                                    <input type="text" name="income" placeholder="37000" required onChange={(e) => {
                                        this.setState({
                                            income: parseInt(e.target.value,10)
                                        })
                                    }}/>
                                </div>

                                <div className="label-input">
                                    <label htmlFor="gender">Gender</label>
                                    <select defaultValue={"Select"} name="gender" required onChange={(e) => {
                                        this.setState({
                                            gender: e.target.value
                                        })
                                    }}>
                                        <option disabled>Select</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Prefer not to answer</option>
                                    </select>
                                </div>


                            </div>
                        </div>

                    </section>


                    {/* ABOUT YOU SECTION ENDS */}
                    {/* PERSONAL ASSETS SECTION BEGINS */}

                    <section className="personal-assets">

                        <h1>Personal Assets<img alt="" src={questionMark} className="question-mark"/>
                            <p className="info-popup">Generic information about your current financial
                                status. This section is not required, but helps make accurate calculations.</p>
                        </h1>

                        <div className="input-wrapper">
                            <label htmlFor="savings">Savings</label>
                            <input type="text" name="savings" placeholder="15000" onChange={(e) => {
                                this.setState({
                                    savings: parseInt(e.target.value,10)
                                })
                            }}/>

                            <label htmlFor="checking">Checking</label>
                            <input type="text" name="checking" placeholder="7000" onChange={(e) => {
                                this.setState({
                                    checking: parseInt(e.target.value,10)
                                })
                            }}/>

                            <label htmlFor="retirement">Retirement</label>
                            <input type="text" name="retirement" placeholder="70000" onChange={(e) => {
                                this.setState({
                                    age: parseInt(e.target.value,10)
                                })
                            }}/>
                        </div>
                    </section>


                    {/* PERSONAL ASSETS SECTION ENDS */}
                    {/* CURRENT INSURANCE SECTION BEGINS */}


                    <section className="current-policy">

                        <h1>Your Policy<img alt="" src={questionMark} className="question-mark"/>
                            <p className="info-popup">Generic information about your current insurance
                                policy. This section is not required, but helps make accurate calculations.</p>
                        </h1>

                        <div className="input-wrapper">
                            <label htmlFor="your-policy">Your Policy</label>
                            <input type="text" name="your-policy" placeholder="200000" onChange={(e) => {
                                this.setState({
                                    current_policy: parseInt(e.target.value,10)
                                })
                            }}/>

                            <label htmlFor="offered-through-company">Offered Through Your Company?</label>
                            <select defaultValue={"Select"} name="offered-through-company" id="offered-through-company" required onChange={(e) => {
                                this.setState({
                                    offered_through_company: e.target.value
                                })
                            }}>
                                <option disabled >Select</option>
                                <option>Yes</option>
                                <option>No</option>
                                <option>Prefer not to answer</option>
                            </select>
                        </div>
                    </section>


                    {/* CURRENT INSURANCE SECTION ENDS */}
                    {/* IMMEDIATE NEEDS SECTION BEGINS */}


                    <section className="immediate-needs">

                        <h1>Immediate Needs<img alt="" src={questionMark} className="question-mark"/>
                            <p className="info-popup">Generic information about your current debt needs.
                                This section is not required, but helps make accurate calculations.</p>
                        </h1>

                        <div className="immediate-needs-wrapper">
                            <div className="input-wrapper">

                                <div className="label-input">
                                    <label htmlFor="mortgage">Mortgage</label>
                                    <input type="text" name="mortgage" placeholder="40000" onChange={(e) => {
                                        this.setState({
                                            mortgage: parseInt(e.target.value,10)
                                        })
                                    }}/>
                                </div>

                                <div className="label-input">
                                    <label htmlFor="student-loans">Student Loans</label>
                                    <input type="text" name="student-loans" placeholder="8000" onChange={(e) => {
                                        this.setState({
                                            student_loans: parseInt(e.target.value,10)
                                        })
                                    }}/>
                                </div>

                                <div className="label-input">
                                    <label htmlFor="car-loans">Car Loans</label>
                                    <input type="text" name="car-loans" placeholder="5000" onChange={(e) => {
                                        this.setState({
                                            car_loans: parseInt(e.target.value,10)
                                        })
                                    }}/>
                                </div>

                            </div>
                            <div className="input-wrapper">

                            <div className="label-input">
                                    <label htmlFor="medical">Medical</label>
                                    <input type="text" name="medical" placeholder="3000" onChange={(e) => {
                                        this.setState({
                                            medical: parseInt(e.target.value,10)
                                        })
                                    }}/>
                                </div>


                                <div className="label-input">
                                    <label htmlFor="credit-card">Credit Card</label>
                                    <input type="text" name="credit-card" placeholder="1000" onChange={(e) => {
                                        this.setState({
                                            credit_card: parseInt(e.target.value,10)
                                        })
                                    }}/>
                                </div>

                                <div className="label-input">
                                    <label htmlFor="other">Other</label>
                                    <input type="text" name="other" placeholder="200" onChange={(e) => {
                                        this.setState({
                                            other: parseInt(e.target.value,10)
                                        })
                                    }}/>
                                </div>

                            </div>
                        </div>

                        <br/>

                            <div className="label-input final-expenses">
                                <label htmlFor="final-expenses">Final Expenses (usually 7,000-10,000)</label>
                                <input type="text" name="final-expenses" placeholder="8500" onChange={(e) => {
                                    this.setState({
                                        final_expenses: parseInt(e.target.value,10)
                                    })
                                }}/>
                            </div>
                    </section>


                    {/* IMMEDIATE NEEDS SECTION ENDS */}
                    {/* LONG TERM NEEDS SECTION BEGINS */}


                    <section className="long-term-needs">

                        <h1>Long Term Needs<img alt="" src={questionMark} className="question-mark"/>
                            <p className="info-popup">Generic information about financial needs after
                                you pass. This section is not required, but helps make accurate calculations.</p>
                        </h1>

                        <div className="input-wrapper">

                            <div className="label-input">
                                <label htmlFor="spouse-working">Spouse keep working or take time off?</label>
                                <select defaultValue={"Select"} name="spouse-working" required onChange={(e) => {
                                    this.setState({
                                        spouse_working: e.target.value
                                    })
                                }}>
                                    <option disabled >Select</option>
                                    <option>Continue Working</option>
                                    <option>Take Time Off</option>
                                    <option>Prefer not to answer</option>
                                </select>
                            </div>

                            <div className="label-input">
                                <label htmlFor="spouse-length">How long?</label>
                                <select defaultValue={"Select"} name="spouse-length" required onChange={(e) => {
                                    this.setState({
                                        spouse_length: e.target.value
                                    })
                                }}>
                                    <option disabled >Select</option>
                                    <option>1/2 year</option>
                                    <option>1 year</option>
                                    <option>1 1/2 years</option>
                                    <option>2 years</option>
                                    <option>More than 2 years</option>
                                </select>
                            </div>

                        </div>

                        <div className="input-wrapper">
                            <div className="label-input">
                                <label htmlFor="years-length">Years your income should provide after you pass?</label>
                                <input type="text" name="years-length" placeholder="200" onChange={(e) => {
                                    this.setState({
                                        years_provide: parseInt(e.target.value,10)
                                    })
                                }}/>
                            </div>
                        </div>

                        <div className="input-wrapper">

                            <div className="label-input">
                                <label htmlFor="children-to-college">How many children going to college?</label>
                                <select defaultValue={"Select"} name="children-to-college" required onChange={(e) => {
                                    this.setState({
                                        children_to_college: parseInt(e.target.value,10)
                                    })
                                }}>
                                    <option disabled >Select</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>More than 3</option>
                                </select>
                            </div>

                            <div className="label-input">
                                <label htmlFor="type-of-college">What type of college?</label>
                                <select defaultValue={"Select"} name="type-of-college" required onChange={(e) => {
                                    this.setState({
                                        type_of_college: e.target.value
                                    })
                                }}>
                                    <option disabled >Select</option>
                                    <option>Public University</option>
                                    <option>Private College</option>
                                    <option>Trade School</option>
                                    <option>Community College</option>
                                    <option>Other / Prefer not to answer</option>
                                </select>
                            </div>

                        </div>
                    </section>


                    {/* LONG TERM NEEDS SECTION ENDS */}


                    <button type="submit" className="calculate">Calculate</button>

                </form>

            </div>
            </div>
        )
    }

}