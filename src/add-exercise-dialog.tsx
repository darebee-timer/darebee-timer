import React from "react";

export type AddExerciseDialogProps = {
    show: boolean,
    onClose: () => void,
    onAdd: (duration: number) => void,
}

function AddExerciseDialog({ show, onClose, onAdd }: AddExerciseDialogProps) {
    const [duration, setDuration] = React.useState("30");
    const handleDurationChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(event.target.value);
    }
    const handleAdd = () => {
        onAdd(Number(duration));
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
                    <div className="mb-3">
                        <label htmlFor="duration" className="form-label">Duration</label>
                        <input id="duration" type="number" className="form-control" style={{ width: '10em' }} value={duration} onChange={handleDurationChanged} />
                    </div>
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