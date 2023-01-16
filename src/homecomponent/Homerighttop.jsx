import { useEffect, useState } from 'react';
import "./homerighttop.css"

function HomeRighttop() {
const [date,setdate] = useState([]);

function dateOrdinal(d) {
    return d+(31===d||21===d||1===d?"st":22===d||2===d?"nd":23===d||3===d?"rd":"th")
};

useEffect(()=>
{
    let today = new Date();
    const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
    let date= dateOrdinal(today.getDate())+"/"+formatter.format(new Date())+"/"+today.getFullYear();
    setdate(date);
},[])
  
  return (
    <>
    <div className="right-div-alpha-tab-main">
        <div className="alpha-current">
            Date - {date}
        </div>
        </div>
    </>
  );
}

export default HomeRighttop;
