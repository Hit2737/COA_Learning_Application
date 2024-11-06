// Case1: B1-->B2
// Case2: D-->B
// Case3: B-->D
// Case4: B-->B (same base)[handled earlier]

function ShowResult({ number, fromBase, toBase, decimalValue, outputInt, outputFrac, mode }) {
    const c1 = (fromBase !== 10 && toBase !== 10);
    const c2 = (fromBase === 10);
    const c3 = (toBase === 10);
    
    const style = {
        container: {
            backgroundColor: (mode==='dark')?'rgb(55 61 83)':"#F5F5F5",
            borderRadius: '8px',
            textAlign: 'center',
        },
        resultText: {
            fontSize: '1.2em',
        },
        numberBox: {
            display: 'inline-block',
            backgroundColor: '#fff',
            padding: '1px 5px',
            border: '2px solid #4CAF50',
            borderRadius: '5px',
            fontWeight: 'bold',
            color: '#000',
            // margin: '0 5px',
            fontSize: '0.8em',
        },
        box:{
            display: "inline-block",
            backgroundColor: "#fff",
            border: '2px solid #4CAF50',
            padding: "5px 10px",
            fontSize: "0.6em",
        },
    };

    return (
        <div className="nc-container p-3 mb-3" style={style.container}>
            <h4 className="">Summary</h4>
            <p className="p-3" style={{fontSize:"1em"}}>
            <div style={style.resultText}>
                Base-{fromBase} (<span className="deci" style={style.numberBox}>{number.toUpperCase()}</span>)   
                    {(c1 || c3)?(<>➔  Decimal (<span className="deci" style={style.numberBox}>{decimalValue}</span>)    </>):null}
                {(c1 || c2)?(<>➔   Base-{toBase} ({displayResult(outputInt,outputFrac,style)})</>):null}
            </div>
            </p>
        </div>
    );
}

function displayResult(outputInt, outputFrac,style) {
    return (
        <span style={style.numberBox}>
            <span>{CircleDisplay(outputInt)}</span>
            {(outputFrac === "") ? null : (
                <>
                    {CircleDisplay(".","#9B7EBD")}
                    <span>{CircleDisplay(outputFrac,"#ffd966","black")}</span>
                </>
            )}
        </span>
    );
}

function CircleDisplay(number,backcolor,color) {
    return (
        number.split('').map((digit, index) => (
            <span key={index} className="remainder-circle mx-1" style={{backgroundColor:backcolor, color:color, fontSize:"0.8em",width:"25px",height:"25px"}}>
                {digit}
            </span>
        ))
    );

}



export default ShowResult;
