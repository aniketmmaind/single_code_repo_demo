function TextArea({
    label,
    name,
    value,
    onChange,
    placeholder = ""
}) {
    return (
        <div>
            <label>{label}</label>

            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={5}
            />
        </div>
    );
}

export default TextArea;