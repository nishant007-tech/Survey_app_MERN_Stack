import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { API_URL } from './api_config';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import SmsTwoToneIcon from '@mui/icons-material/SmsTwoTone';
import ShowLoader from './loader';
import NotificationManager from 'react-notifications/lib/NotificationManager';

function SubmitSurveyResponse({ token, userData }) {

    let params = useParams();
    const [state, setState] = useState([]);
    const [response, setresponse] = useState("");
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

    const handleChange = (e) => {
        setresponse(e.target.value);
    }


    const handleSubmitResponse = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let resData = await axios.put(`${API_URL}/send_survey_response/${params.id}`,
                {
                    userid: userData?._id,
                    username: userData?.name,
                    responsetext: response,
                },
                {
                    headers: {
                        "x-auth-token": token
                    }
                }
            );
            if (resData?.data) {
                NotificationManager.success("Survey Response is submitted successfully!", "Success", 5000)
            }
            setLoading(false)
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }


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
                                <h3>Add Response</h3>
                            </span>
                            <textarea onChange={handleChange} rows="8" id="textInput" className="txtArea" placeholder="Write Something..." name="campaign_body" type="text" required={true}  ></textarea>
                            <button id="postButton" onClick={handleSubmitResponse} type="submit">Submit Response</button>

                        </div>
                    </div>
            }
        </>
    )
}

export default SubmitSurveyResponse
