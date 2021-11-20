import React from 'react'
import TimelineTwoToneIcon from '@mui/icons-material/TimelineTwoTone';
function Home() {
    return (
        <div className="homeContainer">
            <span>
                <TimelineTwoToneIcon className="HomeIcon" />
                <h2>Survey App Developed By <b style={{ color: "#f74046" }}>Nishant Rana.</b></h2>
                <h3>If Stucked , Follow the instructions here.</h3>
                <a className="InstructionsLink" href="https://github.com/nishant007-tech/Survey_app_MERN_Stack" target="_blank"><i className="fa fa-github"></i> Github Link</a>
                <div className="copyright">
                    <i>Copyright ©2021 </i>
                </div>
            </span>
        </div>
    )
}

export default Home
