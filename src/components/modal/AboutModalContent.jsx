function AboutModalContent() {
    return (
        <>
            <h4 className="mt-2 font-coplette text-3xl">About</h4>
            <div className="flex w-full flex-col items-center gap-2 text-[.95rem]">
                <div className="mb-[-1rem] mt-1">
                    {/* <Button variant="contained" type="submit">
                        Join
                    </Button> */}
                    <p >SpaceSaver is a web application designed to streamline office space bookings and enhance communication about room availability within an office space. Our goal is to simplify the process of reserving rooms and signal their availability to others.</p>
                </div>
                <div className="mb-[-2rem] mt-6">
                    {/* <Button variant="contained" type="submit">
                        Join
                    </Button> */}
                    <p >It was created as apart of a final project assignment for Coder Academy in 2023, built by 2 keen developers. Edward Dougherty was our commercial officer and backend developer, Jordan Benjamin was our designer and frontend developer.</p>
                </div>
                <h5 className="mt-8 font-coplette text-2xl">How it works</h5>
                <div className="mb-[-1rem] mt-2">
                    {/* <Button variant="contained" type="submit">
                        Join
                    </Button> */}
                    <p>There are two types of users, an admin (usually someone from a management role) and a space user (an employee). SpaceSaver allows for the flexibility where a user can be both and admin or a space user.</p>
                </div>
                <div className="mb-[-1rem] mt-6">
                    {/* <Button variant="contained" type="submit">
                        Join
                    </Button> */}
                    <p>You have a Home page which serves as your dashboard, and a bookings page to create new bookings. Before you can make any bookings, you must join a space with an access code under the Space page (shared by your manager).</p>
                </div>
                <div className="mb-[-1rem] mt-6">
                    {/* <Button variant="contained" type="submit">
                        Join
                    </Button> */}
                    <p>Each space has a variety of rooms which are tailored for the respective spaces. Please find some demo users (varying roles) login info from below to test the application. Or, create your own account and have fun!</p>
                </div>
                <h5 className="mt-[2rem] font-coplette text-2xl">Demo users login info</h5>
                <div className="mb-[-2rem] mt-2 flex gap-8">
                    {/* <Button variant="contained" type="submit">
                        Join
                    </Button> */}
                    <div className="flex flex-col gap-1">
                        <p>
                            Manager: Mary Poppins
                        </p>
                        <p>
                            email: marypoppins@gmail.com
                        </p>
                        <p>
                            password: pw123
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p>
                            Senior Dev: Simone Byles
                        </p>
                        <p>
                            email: simonebyles@gmail.com
                        </p>
                        <p>
                            password: pw123
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p>
                            Dev: John Hamm
                        </p>
                        <p>
                            email: johnhamm@gmail.com
                        </p>
                        <p>
                            password: pw123
                        </p>
                    </div>
                </div>
                <h5 className="mt-[3rem] font-coplette text-2xl">Disclaimer</h5>
                <div className="mb-4 mt-2">
                    {/* <Button variant="contained" type="submit">
                        Join
                    </Button> */}
                    <p>SpaceSaver is currently undergoing an update. There are certain features which might be buggy. Notably, SpaceSaver is best viewed on a desktop/laptop. It is currently not mobile responsive.</p>
                </div>
            </div>
            <div className='absolute bottom-2 left-3'>
                <p className='text-sm text-gray-600'>Version 1.1.1</p>
            </div>
        </>
    )
}

export default AboutModalContent
