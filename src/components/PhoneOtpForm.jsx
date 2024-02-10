import React, { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneOtpForm = () => {
	const [phoneNumber, setphoneNumber] = useState("");
	const [showOtpInput, setshowOtpInput] = useState(false);
	const [successMessage, setSuccessMessage] = useState({
		resposeStatus: false,
		otp: "",
	});

	const handlePhoneNumber = (event) => {
		setphoneNumber(event.target.value);
	};
	const handlePhoneNumberSubmit = (event) => {
		event.preventDefault();

		const regex = /[^0-9]/g;

		if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
			alert("Enter Valid Phone Number");
			return;
		}
		setshowOtpInput(true);
	};

	const onOtpSubmit = ({ resposeStatus, otp }) => {
		const respose = {
			resposeStatus,
			otp,
		};
		setSuccessMessage(respose);
	};
	return (
		<div>
			{showOtpInput ? (
				<>
					<p>Enter OTP sent to {phoneNumber}</p>
					<OtpInput length={4} onOtpSubmit={onOtpSubmit} />
					{successMessage?.resposeStatus && (
						<p>Login Successful, {successMessage?.otp}</p>
					)}
				</>
			) : (
				<form className="phoneOtpForm" onSubmit={handlePhoneNumberSubmit}>
					<input
						type="text"
						value={phoneNumber}
						onChange={handlePhoneNumber}
						placeholder="Enter Phone Number"
					/>
					<button type="submit">Submit</button>
				</form>
			)}
		</div>
	);
};

export default PhoneOtpForm;
