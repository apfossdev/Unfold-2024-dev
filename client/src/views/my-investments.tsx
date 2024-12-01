import DashboardNav from "@/components/internal/dashboard-nav.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Eye, Github, LucideTwitter, Plus, Twitter, View} from "lucide-react";
import React, {useState} from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input";

const MyInvestments = () => {
    const [openProjectPreview, setOpenPreview] = useState<boolean | string>(false)
    const [addNewProjectModalOpen, setAddNewProjectModalOpen] = useState<boolean>(false),
        [projectName, setProjectName] = useState<string>(''),
        [twitterUrl, setTwitterUrl] = useState<string>(''),
        [githubUrl, setGithubUrl] = useState<string>(''),
        [contractAddress, setContractAddress] = useState<string>('')

    const handleFormSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        //validate
        if (projectName === '' || twitterUrl === '' || githubUrl === '' || contractAddress === '') {
            alert('All fields are required')
        }
        // submit
    }
    return (
        <div className={'mt-6 mx-10'}>
            <DashboardNav parent={'myInvestments'}/>
            <div className={'my-12'}>
                <div className={'flex items-center justify-between'}>
                    <h1 className={'text-lg font-semibold pb-2'}>
                        My Investments
                    </h1>
                    <Button onClick={() => setAddNewProjectModalOpen(true)}>
                        <Plus/> New project
                    </Button>
                </div>
                <div className={'grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-4'}>
                    <Card className={'cursor-pointer hover:shadow-md duration-200'}>
                        <CardContent className={'mt-4'}>
                            <h1 className={'uppercase font-semibold'}>Project</h1>
                            <div className={'flex gap-3 mt-4 items-center justify-end'}>
                                <div className={'flex items-center justify-end gap-2'}>
                                    <Button size={'lg'} className={'w-full'} variant={'secondary'}>
                                        <Github className={'size-12'}/>
                                    </Button>
                                    <Button size={'lg'} className={'w-full'} variant={'secondary'}>
                                        <Twitter className={'size-12'}/>
                                    </Button>
                                </div>
                                <Button onClick={() => setOpenPreview('open')}>
                                    <Eye/> Preview
                                </Button>
                                {/*<Github className={'size-5 cursor-pointer'}/>*/}
                                {/*<div>|</div>*/}
                                {/*<LucideTwitter className={'size-5 cursor-pointer'}/>*/}
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
            <Dialog open={addNewProjectModalOpen as boolean} onOpenChange={(e) => setAddNewProjectModalOpen(e)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>New Project</DialogTitle>
                        <DialogDescription>Add and track your invested projects</DialogDescription>
                    </DialogHeader>
                    <div>
                        <form onSubmit={handleFormSubmit}>
                            <div className={'space-y-2'}>
                                <div>
                                    <Label>Project Name</Label>
                                    <Input
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Twitter URL</Label>
                                    <Input
                                        value={twitterUrl}
                                        onChange={(e) => setTwitterUrl(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Github URL</Label>
                                    <Input
                                        value={githubUrl}
                                        onChange={(e) => setGithubUrl(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Contract Address</Label>
                                    <Input
                                        value={contractAddress}
                                        onChange={(e) => setContractAddress(e.target.value)}/>
                                </div>
                                <div className={'flex justify-end'}>
                                    <Button type={'submit'}>
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MyInvestments;