import { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import Carousel from "./components/Carousel";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const MAX_DATE = new Date().toISOString().split("T")[0];

const App = () => {
	const [date, setDate] = useState(new Date());
	const [media, setMedia] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [stringDate, setStringDate] = useState(MAX_DATE);
	const dateInput = useRef(null);

	useEffect(() => {
		getMedia();
	}, []);

	const getMedia = async () => {
		const picture = await fetch(
			`https://api.nasa.gov/planetary/apod?api_key=7y0K6cF0nxuEiNzzGRumswQsrwIxl6oUDtqh5I1Q&date=` +
				stringDate
		);

		setMedia(await picture.json());
		if (await picture) setIsLoading(false);
	};

	const changeDate = (value) => {
		setDate(value);
		setStringDate(date.toISOString().split("T")[0]);
		setIsLoading(true);
		getMedia();
	};

	const changeDateByOne = (value) => {
		let tempDate = date;
		tempDate.setDate(date.getDate() + value);
		setDate(tempDate);
		setStringDate(date.toISOString().split("T")[0]);
		setIsLoading(true);
		dateInput.current.valueAsDate = date;
		console.log(dateInput);
		getMedia();
	};

	return (
		<div className="App">
			<div className="container">
				<header className="App-header">
					<img src="/nasa-logo.png" className="App-logo" alt="logo" />
					<h1 className="mx-auto">NASA Space API</h1>
					<form>
						<input
							id="dateInput"
							ref={dateInput}
							type={"date"}
							placeholder="dd-mm-yyyy"
							min="1997-01-01"
							max="2030-12-31"
							defaultValue={stringDate}
							className="form-control"
						></input>
						<Button
							onClick={(e) =>
								changeDate(new Date(document.getElementById("dateInput").value))
							}
							type="button"
							className="form-control submit-button"
						>
							View Date
						</Button>
					</form>
					<div className="buttons">
						<Button
							variant="dark"
							onClick={() => changeDateByOne(-1)}
							type="button"
							className="control-button"
						>
							Previous
						</Button>
						<Button
							variant="dark"
							onClick={() => changeDateByOne(1)}
							type="button"
							className="control-button"
						>
							Next
						</Button>
					</div>
				</header>
				<div className="App-content">
					<Carousel media={media} isLoading={isLoading}></Carousel>
				</div>
			</div>
		</div>
	);
};

export default App;
