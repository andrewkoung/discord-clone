import { withFirebase } from './../../Firebase';
import './style.css'

function Dashboard({ firebase }) {
    return (
        <>
            <div className="dashboard">
                <p>hi</p>
            </div>
        </>
    )
}

export default withFirebase(Dashboard);