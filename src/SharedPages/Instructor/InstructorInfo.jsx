const InstructorInfo = ({ instructor }) => {
    // console.log(instructor)
    const { name, image, email } = instructor;
    return (
        <div>
            <div className="card card-compact md:w-96 w-full bg-base-100 shadow-xl">
                <figure>
                    <img src={image} alt="" className="w-full h-[400px]" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title font-normal">
                        <span className="text-2xl font-bold">Name:</span>
                        {name}
                    </h2>
                    <p className="text-xl ">
                        {" "}
                        <span className="text-2xl mr-2 font-bold">Email:</span>
                        {email}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InstructorInfo;
