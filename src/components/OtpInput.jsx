import React, { useState, useRef, useEffect } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
	const [otp, setOtp] = useState(new Array(length).fill(""));

	const inputRefs = useRef([]);

	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, []);

	const handleChange = (index, e) => {
		const value = e.target.value;
		if (isNaN(value)) return;

		const newOtp = [...otp];
		newOtp[index] = value.substring(value.length - 1);
		setOtp(newOtp);

		const combinedOtp = newOtp.join("");
		if (combinedOtp.length === length)
			onOtpSubmit({
				resposeStatus: true,
				otp: combinedOtp,
			});
		else {
			onOtpSubmit({
				resposeStatus: false,
				otp: combinedOtp,
			});
		}

		if (value && index < length - 1 && newOtp[index + 1]) {
			for (let i = index + 1; i < length; i++) {
				if (!newOtp[i]) {
					inputRefs.current[i].focus();
					break;
				}
			}
		} else if (value && index < length - 1 && !newOtp[index + 1]) {
			inputRefs.current[index + 1].focus();
		}
	};
	const handleClick = (index) => {
		inputRefs.current[index].setSelectionRange(1, 1);

		if (index > 0 && !otp[index - 1]) {
			inputRefs.current[otp.indexOf("")].focus();
		}
	};
	const handleKeyDown = (index, e) => {
		if (
			e.key === "Backspace" &&
			!otp[index] &&
			index > 0 &&
			inputRefs.current[index - 1]
		) {
			// Move focus to the previous input field on backspace
			inputRefs.current[index - 1].focus();
		}
	};
	return (
		<div>
			{otp.map((value, index) => {
				return (
					<input
						key={index}
						type="text"
						value={value}
						ref={(input) => (inputRefs.current[index] = input)}
						onChange={(e) => handleChange(index, e)}
						onClick={() => handleClick(index)}
						onKeyDown={(e) => handleKeyDown(index, e)}
						className="otpInput"
					/>
				);
			})}
		</div>
	);
};

export default OtpInput;
