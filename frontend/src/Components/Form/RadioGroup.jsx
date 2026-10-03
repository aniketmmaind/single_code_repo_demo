function RadioGroup({
    label,
    name,
    value,
    onChange,
    options
}) {
    return (
        <div>
            <p>{label}</p>

            {options.map((option) => (
                <label key={option.value}>
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={onChange}
                    />

                    {option.label}
                </label>
            ))}
        </div>
    );
}

export default RadioGroup;