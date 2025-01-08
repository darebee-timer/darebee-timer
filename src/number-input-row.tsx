import React from "react";

export type NumberInputRowProps = {
    id: string,
    label: string,
    value: number,
    onValueChanged: (value: number) => void,
}

function NumberInputRow(props: NumberInputRowProps) {
    const [valueStr, setValueStr] = React.useState(String(props.value));
    const handleValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueStr(event.target.value);
        const newValue = parseFloat(event.target.value);
        if (!isNaN(newValue))
            props.onValueChanged(newValue);
    };
    return <div className="mb-3">
        <label htmlFor={props.id} className="form-label">{props.label}</label>
        <input id={props.id}
            type="number" pattern={'[0-9]*'}
            className="form-control"
            style={{ width: '10em' }}
            value={valueStr}
            onChange={handleValueChanged}
        />
    </div>;
}

export default NumberInputRow