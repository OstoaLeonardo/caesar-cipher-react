export function TableEncryptedMessage({title, message}) {
    return (<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-xs uppercase text-left text-gray-700 bg-gray-50 dark:bg-zinc-900 dark:text-gray-400"> {title} </caption>
            <tbody>
                <tr className="bg-white border-b dark:bg-zinc-700 dark:border-zinc-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                    {/* <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {title}
                    </th> */}
                    <td className="px-6 py-4 font-medium"> {message}</td>
                </tr>
            </tbody>
        </table>
    </div>)
}
