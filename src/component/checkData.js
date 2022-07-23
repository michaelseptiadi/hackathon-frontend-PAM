import React from "react";

function CheckData(){
    const [dataTable, setDataTable] = React.useState([]);

    const url = "http://127.0.0.1:8000/report?account_number=6226086390";

    const fetchData = async () => {
        try {
            await fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    setDataTable(data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const a = dataTable.account_number;

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(dataTable)
        // fetchData();
    }

    return(
        <div className="form">
            <button onClick={handleSubmit}>Submit</button>

                {dataTable.map((item) => (
                            <li key={item.data.id}>
                                <ul>{item.data.bulan}</ul>        
                            </li>
                    
                    ))}
        </div>
    )
}

export default CheckData;