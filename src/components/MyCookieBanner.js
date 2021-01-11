import React from 'react'
import { CookieBanner } from '@palmabit/react-cookie-law'

const MyCookieBanner = () => {
    return (
        <CookieBanner
        message="Diese Website nutzt Cookies und vergleichbare Funktionen, also kleine Textdateien, die auf Ihrem Rechner gespeichert werden, zur Verarbeitung von Endgeräteinformationen. Es werden dabei nur Daten gespeichert, die unbedingt zum Betreiben der Website notwendig sind."
        showPreferencesOption={false}
        showStatisticsOption={false}
        showMarketingOption={false}
        wholeDomain={true}
        onAccept = {() => {console.log("Accept")}}
        //onAcceptPreferences = {() => {}}
        //onAcceptStatistics = {() => {}}
        //onAcceptMarketing = {() => {}}
        acceptButtonText = "Zustimmen"
        declineButtonText = "Ablehnen"
        necessaryOptionText="Technisch notwendige Cookies zulassen"
        showDeclineButton = {false}
        policyLink='/datenschutz/'
        privacyPolicyLinkText='Hinweise zum Datenschutz'
        className = "opal-glass"
        styles={{
          dialog: {zIndex: '10000', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width:'65%', height: '350px', borderRadius: '0.25rem'},
          container: {padding:'1.6rem', display:'flex', flexDirection:'column', height:'100%', justifyContent: 'space-between', alignItems:'center'},
          message: {fontSize:'1.2rem', color:'#2f353b', lineHeight:'1.15', marginBottom:'0.5rem'}, 
          policy: {textDecoration: 'none', fontSize:'1.2rem'},
          selectPane: {display:'flex', justifyContent: 'center'}, 
          optionWrapper: {display:'flex', flexDirection:'row', marginBottom:'0.5rem', alignItems: 'center'},
          optionLabel: {flex:'1 0 auto', fontSize:'1.2rem', flexWrap:'wrap'},
          checkbox: {flex:'0 0 1.5rem', transform:'translateY(-3px)'}, 
          buttonWrapper: {marginTop:'0.5rem', marginBottom:'0.5rem'},
          button: {fontSize:'1.6rem', fontWeight:'700'},
        }}
      />
    )
}

export default MyCookieBanner
