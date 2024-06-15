import { PropsWithChildren } from "react"


const ErrorMessage = ({children} : PropsWithChildren) => {
    return (
        <div className="text-center my-4 bg-red-100 text-red-800 rounded-md border-l-4 border-red-800 font-bold p-3 uppercase">
            {children}
        </div>
    )
}

export default ErrorMessage