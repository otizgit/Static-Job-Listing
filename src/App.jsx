import React from "react";
import data from "../data.json";
import { useState, useEffect } from "react";
import Job from "./Components/Job";
import { nanoid } from "nanoid";

export default function App() {
  const newData = data.map((list) => {
    return {
      ...list,
      allBtnContent: [list.role, list.level, ...list.languages, ...list.tools],
    };
  });

  const [allData, setAllData] = useState(newData);
  const [filterState, setFilterState] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const jobElement = allData.map((jobs) => {
    return (
      <Job
        key={jobs.id}
        company={jobs.company}
        contract={jobs.contract}
        featured={jobs.featured}
        location={jobs.location}
        logo={jobs.logo}
        new={jobs.new}
        position={jobs.position}
        postedAt={jobs.postedAt}
        languages={jobs.allBtnContent}
        handleFilterChange={handleFilterChange}
      />
    );
  });

  useEffect(() => {
    let filteredArray;
    if (filteredJobs.length === 0) {
      setFilterState(false);
      setAllData(newData);
    } else {
      setAllData((prevData) => {
        filteredArray = prevData.filter((newData) => {
          return newData.allBtnContent.some((value) =>
            filteredJobs.includes(value)
          );
        });
        return filteredArray;
      });
    }
  }, [filteredJobs]);

  function handleFilterChange(language) {
    setFilterState(true);
    setFilteredJobs((prevFilteredJobs) => {
      return prevFilteredJobs.includes(language)
        ? prevFilteredJobs
        : [...prevFilteredJobs, language];
    });
  }

  const filteredJobsElement = filteredJobs.map((jobs) => {
    return (
      <div key={nanoid()} className="filtered-box">
        <p className="filtered-language">{jobs}</p>
        <button onClick={() => updateFilteredJobs(jobs)} className="close-btn">
          <img src="./images/icon-remove.svg" alt="close-button" />
        </button>
      </div>
    );
  });

  function clearFilteredJobs() {
    setFilterState(false);
    setFilteredJobs([]);
  }

  function updateFilteredJobs(job) {
    setFilteredJobs((prevFilteredJobs) => {
      return prevFilteredJobs.filter((jobs) => {
        return job !== jobs;
      });
    });
  }

  return (
    <div>
      <header>
        <picture>
          <source
            media="(max-width: 960px)"
            srcSet="./images/bg-header-mobile.svg"
          />
          <img src="./images/bg-header-desktop.svg" alt="Header image" />
        </picture>
      </header>

      <main>
        {filterState && (
          <div className="custom-width filter-container">
            <div className="filtered-div">{filteredJobsElement}</div>
            <div className="clear" onClick={clearFilteredJobs}>
              Clear
            </div>
          </div>
        )}
        {jobElement}
      </main>
    </div>
  );
}
