import React, { useEffect, useRef } from 'react';
import { NumericFormat } from 'react-number-format';

export const NumericFormatCustom = React.forwardRef(
    (props, ref) => {
        const { onChange, value, min, max, ...other } = props;
        const timeoutRef = useRef(null);
        const delayTime = typeof props.delayTime === 'number' ? props.delayTime : 0;

        const pushChange = (value) => {
            onChange({ target: { value } });
        };

        const handleChange = (values) => {
            pushChange(Number(values.value));
        };

        const handleBlur = () => {
            let newValue = value;
            if (min) newValue = Math.max(newValue, min);
            if (max) newValue = Math.min(newValue, max);
            pushChange(newValue);
        };

        useEffect(() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => handleBlur(), delayTime);
            return () => clearTimeout(timeoutRef.current);
        }, [value]);

        return (
            <NumericFormat
                {...other}
                value={value}
                getInputRef={ref}
                onValueChange={handleChange}
                onBlur={handleBlur}
                allowNegative={false}
                fixedDecimalScale
                thousandSeparator
                valueIsNumericString
            />
        );
    },
);