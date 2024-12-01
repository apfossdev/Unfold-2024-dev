import DashboardNav from "@/components/internal/dashboard-nav.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Github, LucideTwitter} from "lucide-react";
import {useState} from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";

const MyInvestments = () => {
    const [openProjectPreview, setOpenPreview] = useState<boolean | string>(false)
    return (
        <div className={'mt-6 mx-10'}>
            <DashboardNav parent={'myInvestments'}/>
            <div className={'my-12'}>
                <h1 className={'text-lg font-semibold pb-2'}>
                    My Investments
                </h1>
                <div className={'grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-4'}>
                    <Card onClick={() => setOpenPreview('open')} className={'cursor-pointer hover: active:translate-y-[0.5px]'}>
                        <CardContent className={'mt-4'}>
                            <h1 className={'text-center uppercase'}>Project</h1>
                            <div className={'flex gap-3 mt-4 items-center justify-center'}>
                                <Github className={'size-5 cursor-pointer'}/>
                                <div>|</div>
                                <LucideTwitter className={'size-5 cursor-pointer'}/>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Dialog open={openProjectPreview as boolean} onOpenChange={(e) => setOpenPreview(e)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Project Preview (title)</DialogTitle>
                        <DialogDescription>Preview of the project</DialogDescription>
                    </DialogHeader>
                    <div>
                        content here
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MyInvestments;