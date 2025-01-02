import NavBar from "../component/NavBar";
import Footer from "../component/contacUs";

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
                <footer className={"mt-40"}>
                    <Footer/>
                </footer>
            </div>
        </>
    )
}