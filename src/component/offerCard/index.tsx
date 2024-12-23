export default function Card(props:any){
    return(
        <>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-5 ml-2">
                    <img className="rounded-t-lg " src={props.image} alt=""/>
                <div className="p-5">

                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {props.title}
                        </h5>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {props.desc}
                    </p>

                </div>
            </div>
        </>
    )
}
