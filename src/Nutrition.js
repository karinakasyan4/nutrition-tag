export const Nutrition = ({ label, quantity, unit }) => {
    return (
        <div className="container-list">
            <p><b>{label} </b> - {quantity.toFixed()} {unit}</p>
        </div>
    )
}