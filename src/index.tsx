import React from 'react'
import { createRoot } from 'react-dom/client'
import { MathIndex, MathDetail } from './apps/math'
import {
    createHashRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";

if ('serviceWorker' in navigator) {
    addEventListener('load', async function () {
        navigator.serviceWorker.register('/static/sw.js', {scope: '/'})
    })
}

const app = document.getElementById('app')
if (app) {
    const clientWidth = app.getBoundingClientRect().width
    const App = () => {
        const cols = Math.floor(clientWidth / 120)
        const width = clientWidth / cols
        return <>
            <Link to={'/math'} style={{ float: 'left', width, height: width, textAlign: 'center', padding: '12px 0' }}>
                <img src="/img/math.png" style={{ borderRadius: 10, boxShadow: '0 0 5px rgba(0,0,0,.4)' }}/>
            </Link>
            
        </>
    }

    const router = createHashRouter([
        {
          path: "/",
          element: <App />,
        },
        {
          path: "math",
          element: <MathIndex />,
        },
        {
            path: "math/detail/:id",
            element: <MathDetail />,
          },
    ]);


    createRoot(app).render(<RouterProvider router={router} />)
}

