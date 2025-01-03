export default function OrderNotify() {
    return (
        <>
            <div
                id="toast-notification"
                className="w-full max-w-xs p-4 text-gray-900 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-300 mt-3"
                role="alert"
            >
                <div className="flex items-center mb-3">
                    <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                        New Order
                    </span>
                    <button
                        type="button"
                        className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                        data-dismiss-target="#toast-notification"
                        aria-label="Close"
                    >
                        <span className="sr-only">Close</span>
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center">
                    <div className="relative inline-block shrink-0">
                        <img
                            className="w-12 h-12 rounded-full"
                            src="https://avatars.githubusercontent.com/u/123526874?s=400&u=f70f581a92336559fdb8e33a83777e4fbe5fe7ab&v=4"
                            alt="Jese Leos image"
                        />
                        <span
                            className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-green-700 rounded-full"
                        >
    <svg
        className="w-3 h-3 text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path
            d="M7 4h14l-1.68 8.39a2.25 2.25 0 01-2.19 1.86H8.87L7 4zm2.5 2l1.16 6h7.86a.75.75 0 00.73-.62L19 6H9.5zM6 2h2.5l1 5H19a1.25 1.25 0 011.22 1.58l-1.68 8.4a4.25 4.25 0 01-4.13 3.3H8.58a4.25 4.25 0 01-4.15-3.43L2.3 4H1a.75.75 0 010-1.5h4.27l.73 3.65A1.25 1.25 0 007.5 2H6zm0 16a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm12 0a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/>
    </svg>
    <span className="sr-only">Order icon</span>
</span>

                    </div>
                    <div className="ms-3 text-sm font-normal">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</div>
                        <div className="text-sm font-normal">You have new order</div>
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-500">a few seconds ago</span>
                    </div>
                </div>
                {/* Order Action Buttons */}
                <div className="mt-3 ms-14 flex gap-2">
                    <button
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300"
                    >
                    Accept
                    </button>
                    <button
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300"
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </>
    );
}
