import NavBar from "../component/NavBar";

export default function Layout({ children }: any) {
    return (
        <>
            <div>
                {/*/!* Header *!/*/}
                <header>
                    <NavBar/>
                </header>

                <div>
                    {/* Main Content */}
                    <main>
                        {children}
                    </main>
                </div>

                {/*/!* Footer *!/*/}
                {/*<footer className="bg-gray-800 text-white p-4 text-center">*/}
                {/*    <p>&copy; 2024 My Tourism Website. All rights reserved.</p>*/}
                {/*</footer>*/}
            </div>
        </>
    )
}