class API {

    static readInitialData = (callback) => {
        const readInitialData = async () => {
            const response = await fetch('http://localhost:8080/insurance', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            callback(await response.json())
        }

        readInitialData().catch(e => console.log("readInitialData failed: ", e))
    }

    static saveData = (insuranceDto, callback) => {
        const saveData = async () => {
            const response = await fetch('http://localhost:8080/insurance', {
                method: 'POST',
                body: JSON.stringify(insuranceDto),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            callback(await response.text())
        }

        saveData().catch(e => console.log("saveData failed: ", e))
    }
}

