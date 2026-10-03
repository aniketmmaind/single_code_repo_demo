import { useState } from "react";
import axios from "axios";

import TextField from "./Form/TextField";
import Switch from "./Form/Switch";
import RadioGroup from "./Form/RadioGroup";
import Select from "./Form/Select";
import RangeSlider from "./Form/RangeSlider";
import TextArea from "./Form/TextArea";

function DemoForm() {
    const [formData, setFormData] = useState({
        name: "",
        isCash: false,
        customerType: "",
        country: "",
        rating: 3,
        description: ""
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("Sending:", formData);

        try {
            const response = await axios.post(
                "http://localhost:3000/api/demo",
                formData
            );

            console.log("Backend response:", response.data);

            alert("Data saved successfully");
        } catch (error) {
            console.error("Error:", error);

            alert("Something went wrong");
        }
    };

    return (
        <div>
            <h1>Reusable Form Demo</h1>

            <form onSubmit={handleSubmit}>

                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                />

                <Switch
                    label="Cash Customer"
                    name="isCash"
                    checked={formData.isCash}
                    onChange={handleChange}
                />

                <RadioGroup
                    label="Customer Type"
                    name="customerType"
                    value={formData.customerType}
                    onChange={handleChange}
                    options={[
                        {
                            label: "Individual",
                            value: "individual"
                        },
                        {
                            label: "Company",
                            value: "company"
                        }
                    ]}
                />

                <Select
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    options={[
                        {
                            label: "India",
                            value: "india"
                        },
                        {
                            label: "USA",
                            value: "usa"
                        },
                        {
                            label: "UK",
                            value: "uk"
                        }
                    ]}
                />

                <RangeSlider
                    label="Rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min={0}
                    max={5}
                />

                <TextArea
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                />

                <button type="submit">
                    Save
                </button>

            </form>
        </div>
    );
}

export default DemoForm;