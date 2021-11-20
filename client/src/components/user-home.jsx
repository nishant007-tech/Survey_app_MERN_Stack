import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from './api_config'
import { Link } from 'react-router-dom';
import ShowLoader from './loader';
import BeenhereTwoToneIcon from '@mui/icons-material/BeenhereTwoTone';
import SendSharpIcon from '@mui/icons-material/SendSharp';
function UserHome({ token, userData }) {

    const [state, setState] = useState([]);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let resData = await axios.get(`${API_URL}/get_all_user_surveys`, {
                headers: {
                    "x-auth-token": token
                }
            })
            if (resData?.data?.length > 0) {
                setState(resData?.data)
            }
            setLoading(false);
        }
        fetchData();
    }, [token])

    return (
        <div className="Wrapper">
            {
                Loading ?
                    <ShowLoader />
                    :
                    <div className="containerCard">
                        {
                            state?.length > 0 ?
                                state.map(item => (
                                    <div key={item._id} className="card">
                                        <p className="Count">{item?.campaign_title?.length > 20 ? item?.campaign_title.slice(0, 20) + `. . . . .` : item?.campaign_title}</p>
                                        <p className="campaignBody" >{item?.campaign_body.length > 190 ? item?.campaign_body.slice(0, 190) + `. . . . .` : item?.campaign_body}</p>
                                        {
                                            item?.responses?.length > 0 ?
                                                (
                                                    item?.responses?.map((data, index) => (
                                                        data.userid === userData?._id
                                                            ?
                                                            <span key={data._id} className="BtnBlank">
                                                                <BeenhereTwoToneIcon fontSize="large" className="Icons isResponsed" />
                                                            </span>
                                                            :
                                                            (
                                                                index === (item?.responses?.length) - 1 &&
                                                                <span key={data.userid} className="Btn1">
                                                                    <Link to={`/submit_survey_response/${item?._id}`}>
                                                                        <SendSharpIcon fontSize="large" className="Icons" />
                                                                    </Link>
                                                                </span>
                                                            )

                                                    ))
                                                )
                                                :
                                                <span className="Btn1">
                                                    <Link to={`/submit_survey_response/${item?._id}`}>
                                                        <SendSharpIcon fontSize="large" className="Icons" />
                                                    </Link>
                                                </span>
                                        }
                                    </div>
                                ))
                                :
                                <div>
                                    <p className="NoData">No Survey is Created yet! Please go to Create-Survey section to create one!</p>
                                </div>
                        }
                    </div >
            }

        </div >

    )
}

export default UserHome
