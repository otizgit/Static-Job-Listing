import React from "react";
import { nanoid } from 'nanoid'

export default function Job(props) {
  const buttonElements = props.languages.map((language) => (
    <button onClick={()=> props.handleFilterChange(language)} key={nanoid()}>{language}</button>
  ));

  return (
    <div className={`custom-width jobs-container ${props.featured ? "featured-block" : ""}`}>
      <div className="job-content">
        <img src={props.logo} alt={props.logo} />
        <div className="job-main-content">
          <div className="job-header">
            <h2 className="company">{props.company}</h2>
            <div className="jobs-misc">
              {props.new && <div className="new">New!</div>}
              {props.featured && <div className="new featured">Featured</div>}
            </div>
          </div>
          <h1 className="position">{props.position}</h1>
          <div className="job-track">
            <p className="track">{props.postedAt}</p>
            <div className="track-dot"></div>
            <p className="track">{props.contract}</p>
            <div className="track-dot"></div>
            <p className="track">{props.location}</p>
          </div>
        </div>
      </div>
      <div className="job-btns">{buttonElements}</div>
    </div>
  );
}
