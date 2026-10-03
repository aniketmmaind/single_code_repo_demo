import { useEffect, useState } from "react";
import axios from 'axios';

function Organization(params) {
    const [organizations, setOrganizations] = useState([]);
    useEffect(() => {
        console.log("inside useEffect");
        axios.get('http://localhost:3000/api/organization/v1/fetch-org')
            .then((response) => {

                setOrganizations(response.data.data);
            });

    }, []);

    return (
        <>
            <h1>Organization</h1>
            <div>
                {organizations.map((organization) => (
                    <p key={organization._id}>
                        {organization.name}
                    </p>
                ))}
            </div>
        </>
    );
}

export default Organization;