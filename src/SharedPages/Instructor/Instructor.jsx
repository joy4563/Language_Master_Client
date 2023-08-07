import { useEffect, useState } from "react";
import InstructorInfo from "./InstructorInfo";

const Instructor = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch("https://language-master-server-omega.vercel.app/instructor")
            .then((res) => res.json())
            .then((data) => setInstructors(data));
    }, []);
    return (
        <div className="mt-20 md:flex md:flex-col md:items-center md:justify-center">
            <h2 className="text-3xl md:text-5xl font-bold text-center w-1/3 md:w-1/4 mx-auto mb-8 border-b-2 border-gray-500 rounded-b-lg pb-2">
                Instructors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {instructors.map((instructor) => (
                    <InstructorInfo
                        key={instructor.id}
                        instructor={instructor}
                    ></InstructorInfo>
                ))}
            </div>
        </div>
    );
};

export default Instructor;
