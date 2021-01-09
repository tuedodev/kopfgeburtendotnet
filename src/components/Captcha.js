import React, { Component } from 'react'

export default class Captcha extends Component {

    static numberVerbose = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

    state = {
        zahl1:  Math.ceil(Math.random()*9),
        zahl2:  Math.ceil(Math.random()*9),
    }
        
    handleOnChange(e){
        let zahl1 = Math.ceil(Math.random()*9);
        let zahl2 = Math.ceil(Math.random()*9)
        this.setState({ zahl1, zahl2 })
        const type = typeof this.props.callbackOnChange;
        if(type === 'function'){
            this.props.callbackOnChange(zahl1, zahl2);
        }
        
    }
    
    render() {
        const {className} = this.props
        const numberVerbose = Captcha.numberVerbose || []
        return (
            <>
                <button type="button" className={"btn btn-primary " + className} onClick={this.handleOnChange.bind(this)} style={{marginRight:'1rem'}}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-repeat" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
                        <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"></path>
                    </svg>
                </button>
                <p className={"mb-0 input-group-text cpt-group " + className}>
                    <span className={numberVerbose[this.state.zahl1-1]}></span>
                    <span className={"plus"}></span>
                    <span className={numberVerbose[this.state.zahl2-1]}></span>
                </p>
            </>
        )
    }
}
