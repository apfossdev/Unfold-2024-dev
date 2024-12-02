import DashboardNav from "@/components/internal/dashboard-nav.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import {Eye, Github, Loader, LucideTwitter, Plus, Twitter, View} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { useZkLogin } from "@mysten/enoki/react";
import { NFTService } from "@/lib/contract.ts"; // Adjust the import path as needed

const MyInvestments = () => {
    const [openProjectPreview, setOpenPreview] = useState<boolean | string>(false);
    const [addNewProjectModalOpen, setAddNewProjectModalOpen] = useState<boolean>(false);
    const [projectName, setProjectName] = useState<string>('');
    const [twitterUrl, setTwitterUrl] = useState<string>('');
    const [githubUrl, setGithubUrl] = useState<string>('');
    const [contractAddress, setContractAddress] = useState<string>('');
    const [nfts, setNfts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const { address } = useZkLogin();
    // console.log('address', address);
    const nftService = new NFTService("suiprivkey1qqwn8swtw4jdqmd5yxfn8j9tuh4azq3jl2gvxs778yfedaqrwde52yrq5ke");

    useEffect(() => {
        if (address) {
            fetchNFTs();
        }
    }, [address]);

    const fetchNFTs = async () => {
        try {
            const ownedNfts = await nftService.getNFTsByOwner(address);
            setNfts(ownedNfts);
        } catch (error) {
            console.error('Error fetching NFTs:', error);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validate form fields
        if (projectName === '' || twitterUrl === '' || githubUrl === '' || contractAddress === '') {
            alert('All fields are required');
            return;
        }
        setLoading(true);
        try {

            if (!address) {
                alert('Please connect wallet to create a new project');
                setLoading(false)
                return;
            }
            // Send data to AI agent and get the stats, tech score, and social score
            // const response = await axios.post('/agent/analyze', {
            //     twitter_link: twitterUrl,
            //     github_link: githubUrl
            // });

            // const { social_metrics, tech_metrics } = response.data;
            // const stats = JSON.stringify(response.data);
            // const techScore = tech_metrics.tech_score;
            // const socialScore = social_metrics.social_score;

            // Mint the NFT with the provided data
            // await nftService.mintNFT(
            //     projectName,
            //     projectName, // description
            //     stats,
            //     githubUrl,
            //     twitterUrl,
            //     contractAddress,
            //     techScore,
            //     socialScore,
            //     address // recipient
            // );

            await nftService.mintNFT(
                "syuiuii",
                "subbaahefi", // description
                "{urwhewi}",
                "github.com",
                "twitter.com",
                "ewkjewr",
                90,
                67,
                "wjhgkrew" // recipient
            );

            // Fetch the updated list of NFTs
            fetchNFTs();
            setLoading(false)
            setAddNewProjectModalOpen(false);
        } catch (error) {
            console.error('Error submitting the form', error);
            setLoading(false)
        }
    };

    return (
        <div className={'mt-6 mx-10'}>
            <DashboardNav parent={'myInvestments'} />
            <div className={'my-12'}>
                <div className={'flex items-center justify-between'}>
                    <h1 className={'text-lg font-semibold pb-2'}>
                        My Investments
                    </h1>
                    <Button onClick={() => setAddNewProjectModalOpen(true)}>
                        <Plus /> New project
                    </Button>
                </div>
                <div className={'grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-4'}>
                    {nfts.map((nft) => (
                        <Card key={nft.id} className={'cursor-pointer hover:shadow-md duration-200'}>
                            <CardContent className={'mt-4'}>
                                <h1 className={'uppercase font-semibold'}>{nft.content.fields.title}</h1>
                                <p>{nft.content.fields.description}</p>
                                <p>Tech Score: {nft.content.fields.tech_score}</p>
                                <p>Social Score: {nft.content.fields.social_score}</p>
                                <div className={'flex gap-3 mt-4 items-center justify-end'}>
                                    <div className={'flex items-center justify-end gap-2'}>
                                        <Button size={'lg'} className={'w-full'} variant={'secondary'}>
                                            <Github className={'size-12'} />
                                        </Button>
                                        <Button size={'lg'} className={'w-full'} variant={'secondary'}>
                                            <Twitter className={'size-12'} />
                                        </Button>
                                    </div>
                                    <Button onClick={() => setOpenPreview('open')}>
                                        <Eye /> Preview
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
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
                                        onChange={(e) => setContractAddress(e.target.value)} />
                                </div>
                                <div className={'flex justify-end'}>
                                    <Button type={'submit'} disabled={loading}>
                                        Submit {loading && <Loader className={'animate-spin'} />}
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