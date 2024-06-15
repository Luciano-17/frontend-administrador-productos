import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailProps = {
    product: Product
}

export async function action({params} : ActionFunctionArgs) {
    if(params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }
}

const ProductDetail = ({product} : ProductDetailProps) => {
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>

            <td className="p-3 text-lg text-gray-800 text-center">
                {formatCurrency(product.price)}
            </td>

            <td className="p-3 text-lg text-gray-800 text-center">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? 'text-slate-100 bg-slate-800 hover:bg-slate-600' : 'text-red-100 bg-red-800 hover:bg-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full transition-all duration-200`}
                    >
                        {isAvailable ? 'Disponible' : 'No disponible'}
                    </button>
                </fetcher.Form>
            </td>

            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center transition-all duration-200 hover:bg-indigo-500"
                    >Editar</button>

                    <Form 
                        className="w-full" 
                        method="POST"
                        action={`productos/${product.id}/eliminar`}
                        onSubmit={(e) => {
                            if(!confirm('¿Estas seguro que deseas eliminar este producto?')) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <input 
                            type="submit" 
                            value="Eliminar" 
                            className="bg-red-600 text-white cursor-pointer rounded-lg w-full p-2 uppercase font-bold text-xs text-center transition-all duration-200 hover:bg-red-500"
                        />
                    </Form>
                </div>
            </td>
        </tr> 
    )
}

export default ProductDetail