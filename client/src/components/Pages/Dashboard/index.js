import { withFirebase } from './../../Firebase';
import './style.css'
import { useAuth } from './../../Session/AuthContext';
import { useEffect } from 'react';

function Dashboard({ firebase }) {
    const { currentUser } = useAuth(); 

    useEffect(() => {
        console.log(currentUser)
    })

    return (
        <>
            <div className="dashboard">
                <div>
                    <p>Hi</p>
                </div>
                <div>
                    <p>Hi</p>
                </div>
                <div>
                    <p>Hi</p>
                </div>
            </div>
        </>
    )
}

export default withFirebase(Dashboard);