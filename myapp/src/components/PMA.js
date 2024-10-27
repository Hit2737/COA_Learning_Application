import InputValue from './PMA/InputValue';

export default function PerformanceMetricAnalyser({ mode }) {
    return (
        <>
            <h1 className="text-center my-3">Performance Metric Analyser</h1>
            <div className="row d-flex" style={{ height: '80vh' }}>
                <div className="col-md-8 mx">
                    <div className="row">
                        <InputValue title='Core Count' type='number' defaultValue={1} placeholder='Enter no. of Cores' min={1} max={1000000000000000} />
                        <InputValue title='Sequential Instructions' type='number' defaultValue={0} placeholder='Enter no. of Seq. Ins.' min={0} max={1000000000000000} />
                        <InputValue title='Parallelizable Instructions' type='number' defaultValue={0} placeholder='Enter no. of Par. Ins.' min={0} max={1000000000000000} />
                        <InputValue title='Avg. CPI' type='number' defaultValue={0} placeholder='Enter average Cycles per Ins.' min={0} max={1000000000000000} />
                    </div>
                    <div className="row">
                        <div className="col">

                        </div>
                    </div>
                </div>
                <div className="col-md-4" style={{ border: '1px solid black' }}>
                </div>
            </div>
        </>
    )
}
