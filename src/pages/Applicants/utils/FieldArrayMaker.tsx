import React from 'react';
import { Field, FieldArray } from 'formik';
import { Button, Typography, Grid } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

export const FieldArrayMaker = (dataArray: Array<string>, name: string, label: string) => {
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
                    <Grid item xs={12} sm="auto">
                        <Field
                        component={TextField}
                        required
                        name={`${name}[${index}]`}
                        label={label}
                        />
                    </Grid>
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
                        Add {label}
                    </Button>
                </Grid>
                </React.Fragment>
            )}
        </FieldArray>
    )
}