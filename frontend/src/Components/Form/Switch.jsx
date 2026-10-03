function Switch({ label, name, checked, onChange }) {
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                />

                {label}
            </label>
        </div>
    );
}

export default Switch;