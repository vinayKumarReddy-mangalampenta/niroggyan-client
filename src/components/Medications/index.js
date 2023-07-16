import React from "react";
import MedicationDetails from "../MedicationDetails";

import "./index.css";
const Medications = (props) => {
	const { medications } = props;
	return (
		<div className="medications-container">
			<ul className="medications-list">
				{medications.map((each, index) => (
					<MedicationDetails key={index} details={each} />
				))}
			</ul>
		</div>
	);
};

export default Medications;
