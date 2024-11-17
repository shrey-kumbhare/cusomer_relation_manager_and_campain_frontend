import React, { useState, useCallback } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./AudienceForm.css";

// Debounce function to limit API calls
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const AudienceForm = () => {
  const [audienceSize, setAudienceSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    rules: [{ field: "totalSpend", operator: ">", value: "" }],
    message: "",
    logicalOperator: "AND", // Default logical operator
  };

  const validationSchema = Yup.object().shape({
    rules: Yup.array().of(
      Yup.object().shape({
        field: Yup.string().required("Field is required"),
        operator: Yup.string().required("Operator is required"),
        value: Yup.string().required("Value is required"),
      })
    ),
    message: Yup.string().required("Message is required"),
    logicalOperator: Yup.string()
      .required("Logical operator is required")
      .oneOf(["AND", "OR"], "Logical operator must be either AND or OR"),
  });

  const handleCheckAudienceSize = useCallback(
    debounce(async (values) => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://shreycrmbackend.onrender.com/campaigns/check-audience-size`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const data = await response.json();
        setAudienceSize(data.audienceSize);
      } catch (error) {
        console.error("Error checking audience size", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(
        `https://shreycrmbackend.onrender.com/campaigns/create-audience`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        alert("Campaign created successfully");
        navigate("/home/audience");
      } else {
        const errorData = await response.json();
        console.error("Error creating audience", errorData);
      }
    } catch (error) {
      console.error("Error creating audience", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="centered-container">
      <h1 className="heading">Create Campaign</h1>
      <div className="form-container">
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FieldArray name="rules">
                  {({ insert, remove, push }) => (
                    <div className="rules-container">
                      {values.rules.length > 0 &&
                        values.rules.map((rule, index) => (
                          <div className="rule-item" key={index}>
                            <div className="rule-fields">
                              <Field
                                name={`rules.${index}.field`}
                                as="select"
                                className="rule-field"
                              >
                                <option value="totalSpend">Total Spend</option>
                                <option value="numVisits">
                                  Number of Visits
                                </option>
                              </Field>
                              <ErrorMessage
                                name={`rules.${index}.field`}
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="rule-operator">
                              <Field
                                name={`rules.${index}.operator`}
                                as="select"
                                className="rule-operator-select"
                              >
                                <option value=">">Greater than</option>
                                <option value=">=">
                                  Greater than or equal
                                </option>
                                <option value="<">Less than</option>
                                <option value="<=">Less than or equal</option>
                                <option value="=">Equal to</option>
                                <option value="!=">Not equal to</option>
                              </Field>
                              <ErrorMessage
                                name={`rules.${index}.operator`}
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="rule-value">
                              <Field
                                name={`rules.${index}.value`}
                                type="text"
                                className="rule-value-input"
                              />
                              <ErrorMessage
                                name={`rules.${index}.value`}
                                component="div"
                                className="error-message"
                              />
                            </div>
                            <div className="rule-remove">
                              <button
                                type="button"
                                className="remove-button"
                                onClick={() => remove(index)}
                              >
                                X
                              </button>
                            </div>
                          </div>
                        ))}
                      <button
                        type="button"
                        className="add-rule-button"
                        onClick={() =>
                          push({ field: "", operator: "", value: "" })
                        }
                      >
                        Add Rule
                      </button>
                    </div>
                  )}
                </FieldArray>

                <div className="message-field">
                  <Field
                    name="message"
                    type="text"
                    placeholder="Message"
                    className="message-input"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="logical-operator-field">
                  <Field
                    name="logicalOperator"
                    as="select"
                    className="logical-operator-select"
                  >
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                  </Field>
                  <ErrorMessage
                    name="logicalOperator"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="check-audience">
                  <button
                    type="button"
                    className="check-audience-button"
                    onClick={() => handleCheckAudienceSize(values)}
                    disabled={loading}
                  >
                    {loading ? "Checking..." : "Check Audience Size"}
                  </button>
                  {audienceSize !== null && (
                    <div className="audience-size">
                      Audience Size: {audienceSize}
                    </div>
                  )}
                </div>

                <div className="submit-button">
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    Create Campaign
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AudienceForm;
