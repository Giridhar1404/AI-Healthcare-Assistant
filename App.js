import React, { useState } from "react";
import axios from "axios";
import "./App.css";

// Set API Base URL (Ensure this matches your backend)
const API_BASE_URL = "http://127.0.0.1:8000";

function App() {
    const [symptoms, setSymptoms] = useState("");
    const [diseaseResult, setDiseaseResult] = useState(null);

    const [drugName, setDrugName] = useState("");
    const [drugResult, setDrugResult] = useState(null);

    const [diseaseName, setDiseaseName] = useState("");
    const [diseaseDetails, setDiseaseDetails] = useState(null);

    // Function to handle disease diagnosis request
    const handleSymptomSubmit = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/diagnose`, { symptoms });
            setDiseaseResult(response.data.possible_diseases.replace(/\*/g, ""));
        } catch (error) {
            console.error("Error fetching disease diagnosis:", error);
            alert("Failed to fetch disease diagnosis.");
        }
    };

    // Function to handle drug information request
    const handleDrugSubmit = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/drug-info`, { drug_name: drugName });
            setDrugResult(response.data.drug_info.replace(/\*/g, ""));
        } catch (error) {
            console.error("Error fetching drug info:", error);
            alert("Failed to fetch drug information.");
        }
    };

    // Function to handle disease information request
    const handleDiseaseSubmit = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/disease-info`, { disease_name: diseaseName });
            setDiseaseDetails(response.data.disease_info.replace(/\*/g, ""));
        } catch (error) {
            console.error("Error fetching disease info:", error);
            alert("Failed to fetch disease information.");
        }
    };

    return (
        <div className="container">
            <h1>Health Assistant</h1>

            {/* Disease Diagnosis Section */}
            <div className="card">
                <h2>Diagnose Disease</h2>
                <input
                    type="text"
                    placeholder="Enter symptoms (comma-separated)"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                />
                <button onClick={handleSymptomSubmit}>Get Diagnosis</button>

                {/* Spaced-out results for Disease Diagnosis with bold and underlined headings */}
                {diseaseResult && (
                    <div className="result-box">
                        {diseaseResult.split("\n").map((line, index) => {
                            const parts = line.split(":");
                            return (
                                line.trim() && (
                                    <p key={index} style={{ marginBottom: "10px" }}>
                                        {parts.length > 1 ? (
                                            <>
                                                <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
                                                    {parts[0]}:
                                                </span>
                                                {parts.slice(1).join(":")}
                                            </>
                                        ) : (
                                            line
                                        )}
                                    </p>
                                )
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Drug Information Section */}
            <div className="card">
                <h2>Drug Information</h2>
                <input
                    type="text"
                    placeholder="Enter drug name"
                    value={drugName}
                    onChange={(e) => setDrugName(e.target.value)}
                />
                <button onClick={handleDrugSubmit}>Get Drug Info</button>

                {/* Spaced-out results for Drug Information with bold and underlined headings */}
                {drugResult && (
                    <div className="result-box">
                        {drugResult.split("\n").map((line, index) => {
                            const parts = line.split(":");
                            return (
                                line.trim() && (
                                    <p key={index} style={{ marginBottom: "10px" }}>
                                        {parts.length > 1 ? (
                                            <>
                                                <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
                                                    {parts[0]}:
                                                </span>
                                                {parts.slice(1).join(":")}
                                            </>
                                        ) : (
                                            line
                                        )}
                                    </p>
                                )
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Disease Information Section */}
            <div className="card">
                <h2>Disease Information</h2>
                <input
                    type="text"
                    placeholder="Enter disease name"
                    value={diseaseName}
                    onChange={(e) => setDiseaseName(e.target.value)}
                />
                <button onClick={handleDiseaseSubmit}>Get Disease Info</button>

                {/* Spaced-out results for Disease Information with bold and underlined headings */}
                {diseaseDetails && (
                    <div className="result-box">
                        {diseaseDetails.split("\n").map((line, index) => {
                            const parts = line.split(":");
                            return (
                                line.trim() && (
                                    <p key={index} style={{ marginBottom: "10px" }}>
                                        {parts.length > 1 ? (
                                            <>
                                                <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
                                                    {parts[0]}:
                                                </span>
                                                {parts.slice(1).join(":")}
                                            </>
                                        ) : (
                                            line
                                        )}
                                    </p>
                                )
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;


