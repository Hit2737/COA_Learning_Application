// Case1: B1-->B2
// Case2: D-->B
// Case3: B-->D
// Case4: B-->B (same base)[handled earlier]

function ShowResult({ number, fromBase, toBase, decimalValue, outputInt, outputFrac }) {
    const c1 = (fromBase !== 10 && toBase !== 10);
    const c2 = (fromBase === 10);
    const c3 = (toBase === 10);
    return (
        <div className="container" style={style.container}>
            <h3 className="my-2 pb-2">Result</h3>
            <h5>
            <div style={style.resultText}>
                Base-{fromBase} (<span className="deci" style={style.numberBox}>{number.toUpperCase()}</span>)   
                    {(c1 || c3)?(<>➔  Decimal (<span className="deci" style={style.numberBox}>{decimalValue}</span>)    </>):null}
                {(c1 || c2)?(<>➔   Base-{toBase} ({displayResult(outputInt,outputFrac)})</>):null}
            </div>
            </h5>
        </div>
    );
}

function displayResult(outputInt, outputFrac) {
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
            <span key={index} className="remainder-circle mx-1" style={{backgroundColor:backcolor, color:color, fontSize:"0.6em"}}>
                {digit}
            </span>
        ))
    );

}

const style = {
    container: {
        backgroundColor: '#E2F1E7',
        color: "black",
        width: 'auto',
        padding: '15px',
        borderRadius: '10px',
        border: '1px solid #ccc',
        margin: '20px auto',
        textAlign: 'center',
    },
    resultText: {
        fontSize: '1.2em',
        color: '#333',
    },
    numberBox: {
        display: 'inline-block',
        backgroundColor: '#fff',
        padding: '5px 10px',
        border: '2px solid #4CAF50',
        borderRadius: '5px',
        fontWeight: 'bold',
        margin: '0 5px',
        fontSize: '0.8em',
    },
    box:{
        display: "inline-block",
        backgroundColor: "#fff",
        border: '2px solid #4CAF50',
        padding: "5px 10px",
        fontSize: "0.6em",
    },
    circle: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "30px",
        height: "30px",
        backgroundColor: "#df5762",
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "50%", /* Makes it a circle */
        fontSize: "0.9em",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        margin: "auto",
    }
};

export default ShowResult;
