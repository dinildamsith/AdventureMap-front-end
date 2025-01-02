import Footer from "../component/contacUs";
import SubNav from "../component/NavBar/subNav.tsx";


export default function SubLayout({ children }: any) {
    return (
        <>
            <div>
                {/*/!* Header *!/*/}
                <header>
                    <SubNav/>
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