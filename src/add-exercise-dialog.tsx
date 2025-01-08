import React from "react";
import NumberInputRow from "./number-input-row";

export type AddExerciseDialogProps = {
    show: boolean,
    onClose: () => void,
    onAdd: (duration: number) => void,
}

function AddExerciseDialog({ show, onClose, onAdd }: AddExerciseDialogProps) {
    const [duration, setDuration] = React.useState(30);
    const handleAdd = () => {
        onAdd(duration);
    };

    if (!show) return null;

    return <div className="modal show d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Add exercise</h5>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="modal-body">
                    <NumberInputRow id="duration"
                        label="Duration (seconds)"
                        value={duration}
                        onValueChanged={setDuration} />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleAdd}>Add</button>
                </div>
            </div>
        </div>
    </div>;
}

export default AddExerciseDialog;