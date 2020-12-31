import { withFirebase } from './../../Firebase';

function Dashboard({ firebase }) {
    return (
        <>
            <p>Dashboard</p>
        </>
    )
}

export default withFirebase(Dashboard);