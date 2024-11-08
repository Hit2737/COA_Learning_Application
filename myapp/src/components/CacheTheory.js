import React, { useState } from 'react';

export default function CacheTheory() {
    const [selectedCache, setSelectedCache] = useState('');

    // Cache explanations
    const cacheExplanations = {
        'L1 Cache': 'L1 Cache is the fastest and closest cache to the CPU, used for quick access.',
        'L2 Cache': 'L2 Cache is larger than L1 and serves as an intermediary between L1 and main memory.',
        'Memory': 'Memory refers to the main RAM, which stores data for active processes but is slower than caches.'
    };

    const handleDropdownChange = (cacheType) => {
        setSelectedCache(cacheType); // Set the selected cache type
    };

    return (
        <div>
            <h1 className="text-center">Cache Theory</h1>
            <div className="container text-center my-3">
                {/* Single Dropdown */}
                <select
                    className="form-select"
                    style={{ display: 'inline-block', width: '200px', textAlign: 'center' }}
                    onChange={(e) => handleDropdownChange(e.target.value)}
                    defaultValue=""
                >
                    <option value="" disabled>Select Cache Level</option>
                    <option value="L1 Cache">L1 Cache</option>
                    <option value="L2 Cache">L2 Cache</option>
                    <option value="Memory">Memory</option>
                </select>

                {/* Display the explanation based on the selection */}
                {selectedCache && (
                    <p className="mt-3">
                        {cacheExplanations[selectedCache]}
                    </p>
                )}
            </div>
        </div>
    );
}
