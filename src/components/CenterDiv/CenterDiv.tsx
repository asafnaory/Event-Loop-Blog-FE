import React from 'react';

const CenteredDiv = ({ children }: {children: React.ReactNode}): JSX.Element => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {children}
    </div>
);

export default CenteredDiv;