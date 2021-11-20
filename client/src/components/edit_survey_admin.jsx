import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { API_URL } from './api_config';
import { NotificationManager } from 'react-notifications';
import ShowLoader from './loader';


function EditSurveyAdmin({ token }) {
    const [post, setPost] = useState({
        campaign_title: '',
        campaign_body: '',
        campaign_for: "Male",
        age_limit: "",
    })
    let params = useParams();
    const [Loading, setLoading] = useState(false);

    const onchangeHandler = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let resData = await axios.get(`${API_URL}/get_survey_admin/${params.id}`, {
                headers: {
                    "x-auth-token": token
                }
            })
            if (resData) {
                setPost({
                    campaign_title: resData?.data?.campaign_title,
                    campaign_for: resData?.data?.campaign_for,
                    campaign_body: resData?.data?.campaign_body,
                    age_limit: resData?.data?.age_limit,
                })
            }
            setLoading(false);
        }
        fetchData();
    }, [token, params.id])

    const postSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let resData = await axios.put(`${API_URL}/edit_survey/${params.id}`, post,
                {
                    headers: {
                        "x-auth-token": token
                    }
                }
            );
            if (resData?.data?._id) {
                setPost({
                    campaign_title: resData?.data?.campaign_title,
                    campaign_for: resData?.data?.campaign_for,
                    campaign_body: resData?.data?.campaign_body,
                    age_limit: resData?.data?.age_limit,
                })
                NotificationManager.success("Survey Edited Successfully.", "Success", 2000)
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
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
                    <div className="post-container">
                        <div className="blankContainer">
                            <b>Edit Survey....</b>
                        </div>
                        <div className="post-content">
                            <form onSubmit={postSubmitHandler} >
                                <label ><b>Campaign Title</b></label>
                                <input className="postinput" placeholder="Title of your campaign..." onChange={onchangeHandler} defaultValue={post?.campaign_title} name="campaign_title" type="text" required={true}  ></input>
                                <label ><b>Campaign For</b></label>
                                <select onChange={onchangeHandler} value={post?.campaign_for} name="campaign_for" className="postinput" id="gender">
                                    <option value="Male">Males</option>
                                    <option value="Female">Females</option>
                                </select>
                                <label ><b>Age Limit</b></label>
                                <input className="postinput" defaultValue={post?.age_limit} placeholder="Age of Respondents..." onChange={onchangeHandler} name="age_limit" type="text" required={true}  ></input>
                                <label ><b>Campaign Body</b></label>
                                <textarea rows="5" defaultValue={post?.campaign_body} id="textInput" placeholder="Write Something..." onChange={onchangeHandler} name="campaign_body" type="text" required={true}  ></textarea>
                                <button id="postButton" type="submit">Edit Survey</button>
                            </form>
                        </div >
                    </div >
            }
        </>

    );
}

export default EditSurveyAdmin
