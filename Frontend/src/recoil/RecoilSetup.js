import React from 'react';
import { RecoilRoot } from 'recoil';

const RecoilSetup = ({ children }) => {
    return (
        <RecoilRoot>
            {children}
        </RecoilRoot>
    );
};

export default RecoilSetup;
