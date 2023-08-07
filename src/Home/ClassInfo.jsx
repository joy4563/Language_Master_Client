

const ClassInfo = ({ oneCls }) => {
    const { classImage, className, instructorName } = oneCls;
    return (
        <div>
            <div className="card card-compact md:w-96 w-full bg-base-100 shadow-xl">
                <figure>
                    <img src={classImage} alt="" className="w-full h-[300px]" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-2xl font-semibold">
                        {className}
                    </h2>
                    <p className="text-xl ">
                        <span className="text-xl font-semibold mr-2">
                            Instructor:
                        </span>
                        {instructorName}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ClassInfo;