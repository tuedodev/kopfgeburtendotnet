import React, { Component } from 'react'
import { Link, navigate } from "gatsby"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Captcha from "./Captcha"

function renderValidationClasses({touched, errors, valid, invalid}){
  let c = ``;
  if (touched){
    c = errors ? ` ${invalid}`: ` ${valid}`;
  }
  return c;
}



export default class ContactForm extends Component{

  constructor(props) {
    super(props);
    this.state = {zahl1:'z1', zahl2:'z2'};
  }

  componentDidMount() {
    this.captchaChild = React.createRef()
  }

  handleCaptchaOnChange(zahl1, zahl2){
    this.setState({zahl1, zahl2});
  }
  
  render(){
    const newDate = new Date();
    const captchaChild = this.captchaChild;
    
    return (
        <Formik
            initialValues={{
                    lastName: '',
                    email: '',
                    phone: '',
                    message: '',
                    privacy: false,
                    kg_tme: newDate.getTime(), // Test
                    captcha_input: '',
            }}
        
            validationSchema={Yup.object({
                lastName: Yup.string()
                    .min(3, 'Der Name ist zu kurz.')
                    .max(80, 'Der Name ist zu lang.')
                    .required('Das Feld ist ein Pflichtfeld.'),
                email: Yup.string().email('Ungültige E-Mail-Adresse').required('Das Feld ist ein Pflichtfeld.'),
                phone: Yup.string()
                    .min(5, 'Die Telefonnummer ist zu kurz.')
                    .max(60, 'Die Telefonnummer ist zu lang.'),
                message: Yup.string()
                    .min(5, 'Die Nachricht ist zu kurz.')
                    .required('Das Feld ist ein Pflichtfeld.'),
                privacy: Yup.boolean().required('Das Feld ist ein Pflichtfeld.').oneOf([true], 'Sie müssen den Hinweisen zum Datenschutz zustimmen'),    
                kg_tme: Yup.number().test('Captcha-Timer', 'Ungültige Eingabe',
                  function(value){
                    const now = new Date()
                    if (now-value > 15000){
                      console.log("Gültig!");
                      return true;
                    } else {
                      console.log("Ungültig!");  
                      return false;
                    }
                  }
                ),
                captcha_input: Yup.number()
                  .required('Das Feld ist ein Pflichtfeld.')
                  .typeError('Sie müssen eine Zahl eingeben.')
                  .positive('Bitte geben Sie eine positive ganze Zahl ein.')
                  .integer('Bitte geben Sie eine positive ganze Zahl ein.')
                  .test('Captcha-Rechenaufgabe', 'Falsche Eingabe',
                function(value){
                  let {zahl1, zahl2} = captchaChild.current.state;
                  if (zahl1+zahl2 === parseInt(value)){
                    return true;
                  }
                  return false;
                })    
              })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    window.confirm(JSON.stringify(values, null, 2)+'\n\nSie werden zur Startseite geleitet.');
                    setSubmitting(false);
                    navigate('/', { replace: true }) // Delete History
                }, 400);
            }}
        >
            {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
       }) => (
         <Form>
              <div className="form-floating mb-3">
                <input type="text" name="lastName" className={"form-control form-control-lg shadow" + renderValidationClasses({touched:touched.lastName, errors:errors.lastName, valid: 'is-valid', invalid: 'is-invalid'})} id="lastName" placeholder="Name" onChange={handleChange} onBlur={handleBlur} value={values.lastName} aria-describedby="val_feedback_name"/>
                <label htmlFor="lastName">Name</label>
                <div id="val_feedback_name" className={"val_feedback" + renderValidationClasses({touched:touched.lastName, errors:errors.lastName, valid: 'valid-feedback', invalid: 'invalid-feedback'})}>
                    {touched.lastName && errors.lastName ? <span>{errors.lastName}</span> : <span>&nbsp;</span>}
                </div>
              </div>
              <div className="form-floating mb-3">
                <input type="email" name="email" className={"form-control form-control-lg shadow" + renderValidationClasses({touched:touched.email, errors:errors.email, valid: 'is-valid', invalid: 'is-invalid'})} id="email" placeholder="E-Mail" onChange={handleChange} onBlur={handleBlur} value={values.email} aria-describedby="val_feedback_email"/>
                <label htmlFor="email">E-Mail</label>
                <div id="val_feedback_email" className={"val_feedback" + renderValidationClasses({touched:touched.email, errors:errors.email, valid: 'valid-feedback', invalid: 'invalid-feedback'})}>
                    {touched.email && errors.email ? <span>{errors.email}</span> : <span>&nbsp;</span>}
                </div>
              </div>
              <div className="form-floating mb-3">
                <input type="phone" name="phone" className={"form-control form-control-lg shadow" + renderValidationClasses({touched:touched.phone, errors:errors.phone, valid: 'is-valid', invalid: 'is-invalid'})} id="phone" placeholder="E-Mail" onChange={handleChange} onBlur={handleBlur} value={values.phone} aria-describedby="val_feedback_phone"/>
                <label htmlFor="phone">Telefonnummer</label>
                <div id="val_feedback_phone" className={"val_feedback" + renderValidationClasses({touched:touched.phone, errors:errors.phone, valid: 'valid-feedback', invalid: 'invalid-feedback'})}>
                    {touched.phone && errors.phone ? <span>{errors.phone}</span> : <span>&nbsp;</span>}
                </div>
              </div>
              <div className="form-floating mb-3">
                <textarea className={"form-control shadow" + renderValidationClasses({touched:touched.message, errors:errors.message, valid: 'is-valid', invalid: 'is-invalid'})} name="message" placeholder="Nachricht" id="message" style={{height:'200px'}} onChange={handleChange} onBlur={handleBlur} value={values.message} aria-describedby="val_feedback_message"></textarea>
                <label htmlFor="message">Nachricht</label>
                <div id="val_feedback_message" className={"val_feedback" + renderValidationClasses({touched:touched.message, errors:errors.message, valid: 'valid-feedback', invalid: 'invalid-feedback'})}>
                    {touched.message && errors.message ? <span>{errors.message}</span> : <span>&nbsp;</span>}
                </div>
              </div>
              <div className="form-check mb-3">
                <input type="checkbox" name="privacy" className={"form-check-input" + renderValidationClasses({touched:touched.privacy, errors:errors.privacy, valid: 'is-valid', invalid: 'is-invalid'})} id="privacy" onChange={handleChange} onBlur={handleBlur} value={values.privacy} aria-describedby="val_feedback_privacy"/>
                <label className="form-check-label" htmlFor="privacy">
                    Die <Link to="/datenschutz/" aria-current="page" style={{textDecoration:'none'}}>Hinweise zum Datenschutz</Link> habe ich gelesen und stimme ihnen hiermit zu.
                </label>
                <div id="val_feedback_privacy" className={"val_feedback" + renderValidationClasses({touched:touched.privacy, errors:errors.privacy, valid: 'valid-feedback', invalid: 'invalid-feedback'})}>
                    {touched.privacy && errors.privacy ? <span>{errors.privacy}</span> : <span>&nbsp;</span>}
                </div>
              </div>
              <div className="row">
                <div style={{display:'flex', flexDirection:'row'}}>
                  <div style={{flex:'0 0 auto',display:'flex'}}>
                    <div style={{display:'flex', height:'calc(3.5rem + 2px)', padding:'0.5rem 1rem 0.5rem 0', alignItems: 'center'}}>
                      <Captcha className="shadow" ref={this.captchaChild} callbackOnChange={this.handleCaptchaOnChange.bind(this)}/>
                    </div>
                  </div>
                  <div style={{flex:'1 1 auto', marginRight:'1rem'}}>
                    <div className="form-floating mb-3">
                      <input type="text" className={"form-control shadow" + renderValidationClasses({touched:touched.captcha_input, errors:errors.captcha_input, valid: 'is-valid', invalid: 'is-invalid'})} name="captcha_input" placeholder="" aria-label="Captcha Input" onChange={handleChange} onBlur={handleBlur} value={values.captcha_input} aria-describedby="val_feedback_captcha"/> 
                      <label htmlFor="captcha_input">Bitte geben Sie hier die Lösung ein</label>
                      <div id="val_feedback_captcha" className={"val_feedback" + renderValidationClasses({touched:touched.captcha_input, errors:errors.captcha_input, valid: 'valid-feedback', invalid: 'invalid-feedback'})}>
                        {touched.captcha_input && errors.captcha_input ? <span>{errors.captcha_input}</span> : <span>&nbsp;</span>}
                      </div>
                    </div>
                  </div>
                  <div style={{flex:'0 0 auto'}}>
                    <div style={{display:'flex', height:'calc(3.5rem + 2px)', padding:'0.5rem 1rem 0.5rem 0', alignItems: 'center'}}>
                      <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                          Senden
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/*<div className="row g-2">
                <div className="col-4 col-md-4 col-lg-2">
                  <div className="input-group mb-3">
                    <Captcha className="shadow" ref={this.captchaChild} callbackOnChange={this.handleCaptchaOnChange.bind(this)}/>
                  </div>
                </div>
                <div className="col-4 col-md-5 col-lg-8">
                  <div className="form-floating mb-3">
                    <input type="text" className={"form-control shadow" + renderValidationClasses({touched:touched.captcha_input, errors:errors.captcha_input, valid: 'is-valid', invalid: 'is-invalid'})} name="captcha_input" placeholder="" aria-label="Captcha Input" onChange={handleChange} onBlur={handleBlur} value={values.captcha_input} aria-describedby="val_feedback_captcha"/> 
                    <label htmlFor="captcha_input">Bitte geben Sie hier die Lösung ein</label>
                    <div id="val_feedback_captcha" className={"val_feedback" + renderValidationClasses({touched:touched.captcha_input, errors:errors.captcha_input, valid: 'valid-feedback', invalid: 'invalid-feedback'})}>
                      {touched.captcha_input && errors.captcha_input ? <span>{errors.captcha_input}</span> : <span>&nbsp;</span>}
                    </div>
                  </div>
                </div>
                  <div className="col-4 col-md-3 col-lg-2">
                    <div className="input-group mb-3">
                      <button type="submit" className="btn btn-primary mb-4" disabled={isSubmitting}>
                        Senden
                      </button>
                    </div>
                  </div>
              </div>*/}
      
              <Field type="hidden" className="form-control" name="kg_tme" />
            </Form>
       )}
        </Formik>
    );
  }
}
