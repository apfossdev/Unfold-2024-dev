import React, {Suspense} from 'react';
import PageLoader from "@/components/internal/loader.tsx";

const SuspenseWrapper = ({children}: { children: React.ReactNode }) => {
    return (
        <Suspense fallback={<PageLoader/>}>
            {children}
        </Suspense>
    );
};

export default SuspenseWrapper;