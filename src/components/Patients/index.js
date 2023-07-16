import { Component } from "react";
import { Dna } from "react-loader-spinner";
import axios from "axios";

import "./index.css";
const API_STATUS = {
	initial: "INTIAL",
	loading: "LOADING",
	success: "SUCCESS",
	failure: "FAILURE",
};

class Patients extends Component {
	state = {
		patientsData: [],
		apiStatus: API_STATUS.success,
	};

	componentDidMount() {
		this.fetchData();
	}
	fetchData = async () => {
		this.setState((prevState) => ({
			...prevState,
			apiStatus: API_STATUS.loading,
		}));
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/prescriptions`
			);
			console.log(response);
			if (response.status === 200) {
				this.setState((prevState) => ({
					...prevState,
					patientsData: response.data,
					apiStatus: API_STATUS.success,
				}));
			} else {
				this.setState((prevState) => ({
					...prevState,
					apiStatus: API_STATUS.failure,
				}));
			}
		} catch (error) {
			this.setState((prevState) => ({
				...prevState,
				apiStatus: API_STATUS.failure,
			}));
		}
	};

	displayPatientsList = () => {
		const { patientsData } = this.state;
		return (
			<div className="patients-list">
				<h1 className="main-heading">Patients List</h1>
				<div className="patients-container">
					{patientsData.map((patient) => (
						<div key={patient.id} className="patient-card">
							<img
								src="https://img.freepik.com/free-icon/user_318-159711.jpg"
								alt={patient.name}
								className="patient-image"
							/>
							<a href={`/patient/${patient.id}`}>
								<div className="patient-details">
									<h2>{patient.name}</h2>
								</div>
							</a>
						</div>
					))}
				</div>
			</div>
		);
	};
	displayData = () => {
		let { apiStatus } = this.state;
		switch (apiStatus) {
			case API_STATUS.success:
				return this.displayPatientsList();
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
				return this.display404view();
			default:
				return this.display404view();
		}
	};

	display404view = () => {
		return (
			<div className="error-container">
				<span className="error-text">Sorry for Inconvenience</span>
				<img
					// src="https://thumbs.dreamstime.com/b/oops-yellow-sign-isolated-white-background-34641412.jpg"
					src="https://cdn-icons-png.flaticon.com/512/643/643514.png"
					alt="404"
					className="error-image"
				/>

				<span className="error-description">Something went wrong</span>
				<button className="retry-button" onClick={this.fetchData}>
					Retry
				</button>
			</div>
		);
	};
	render() {
		return <div className="app-container">{this.displayData()}</div>;
	}
}

export default Patients;
