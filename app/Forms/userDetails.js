import React, { Fragment, Component } from "react";
import {
    Text, Image, TouchableOpacity,
    TextInput, View, Picker

} from "react-native";
import { withFormik } from 'formik';

import * as Yup from "yup";
import { Button } from 'react-native-elements';
import styles from './Style'


// import ImageView from 'react-native-image-view';

const companies = [
    { value: "facebook", label: "Facebook" },
    { value: "github", label: "GitHub" }
];

const employees = {
    facebook: [
        { value: "Dan Abramov", label: "Dan Abramov" },
        { value: "Sophie Alpert", label: "Sophie Alpert" }
    ],
    github: [
        { value: "Max Stoiber", label: "Max Stoiber" },
        { value: "Brian Lovin", label: "Brian Lovin" }
    ]
};

const emptyOption = { value: "", label: "" };

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        company: Yup.object().shape({
            label: Yup.string(),
            value: Yup.string().required("Company is required!")
        }),
        employee: Yup.object().shape({
            label: Yup.string(),
            value: Yup.string().required("Employee is required!")
        })
    }),
    mapPropsToValues: props => ({
        company: emptyOption,
        employee: emptyOption
    }),
    handleSubmit: (values, { setSubmitting }) => {
        const payload = {
            ...values,
            company: values.company.value,
            employee: values.employee.value
        };
        setTimeout(() => {
            alert(JSON.stringify(payload, null, 2));
            setSubmitting(false);
        }, 1000);
    },
    // displayName: "MyForm"
});

class MySelect extends React.Component {
    static defaultProps = {
        isDisabled: false
    };

    handleChange = value => {
        // this is going to call setFieldValue and manually update values[this.props.name]
        this.props.onChange(this.props.name, value);
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched[this.props.name]
        this.props.onBlur(this.props.name, true);
    };

    render() {
        return (
            <React.Fragment>
                <Picker
                    // id={this.props.name}
                    // label={this.props.name}
                    // options={this.props.options}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    value={this.props.value}
                    enabled={this.props.isDisabled}

                    onValueChange={() => { }}>
                    {Object.keys(options).map((key) => {
                        return (<Picker.Item label={this.props.options[key]} value={key} key={key} />) //if you have a bunch of keys value pair
                    })}
                </Picker>

                {!!this.props.error && this.props.touched && (
                    <Text style={{ color: "red", marginTop: "0.5" }}>
                        {Object.values(this.props.error)}
                    </Text>
                )}
            </React.Fragment>
        );
    }
}

class MyForm extends React.Component {
    state = {
        prevCompany: ""
    };

    render() {
        const {
            values,
            touched,
            dirty,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            setFieldValue,
            setFieldTouched,
            isSubmitting
        } = this.props;
        return (
            // <form onSubmit={handleSubmit}>
            <View>
                <MySelect
                    // name="company"
                    // options={companies}
                    value={values.company}
                    // onChange={(field, value) => {
                    //     const newCompanyValue = value.value;
                    //     const shouldResetDependentSelect =
                    //         newCompanyValue !== this.state.prevCompany;
                    //     this.setState({ prevCompany: newCompanyValue }, () => {
                    //         setFieldValue(field, value);
                    //         if (shouldResetDependentSelect) {
                    //             setFieldValue("employee", emptyOption);
                    //         }
                    //     });
                    // }}
                    onValueChange={(field, value) => {
                        const newCompanyValue = value.value;
                        const shouldResetDependentSelect =
                            newCompanyValue !== this.state.prevCompany;
                        this.setState({ prevCompany: newCompanyValue }, () => {
                            setFieldValue(field, value);
                            if (shouldResetDependentSelect) {
                                setFieldValue("employee", emptyOption);
                            }
                        });
                    }}
                    onBlur={setFieldTouched}
                    error={errors.company}
                    touched={touched.company}
                />


                <MySelect
                    name="employee"
                    isDisabled={!values.company.value}
                    options={
                        values.company.value ? employees[values.company.value] : []
                    }
                    value={values.employee}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    error={errors.employee}
                    touched={touched.employee}
                />


                <Button

                    onPress={handleReset}
                    disabled={!dirty || isSubmitting}
                >
                    Reset
        </Button>
                <Button onPress={handleSubmit} disabled={isSubmitting}>

                </Button>

            </View>

        );
    }
}

// export default MyEnhancedForm
const MyEnhancedForm = formikEnhancer(MyForm);
export default MyEnhancedForm