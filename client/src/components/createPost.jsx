import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { API_URL } from './api_config';

function CreatePost({ userData }) {
    const [post, setPost] = useState({
        campaign_title: '',
        campaign_body: '',
        campaign_for: "Male",
        age_limit: "",
        campaign_author: userData?._id,
    })
    const navigate = useNavigate();
    const onchangeHandler = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }
    const postSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log(post)
            let token = localStorage.getItem('survey-user-token');
            await axios.post(`${API_URL}/create-survey`, post,
                {
                    headers: {
                        "x-auth-token": token
                    }
                }
            );
            navigate("/admin-home");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="post-container">
            <div className="blankContainer">
                <b>Say Something....</b>
            </div>
            <div className="post-content">
                <form onSubmit={postSubmitHandler} >
                    <label ><b>Campaign Title</b></label>
                    <input className="postinput" placeholder="Title of your campaign..." onChange={onchangeHandler} name="campaign_title" type="text" required={true}  ></input>
                    <label ><b>Campaign For</b></label>
                    <select className="PostSelect" onChange={onchangeHandler} name="campaign_for" id="gender">
                        <option value="Male">Males</option>
                        <option value="Female">Females</option>
                    </select>
                    <label ><b>Age Limit</b></label>
                    <input className="postinput" placeholder="Age of Respondents..." onChange={onchangeHandler} name="age_limit" type="text" required={true}  ></input>
                    <label ><b>Campaign Body</b></label>
                    <textarea rows="5" id="textInput" placeholder="Write Something..." onChange={onchangeHandler} name="campaign_body" type="text" required={true}  ></textarea>
                    <button id="postButton" type="submit">Create Survey</button>
                </form>
            </div >
        </div >

    );
}

export default CreatePost;