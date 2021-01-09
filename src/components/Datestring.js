import React from 'react'

const Datestring = (props) => {
    let dat = new Date(props.datestring)
    let day = `${dat.getDate()<10?'0'+dat.getDate():dat.getDate()}`
    let month = `${dat.getMonth()+1<10?'0'+(dat.getMonth()+1):dat.getMonth()+1}`
    let year = `${dat.getFullYear()}`
    let datetime = `${year}-${month}-${day}`
    let d_string = null
    if (dat instanceof Date && day && month && year){
      d_string = `${day}.${month}.${year}`
    }
    const Datetime = d_string? (props) => (
                                          <time dateTime={props.datetime}>
                                            {props.d_string}  
                                          </time>):(
                                          <time>
                                            {props.d_string}  
                                          </time>
                                          )
    return <Datetime d_string={d_string} datetime={datetime}/>
}

export default Datestring
