function RangeSlider({
    label,
    name,
    value,
    onChange,
    min = 0,
    max = 100
}) {
    return (
        <div>
            <label>
                {label}: {value}
            </label>

            <input
                type="range"
                name={name}
                min={min}
                max={max}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default RangeSlider;