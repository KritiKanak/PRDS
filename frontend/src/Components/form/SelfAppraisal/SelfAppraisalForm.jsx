import React, { useEffect, useState } from "react";
import "./SelfAppraisalForm.css";
import { useGlobalContext } from "../../../StateContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SelfAppraisalForm = () => {
  const navigate = useNavigate();
  const { curuser, setcuruser } = useGlobalContext();
  const [isEditable, setIsEditable] = useState(true);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateoffillingSA, setdateoffillingSA] = useState("");
  const [jobAssignments, setJobAssignments] = useState([
    { serialNumber: "", jobAssigned: "", correspondingAchievement: "" },
  ]);
  const [achievements, setAchievements] = useState([
    { serialNumber: "", achievement: "", deliverable: "" },
  ]);

  const handleJobAssignmentChange = (index, event) => {
    const { name, value } = event.target;
    const updatedAssignments = [...jobAssignments];
    updatedAssignments[index][name] = value;
    setJobAssignments(updatedAssignments);
  };

  const handleAchievementChange = (index, event) => {
    const { name, value } = event.target;
    const updatedAchievements = [...achievements];
    updatedAchievements[index][name] = value;
    setAchievements(updatedAchievements);
  };

  const addJobAssignmentRow = () => {
    setJobAssignments([
      ...jobAssignments,
      { serialNumber: "", jobAssigned: "", correspondingAchievement: "" },
    ]);
  };

  const addAchievementRow = () => {
    setAchievements([
      ...achievements,
      { serialNumber: "", achievement: "", deliverable: "" },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    lockForm();
  };

  const lockForm = () => {
    setIsEditable(false);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const lockAndSubmit = async () => {
    const updatedFormData = {
      ...curuser,
      appraiselPeriodFrom: fromDate,
      appraiselPeriodTo: toDate,
      selfAppFormData1: jobAssignments,
      selfAppFormData2: achievements,
      dateOfFillingSelfAppraisalForm: dateoffillingSA,
      SelfAppraisal_status: true,
    };
    setcuruser(updatedFormData);
    const { data } = await axios.post(
      "http://localhost:5000/submitSelfAppraisel",
      curuser
    );
    navigate("/main/EmployeeSection");
  };

  return (
    <form className="self-appraisal-form">
     <div className="Self_Appraisal_heading">Self Appraisal</div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="employeeName">Name of the employee:</label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            value={employeeName}
            onChange={(event) => setEmployeeName(event.target.value)}
            disabled={!isEditable}
          />
        </div>

        <div className="form-group">
          <label htmlFor="employeeId">Employee ID:</label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            value={employeeId}
            onChange={(event) => setEmployeeId(event.target.value)}
            disabled={!isEditable}
          />
        </div>
      </div>

      <div className="form-row_date">
        <div className="form-group_date">
          <div className="title_date">Self Appraisal for the period:</div>
          <div className="form-date-inputs">
            <input
              className="fromdate_saf"
              type="date"
              id="fromDate"
              name="fromDate"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
              disabled={!isEditable}
            />
            <input
              className="todate_saf"
              type="date"
              id="toDate"
              name="toDate"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
              disabled={!isEditable}
            />
          </div>
        </div>
      </div>

      <h2>Job Assignments and Specific Achievements</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="small-column">S. No.</th>
              <th>Job Assigned</th>
              <th>Corresponding Achievement</th>
              {isEditable && <th></th>}
            </tr>
          </thead>
          <tbody>
            {jobAssignments.map((assignment, index) => (
              <tr key={index}>
                <td className="small-column">
                  <input
                    type="text"
                    name="serialNumber"
                    value={index + 1}
                    onChange={(event) =>
                      handleJobAssignmentChange(index, event)
                    }
                    disabled={true}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="jobAssigned"
                    value={assignment.jobAssigned}
                    onChange={(event) =>
                      handleJobAssignmentChange(index, event)
                    }
                    disabled={!isEditable}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="correspondingAchievement"
                    value={assignment.correspondingAchievement}
                    onChange={(event) =>
                      handleJobAssignmentChange(index, event)
                    }
                    disabled={!isEditable}
                  />
                </td>
                {isEditable && (
                  <td className="add-row-cell">
                    {index === jobAssignments.length - 1}
                  </td>
                )}
                {isEditable && (
                  <div className="add-row" onClick={addJobAssignmentRow}>
                    +
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Achievements beyond normal scope of work</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="small-column">S. No.</th>
              <th>Achievement</th>
              <th>Deliverable</th>
              {isEditable && <th></th>}
            </tr>
          </thead>
          <tbody>
            {achievements.map((achievement, index) => (
              <tr key={index}>
                <td className="small-column">
                  <input
                    type="text"
                    name="serialNumber"
                    value={index + 1}
                    onChange={(event) => handleAchievementChange(index, event)}
                    disabled={true}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="achievement"
                    value={achievement.achievement}
                    onChange={(event) => handleAchievementChange(index, event)}
                    disabled={!isEditable}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="deliverable"
                    value={achievement.deliverable}
                    onChange={(event) => handleAchievementChange(index, event)}
                    disabled={!isEditable}
                  />
                </td>
                {isEditable && (
                  <td className="add-row-cell">
                    {index === achievements.length - 1}
                  </td>
                )}
                {isEditable && (
                  <div className="add-row" onClick={addAchievementRow}>
                    +
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditable && (
        <div className="date_saf">
          <div className="titleDate_saf">Date of filling :</div>
          <div className="dateoffilingSA">
            <input
              type="date"
              value={dateoffillingSA}
              onChange={(event) => setdateoffillingSA(event.target.value)}
            />
          </div>
        </div>
      )}

      <div className="form-actions">
        {isEditable ? (
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <>
            <button type="button" onClick={handleEdit}>
              Edit
            </button>
            <button type="button" onClick={lockAndSubmit}>
              Lock
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default SelfAppraisalForm;