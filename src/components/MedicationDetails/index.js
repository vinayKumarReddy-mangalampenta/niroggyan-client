import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import "./index.css";
import {
	BsFillSunFill,
	BsFillMoonFill,
	BsExclamationTriangle,
} from "react-icons/bs";
import { BiSolidTired, BiTired } from "react-icons/bi";
import { FaHeadSideVirus } from "react-icons/fa";

const medicationImages = {
	tablet:
		"https://img.freepik.com/premium-photo/paracetamol-drug-white-background_627142-762.jpg",
	capsule:
		"https://img.freepik.com/premium-vector/medical-capsule_1459-2302.jpg?w=740",
	injection:
		"https://img.freepik.com/premium-vector/immunization-meningococcal-vaccine-medical-test-vial-syringe-ready-injection-shot-vaccine_661675-1127.jpg",
};

const getImage = (type) => {
	switch (type) {
		case "tablet":
			return medicationImages["tablet"];
		case "capsule":
			return medicationImages["capsule"];
		case "Injection":
			return medicationImages["injection"];
		default:
			return medicationImages["tablet"];
	}
};

const dosageImages = {
	food: "https://img.freepik.com/free-vector/cutlery-set-white-plate-fork-spoon-knife-isolated-white_134830-841.jpg?w=100",
	injection:
		"https://img.freepik.com/premium-vector/syringe-with-blue-liquid-syringe-with-needle-medical-drug-injection-vaccine-care-treatment-realistic-white-background_149267-1027.jpg?w=100",
};

const sideEffectIcons = {
	nausea: <BsExclamationTriangle />,
	headache: <FaHeadSideVirus />,
	dizziness: <BiSolidTired />,
	fatigue: <BiTired />,
	// Add more side effects and corresponding icons as needed
};

const getPositionOfElement = (each, idx, frequencyType, frequency) => {
	if (frequencyType === "hours") {
		var percentage = (100 / frequency) * idx;
		return percentage;
	} else {
		switch (each) {
			case "morning":
				return 30;
			case "lunchtime":
				return 50;
			case "bedtime":
				return 90;
			default:
				return 30;
		}
	}
};
const MedicationDetails = (props) => {
	const { details } = props;
	const {
		name,
		reason,
		directions,
		times,
		type,
		possibleSideEffects,
		directionsDetails,
		dosage,
		frequency,
		frequencyType,
		duration,
		interactions,
	} = details;
	return (
		<li className="medication-list-item">
			<h1 className="medication-name">{name}</h1>
			<div className="medications-details-container">
				{/* name and reason */}
				<div className="medications-details">
					<div>
						<span className="medication-details-subheading">
							{type === "Injection" ? "APPEARANCE" : "SIDE A"}
						</span>
						<img src={getImage(type)} className="medication-image" alt={name} />
					</div>

					<div className="medication-separator"></div>
					<div>
						<span className="medication-details-subheading ">
							REASON FOR MEDICATION
						</span>
						<p>{reason}</p>
					</div>
				</div>
				<hr />
				{/* dosage and directions*/}
				<div className="medications-details directions-container">
					<span className="medication-details-subheading">
						DIRECTIONS/NOTES
					</span>

					<p className="direction-heading">{directions}</p>
					<p className="direction-details">{directionsDetails}</p>
					<div className="dosage-duration-con">
						<div>
							<span className="medication-details-subheading">DOSAGE</span>
							<p>
								<b>{dosage}</b>
							</p>
						</div>
						<div>
							<span className="medication-details-subheading">DURATION</span>
							<p>
								<b>{duration}</b>
							</p>
						</div>
					</div>

					{/* dosage  */}
					<div className="dosage-usage">
						<ProgressBar
							filledBackground="#1aa0ef"
							height={20}
							percent={100}
							className="progress-bar"
						>
							<Step transition="scale" position={0}>
								{({ accomplished }) => (
									<div
										className={`transitionStep ${
											accomplished ? "accomplished" : null
										}`}
									>
										<BsFillSunFill />
									</div>
								)}
							</Step>
							{times.map((each, idx) => (
								<Step
									transition="scale"
									key={idx}
									position={getPositionOfElement(
										each,
										idx,
										frequencyType,
										frequency
									)}
								>
									{({ accomplished }) => (
										<div
											className={`transitionStep ${
												accomplished ? "accomplished" : null
											}`}
										>
											<div className="tablet">
												<span>
													<img
														src={`${
															type === "Injection"
																? dosageImages["injection"]
																: dosageImages["food"]
														}`}
														style={{ height: "50px" }}
														alt=""
													/>
													<div className="line"></div>
												</span>
											</div>

											<span className="timing-of-usage">{each}</span>
										</div>
									)}
								</Step>
							))}
							<Step transition="scale" position={100}>
								{({ accomplished }) => (
									<div
										className={`transitionStep ${
											accomplished ? "accomplished" : null
										}`}
									>
										<BsFillMoonFill />
									</div>
								)}
							</Step>
						</ProgressBar>
					</div>
				</div>

				<hr />
				{/*  possible side effects */}
				<div className="medications-details">
					<span className="medication-details-subheading">
						POSSIBLE SIDE EFFECTS
					</span>

					<ul className="side-effects-container">
						{possibleSideEffects.map((effect) => (
							<li className="side-effects">
								{sideEffectIcons[effect.toLowerCase()] || (
									<BsExclamationTriangle />
								)}{" "}
								{/* Display corresponding icon, or fallback to generic icon */}
								<span>{effect}</span>
							</li>
						))}
					</ul>

					<span className="medication-details-subheading">
						GET MEDICAL HELP IF
					</span>

					<p>
						Experiencing chest pain, shortness of breath, and rapid weight gain.
					</p>
					<span className="medication-details-subheading">INTERACTIONS</span>
					<ul>
						{interactions.map((each) => (
							<li>{each}</li>
						))}
					</ul>
				</div>
			</div>

			<hr />
		</li>
	);
};

export default MedicationDetails;
