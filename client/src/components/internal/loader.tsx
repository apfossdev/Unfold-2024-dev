import {cn} from "@/lib/utils.ts";
import {Loader} from "lucide-react";

const PageLoader = ({className, size}: {className?: string, size?: number}) => {
    return (
        <div
         className={cn('h-[90dvh] flex items-center justify-center', className)}
        >
            <Loader size={size || 20} className={'animate-spin'} />
        </div>
    );
};

export default PageLoader;