import React, { useEffect, useState } from "react";
import { BsCapsule } from "react-icons/bs";
import Medications from "../Medications";
import { Dna } from "react-loader-spinner";
import axios from "axios";
import "./index.css";
import { useParams } from "react-router-dom";

const API_STATUS = {
	initial: "INTIAL",
	loading: "LOADING",
	success: "SUCCESS",
	failure: "FAILURE",
};

const HomePage = () => {
	const params = useParams();
	const [apiStatus, setApiStatus] = useState(API_STATUS.initial);
	const [patientData, setPatientData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setApiStatus(API_STATUS.loading);

			try {
				const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/prescriptions/${params.patientID}`
				);
				console.log(response);
				if (response.status === 200) {
					setPatientData(response.data.userData);
					setApiStatus(API_STATUS.success);
				} else {
					setApiStatus(API_STATUS.failure);
				}
			} catch (error) {
				// Set the API status to failure when API request fails
				setApiStatus(API_STATUS.failure);
			}
		};

		fetchData();
	}, [params.patientID]);

	const displayPrescriptions = () => {
		const { name, dateOfBirth, dateOfIssue, medicationsData } = patientData;

		return (
			<>
				{/* displaying user details */}
				<div id="patientDetails" className="patient-details">
					<div className="medications-title-con">
						<h4 className="heading">MEDICATIONS</h4>
						<div className="active-medications-heading-con">
							<span>
								<BsCapsule className="capsule-icon" />
							</span>
							<h1 className="active-medications-heading">
								Active Medications ({patientData.medicationsData.length})
							</h1>
						</div>
					</div>

					<div className="patient-information-con">
						<span className="patient-details-label">PATIENT NAME</span>
						<p className="patient-information">{name}</p>
					</div>
					<div className="patient-information-con">
						<span className="patient-details-label">DATE OF BIRTH</span>
						<p className="patient-information">{dateOfBirth}</p>
					</div>
					<div className="patient-information-con">
						<span className="patient-details-label">DATE OF ISSUE</span>
						<p className="patient-information">{dateOfIssue}</p>
					</div>
				</div>
				<hr className="separator" />

				{/* mediactions */}

				<Medications medications={medicationsData} />

				<div className="footer">
					<span>
						<b>MEDICATIONS</b>: ACTIVE MEDICATIOINS
					</span>
				</div>
			</>
		);
	};

	const display404view = () => (
		<div className="error-container">
			<span className="error-text">Sorry for Inconvenience</span>
			<img
				src="https://static.vecteezy.com/system/resources/previews/006/549/647/original/404-landing-page-free-vector.jpg"
				alt="404"
				className="error-image"
			/>

			<span className="error-text">PATIENT PRESCRIPTIONS NOT AVAILABLE</span>
		</div>
	);
	const displayData = () => {
		switch (apiStatus) {
			case API_STATUS.success:
				return displayPrescriptions();
			case API_STATUS.initial:
			case API_STATUS.loading:
				return (
					<div className="loader">
						<Dna
							visible={true}
							height="80"
							width="80"
							ariaLabel="dna-loading"
							wrapperStyle={{}}
							wrapperClass="dna-wrapper"
						/>
					</div>
				);
			case API_STATUS.failure:
				return display404view();
			default:
				return display404view();
		}
	};
	return <div className="container">{displayData()}</div>;
};

export default HomePage;
