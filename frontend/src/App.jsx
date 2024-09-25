import * as React from 'react';
import  {Header, Footer} from './components/'
import { Outlet } from 'react-router-dom';

function App() {
    return (
    <div className='flex flex-wrap content-between'>
        <div className="min-h-screen flex flex-col w-full block">
            <Header />
            <main className='m-4 grow pt-12'>
                <Outlet/>
            </main>
            <Footer />
        </div>
    </div>
    )
}

export default App
