import React from 'react'
import Tool from './Tool'

export default function ToolBox({ mode = 'light' }) {
    return (
        <>
            <div className="container my-3">
                <h1 className='text-center my-2'>Let's Learn COA Together</h1>
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-4">
                            <Tool mode={mode} title="Performance Metric Analyser" content="This tool will help you to analyse the performance of a Processor" goto="performacemetricanalyser" />
                        </div>
                        <div className="col-md-4">
                            <Tool mode={mode} title="Number Convertor" content="This tool will help you to convert numbers from one base to another" goto="numberconvertor" />
                        </div>
                        <div className="col-md-4">
                            <Tool mode={mode} title="Cache Simulator" content="This tool will help you to simulate the cache memory" goto='cachesimulator' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
