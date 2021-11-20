import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { API_URL } from './api_config';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import SmsTwoToneIcon from '@mui/icons-material/SmsTwoTone';
import ShowLoader from './loader';

function ViewSurveyAdmin({ token }) {
    let params = useParams();
    const [state, setState] = useState([]);
    const [Loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let resData = await axios.get(`${API_URL}/get_survey_admin/${params.id}`, {
                headers: {
                    "x-auth-token": token
                }
            })
            if (resData) {
                setState(resData?.data);
            }
            setLoading(false);
        }
        fetchData();
    }, [token, params.id])

    return (
        <>
            {
                Loading ?
                    <ShowLoader />
                    :
                    <div className="viewContainerAdmin">
                        <div className="viewContentAdmin">
                            <span>
                                <ArrowRightAltIcon />
                                <h3 className="campaign_title">{state?.campaign_title}</h3>
                            </span>
                            <p className="Date">Created At: {new Date(state?.createdAt).toLocaleDateString()}</p>
                            <p>
                                {state?.campaign_body}
                            </p>
                            <span>
                                <SmsTwoToneIcon style={{ height: "50px", width: "30px" }} />
                                <h3>Responses</h3>
                            </span>
                            {state?.responses?.length > 0
                                ?
                                state?.responses?.map(item => (
                                    <div className="UserResponsesContainer">
                                        <div className="UserResponses">
                                            <div>
                                                <p><strong>Name: </strong>{item.username}</p>
                                                <p><strong>User Response: </strong>{item.responsetext}
                                                </p>
                                            </div>
                                        </div>
                                        < hr id="hr2"></hr>
                                    </div>
                                ))
                                :
                                <div>
                                    <p className="NoData">No Response Received Yet!</p>
                                </div>
                            }


                        </div>
                    </div>
            }
        </>
    )
}

export default ViewSurveyAdmin
