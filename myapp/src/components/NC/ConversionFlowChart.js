import React from 'react';

const ConversionFlowChart = ({ fromBase, toBase, number }) => {
    const renderFlowMap = () => {
        const flowItems = [];

        // Check the conversion cases and generate steps based on the strategy
        if (fromBase === toBase) {
            flowItems.push(
                { id: 1, label: `Base-${fromBase} → Base-${toBase} (No Conversion Required)` }
            );
        } else if (fromBase === 10) {
            flowItems.push(
                { id: 1, label: `Decimal (Base-${fromBase})` },
                { id: 2, label: `Integer Part (Base-${toBase})` },
                { id: 3, label: `Fractional Part (Base-${toBase})` }
            );
        } else if (toBase === 10) {
            flowItems.push(
                { id: 1, label: `Base-${fromBase} → Decimal (Base-${toBase})` }
            );
        } else {
            flowItems.push(
                { id: 1, label: `Base-${fromBase} → Decimal (Base-10)` },
                { id: 2, label: `Integer Part (Base-${toBase})` },
                { id: 3, label: `Fractional Part (Base-${toBase})` }
            );
        }

        return flowItems.map((item, index) => (
            <div key={item.id} className="flow-box">
                {item.label}
                {index < flowItems.length - 1 && (
                    <div className="arrow">→</div>
                )}
            </div>
        ));
    };

    return (
        <div style={styles.flowChartContainer}>
            <h2>Number Conversion Strategy</h2>
            <div className="flow-container">
                {renderFlowMap()}
            </div>
        </div>
    );
};

const styles = {
    flowChartContainer: {
        border: '2px solid #4CAF50',
        borderRadius: '8px',
        padding: '20px',
        width: '60%',
        margin: 'auto',
        backgroundColor: '#f9f9f9',
        color: '#333',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    },
};

// CSS for flow chart
const css = `
.flow-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
}

.flow-box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    border: 2px solid #4CAF50;
    border-radius: 8px;
    background-color: #fff;
    color: #333;
    font-weight: bold;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
}

.arrow {
    font-size: 24px;
    font-weight: bold;
    color: #4CAF50;
    margin: 0 8px;
}
`;

export default ConversionFlowChart;

// Adding the CSS to document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = css;
document.head.appendChild(styleSheet);
