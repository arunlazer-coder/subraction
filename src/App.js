import React, { Component } from 'react'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      max:0,
      showAnswers:false,
      answers:[],
    }
  }

   getPrimes() {
    var sieve = [], i, j, primes = [];
    for (i = 2; i <= this.state.max; ++i) {
        if (!sieve[i]) {
            primes.push(i);
            for (j = i << 1; j <= this.state.max; j += i) {
                sieve[j] = true;
            }
        }
    }
    const ran_no = Math.floor(this.random(0, primes.length));

    return primes[ran_no];
   }

    random(mn, mx) {  
      return Math.random() * (mx - mn) + mn;  
    }  

  getEquation() {
    const a  = this.getPrimes();
    const b  = this.getPrimes();
    const c = b > a ? b - a : a - b;
    const answer = {
            "a"  : a > b ? a : b,
            "b"  : a < b ? a : b,
            "c"  : c
    };
    return  answer;
  }
  
   show(e) {
    e.preventDefault();
    
    this.setState({max:e.target.username.value ? e.target.username.value : 100}, () => {
    
      let answers = []
      for (let i = 0; i < 10; i++) {
        answers.push(this.getEquation())
      };
        this.setState({answers}, () => {console.log(this.state.answers);})
    })
    
   }

  render() {
    const { max, showAnswers, answers } = this.state
    return (
      <div className="limiter">
          <div className="container-login100" style={{backgroundImage: 'url("images/bg-01.jpg")'}}>
            <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            {max === 0 ?
              <form className="login100-form validate-form" onSubmit={(e) => this.show(e)}>
                <span className="login100-form-title p-b-49">
                  Vishnu & Vishuva 
                </span>
                <div className="wrap-input100 validate-input m-b-23" >
                  <span className="label-input100">Enter Maximum Number</span>
                  <input className="input100" type="text" name="username" placeholder="Type your username" />
                  <span className="focus-input100" data-symbol="" />
                </div>
                
                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn" />
                    <button className="login100-form-btn">
                      Show Prime Number Subractions
                    </button>
                  </div>
                </div>
              </form>
              :
              <>
              <div className="container-login100-form-btn mb-100">
                  <div className="wrap-back100-form-btn">
                    <div className="back100-form-bgbtn" />
                    <button className="login100-form-btn" onClick={() => this.setState({showAnswers:false, max:0})} >
                          Go Back
                    </button>
                  </div>
                </div>

              <table className="table-fill">
                <thead>
                  <tr>
                    <th className="text-left">Question</th>
                    <th className="text-left">Answer</th>
                  </tr>
                </thead>

                <tbody className="table-hover">
                  {answers.length > 0 && answers.map((item, index) =>(
                     <tr key={index}>
                      <td key={index+1} className="text-left bg-grey">{item.a} - {item.b}</td>
                      <td key={index+2} className="text-left bg-green" >{showAnswers ? item.c : "-"}</td>
                    </tr>
                  )
                  )}

                </tbody>
                
                </table>  
                <div className="container-login100-form-btn mt-100">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn" />
                    <button className="login100-form-btn" onClick={() => this.setState({showAnswers:true})} >
                          Show Answers
                    </button>
                  </div>
                </div>

            </>
  
            }

            </div>
            
          </div>
       </div>

    )
  }
}
