import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { API_URL } from './api_config'
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import ShowLoader from './loader';
function AdminHome({ token }) {

    const [state, setState] = useState([]);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let resData = await axios.get(`${API_URL}/get_all_surveys`, {
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

    const handleDelete = async (deleteId) => {
        try {
            let resData = await axios.delete(`${API_URL}/delete_survey/${deleteId}`,
                {
                    headers: {
                        "x-auth-token": token
                    }
                }
            )
            if (resData) {
                setState(resData?.data)
                NotificationManager.success("Survey Deleted Successfully.", "Success", 5000)
            }
        } catch (error) {
            console.log(error)
        }
    }

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
                                        <p>{item?.campaign_body.length > 190 ? item?.campaign_body.slice(0, 190) + `. . . . .` : item?.campaign_body}</p>
                                        <span className="Btn0">
                                            <Link to={`/view_survey/${item?._id}`}>
                                                <RemoveRedEyeTwoToneIcon fontSize="large" className="Icons" />
                                            </Link>
                                        </span>
                                        <span className="Btn1">
                                            <Link to={`/edit_survey/${item?._id}`}>
                                                <EditTwoToneIcon fontSize="large" className="Icons" />
                                            </Link>
                                        </span>
                                        <span className="Btn2" onClick={() => handleDelete(item?._id)}>
                                            <DeleteOutlineTwoToneIcon fontSize="large" className="Icons" />
                                        </span>
                                    </div>
                                ))
                                :
                                <div>
                                    <p className="NoData">No Survey is Created yet! Please go to Create-Survey section to create one!</p>
                                </div>
                        }
                    </div>
            }

        </div >

    )
}

export default AdminHome
