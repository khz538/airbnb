
import { IconType } from "react-icons";
import { FC, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CategoryBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean;
};

const CategoryBox: FC<CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected,
}) => {
    const router = useRouter(),
          params = useSearchParams();
    const handleClick = useCallback(() => {
        let currentQuery = {}; // first we define an empty query

        if (params) currentQuery = qs.parse(params.toString()); // parse the params so they are an object and not a string

        // then we update the query with the new category
        const updatedQuery: any = {
            ...currentQuery,
            category: label,
        };

        // if the category is already selected, we remove it from the query
        if (params?.get("category") === label) delete updatedQuery.category;

        // finally we stringify the query and push it to the router
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, { skipNull: true });

        router.push(url);
    }, [label, params, router]);


    return (
        <div
            className={`
                flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
                ${selected ? "border-b-neutral-800 text-neutral-800" : "border-b-transparent text-neutral-500"}
            `}
            onClick={handleClick}
        >
            <Icon size={26} />
            <div className="font-medium text-sm">{label}</div>
        </div>
    )
}

export default CategoryBox;
