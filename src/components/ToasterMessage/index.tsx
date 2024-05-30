import { Toaster } from "react-hot-toast"

function ToasterMessage() {
    return (
        <Toaster
            position="top-left"
            reverseOrder={false}
            toastOptions={{
                style: {
                    fontSize: '13px'
                }
            }}
        />
    )
}

export default ToasterMessage