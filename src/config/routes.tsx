import React from 'react';
import { Redirect } from 'react-router-dom';

import { WelcomeConfig } from 'pages/Welcome/WelcomeConfig';
import { GameConfig } from 'pages/Game/GameConfig';


let routeConfig = [
    WelcomeConfig,
    GameConfig
]

export const routes: object[] = [
    ...routeConfig,
    {
        path: '/',
        component: () => <Redirect to="/welcome" />
    }
];