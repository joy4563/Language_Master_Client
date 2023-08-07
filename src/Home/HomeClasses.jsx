import { useEffect, useState } from "react";
import ClassInfo from "./ClassInfo";

const HomeClasses = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch("https://language-master-server-omega.vercel.app/home")
            .then((res) => res.json())
            .then((data) => setClasses(data));
    }, []);

    return (
        <div className="max-w-7xl mx-auto mt-20">
            <h2 className="text-3xl md:text-5xl font-bold text-center w-1/3 mx-auto mb-10 border-b-2 border-gray-500 rounded-b-lg pb-2">
                Popular Classes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {classes.map((oneCls) => (
                    <ClassInfo key={oneCls._id} oneCls={oneCls}></ClassInfo>
                ))}
            </div>
        </div>
    );
};

export default HomeClasses;
