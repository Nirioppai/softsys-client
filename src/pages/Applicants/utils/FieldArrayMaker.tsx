import React from 'react';
import { Field, FieldArray } from 'formik';
import { Button, Typography, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

export const FieldArrayMaker = (dataArray: Array<string>, name: string, label: string, required: boolean) => {
    return (
        <FieldArray
            name={name}
        >
            {({push, remove}) => (
                <React.Fragment>
                <Grid item>
                    <Typography variant="body2">{label}:</Typography>
                </Grid>

                {dataArray.map((_, index) => (
                    <Grid container key={index}>
                    <Grid item xs={12} sm='auto'>
                        <Field
                        component={TextField}
                        required={required}
                        name={`${name}[${index}]`}
                        label={label}
                        />
                    </Grid>
                    <Grid item xs={12} sm='auto'>
                        <Button onClick={() => remove(index)}>Delete</Button>
                    </Grid>
                    </Grid>
                ))}

                <Grid item xs={12} sm='auto'>
                    <Button 
                        variant='contained'
                        onClick={() => push('')}
                    >
                        Add {label}
                    </Button>
                </Grid>
                </React.Fragment>
            )}
        </FieldArray>
    )
}

// TO DO: FIELD ARRAY MAKER FOR OBJECTS

export const FieldArrayMakerObjects = (
        dataArray: Array<any>, //index
        parent: string,
        parentLabel: string, 
        arrayOfFields: Array<string>,
        label: Array<string>, //i
        required: boolean
    ) => {
    return (
        <FieldArray
            name={parent}
        >
        {({push, remove}) => (
            <React.Fragment>

            {dataArray.map((_, index) => (
                <Grid container key={index}>
                    {arrayOfFields.map((fieldName, i) => (
                        <Grid item xs={12} sm='auto' key={index + fieldName}>
                            <Field
                                component={TextField}
                                required={fieldName === "academicAward" ? false : required}
                                name={`${parent}[${index}][${fieldName}]`}
                                label={label[i]}
                            />
                        </Grid>
                    ))
                    }
                    <Grid item xs={12} sm="auto">
                        <Button onClick={() => remove(index)}>Delete</Button>
                    </Grid>
                </Grid>
            ))}
            <Grid item xs={12} sm='auto'>
                <Button 
                    variant='contained'
                    onClick={() => push('')}
                >
                    Add {parentLabel}
                </Button>
            </Grid>
            </React.Fragment>
        )}
        </FieldArray>
    )
}