import { useLoaderData } from "react-router-dom";
import useTitle from "../Hooks/useTitle";
import ClassDisplay from "./ClassDisplay";

const Classes = () => {
    useTitle("Classes");
    const allClasses = useLoaderData();
    // console.log(allClasses);
    const approvedClasses = allClasses.filter(
        (singleClass) => singleClass.status === "Approved"
    );
    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-center mt-8 text-5xl font-bold">
                Choice Your Favorites Class
            </h2>
            <div className="grid grid-cols-3 mt-20 gap-20">
                {approvedClasses.map((oneClass) => (
                    <ClassDisplay
                        key={oneClass._id}
                        oneClass={oneClass}
                    ></ClassDisplay>
                ))}
            </div>
        </div>
    );
};

export default Classes;
