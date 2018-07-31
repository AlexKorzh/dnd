import React from 'react';
import mockData from './mockData';
import NodeRenderContainer from './NodeRenderContainer';
import DnDProvider from './components/DnDProvider';

const App = () => {
    return (
        <div id="app">
            <DnDProvider>
                <NodeRenderContainer node={mockData}/>
            </DnDProvider>
        </div>
    );
};

export default App;
